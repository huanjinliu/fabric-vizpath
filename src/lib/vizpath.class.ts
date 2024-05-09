import { fabric } from 'fabric';
import round from 'lodash-es/round';
import cloneDeep from 'lodash-es/cloneDeep';
import VizPathContext from '.';
import {
  type Pathway,
  type Instruction,
  InstructionType,
  type PathwayNode,
} from '.';
import { parsePathJSON, reinitializePath } from '@utils';

export enum VizPathSymbalType {
  PATH = 'path',
  NODE = 'node',
  CONTROLLER_POINT = 'controller-point',
  CONTROLLER_LINE = 'controller-line',
}

export type ResponsiveCrood = Crood & {
  set: (crood: Crood, skipObserverIDs?: (string | undefined)[]) => void;
  observe: (
    handler: (newX: number, newY: number) => void,
    options?: {
      id?: string;
      immediate?: boolean;
    }
  ) => void;
  unobserve: (flag?: any) => void;
};

export type ResponsivePathway = {
  section: PathwayNode<ResponsiveCrood>[];
  originPath: fabric.Path;
}[];

export type VizPathEvent = {
  update: (crood: ResponsiveCrood) => void;
  draw: (pathway: Pathway) => void;
  clear: (pathway: Pathway) => void;
  clearAll: () => void;
};

/**
 * VizPath (Visualization Path，可视化路径)
 */
class VizPath {
  static symbol = Symbol('vizpath');

  /**
   * 上下文
   */
  context: VizPathContext;

  /**
   * 可视化路径
   */
  path: fabric.Path | null = null;

  /**
   * 路径信息（包含路径分段、路径指令、关键点及控制点信息）
   */
  pathway: ResponsivePathway = [];

  /**
   * 路径信息映射
   */
  pathwayNodeMap: WeakMap<ResponsiveCrood, PathwayNode<ResponsiveCrood>> =
    new WeakMap([]);

  /**
   * 监听事件
   */
  events: Partial<Record<keyof VizPathEvent, ((...args: any[]) => void)[]>> =
    {};

  constructor(context: VizPathContext) {
    this.context = context;
  }

  /**
   * 获取指令中的关键节点
   *
   * @note 闭合指令无关键节点
   */
  static getInstructionNodeCrood(instruction: Instruction) {
    if (instruction[0] === InstructionType.CLOSE) return;
    return {
      x: instruction[instruction.length - 2],
      y: instruction[instruction.length - 1],
    } as Crood;
  }

  /**
   * 获取路径中的路径分段
   * @param instructions 路径指令列表
   * @returns 路径分段
   */
  static getPathSections(instructions: Instruction[]) {
    const sections = instructions.reduce(
      (paths, instruction, idx, arr) => {
        if (!instruction) return paths;
        if (
          instruction[0] === InstructionType.START &&
          paths[paths.length - 1].length
        )
          paths.push([]);
        paths[paths.length - 1].push(instruction);
        if (instruction[0] === InstructionType.CLOSE && idx !== arr.length - 1)
          paths.push([]);
        return paths;
      },
      [[]] as Instruction[][]
    );
    return sections;
  }

  /**
   * 转化为响应式更改的点对象
   * @param crood 点
   * @param callback 响应式更改回调
   * @returns
   */
  private _toResponsive(crood: Crood) {
    let observes: {
      handler: (newX: number, newY: number) => void;
      id?: string;
    }[] = [];
    let temporaryIgnoreIds: string[] = [];
    const proxy = new Proxy(crood, {
      set: (target: ResponsiveCrood, p: string, value: any, receiver: any) => {
        if (p === 'x' || p === 'y') {
          const oldValue = target[p];
          const newValue = round(value, 4);
          const result = Reflect.set(target, p, newValue, receiver);
          if (oldValue !== newValue) {
            const x = p === 'x' ? newValue : target.x;
            const y = p === 'y' ? newValue : target.y;
            for (let observe of observes) {
              if (
                observe.id &&
                temporaryIgnoreIds.length &&
                temporaryIgnoreIds.indexOf(observe.id) !== -1
              )
                continue;
              observe.handler(x, y);
            }
            this._fire('update', proxy);
          }
          return result;
        } else {
          return Reflect.set(target, p, value, receiver);
        }
      },
    }) as ResponsiveCrood;
    proxy.set = (crood, skipObserverIDs = []) => {
      if (typeof crood !== 'object') return;
      if (Array.isArray(skipObserverIDs)) {
        temporaryIgnoreIds = skipObserverIDs.filter(Boolean) as string[];
      }
      proxy.x = crood.x;
      proxy.y = crood.y;
      temporaryIgnoreIds = [];
    };
    proxy.observe = (handler, options = {}) => {
      const { immediate, id } = options;
      if (immediate) handler(crood.x, crood.y);
      observes.push({ handler, id });
    };
    proxy.unobserve = (id?: string) => {
      if (!id) {
        observes.length = 0;
        return;
      }
      observes = observes.filter((i) => i.id !== id);
    };
    return proxy;
  }

  /**
   * 是否是闭合路径段
   * @param section 路径段
   */
  isClosePath(section: PathwayNode[]) {
    return (
      section[section.length - 1]?.instruction[0] === InstructionType.CLOSE
    );
  }

  /**
   * 获取前后的指令节点信息
   * @param pathwayNode 路径节点
   * @param cycle 闭合路径是否开启循环查找
   */
  getNeighboringNodes<T extends Crood>(
    pathwayNode: PathwayNode<T>,
    cycle = false
  ) {
    const { section } = pathwayNode;
    const index = section.indexOf(pathwayNode);

    let pre = section[index - 1];
    let next = section[index + 1];

    // 是否循环并且是闭合路径
    if (cycle && this.isClosePath(section)) {
      // 如果没有上一个指令，则倒数第二个指令视为上一个指令
      if (!pre) {
        pre = section[section.length - 2];
      }

      // 如果没有下一个指令，则起始指令视为下一个指令
      if (!next) {
        pre = section[0];
      }

      // 如果有下一个指令但下一个指令是闭合指令，则指向起始指令
      if (next && next.instruction[0] === InstructionType.CLOSE) {
        next = section[0];
      }
    }

    return { pre, next } as Partial<{
      pre: PathwayNode<T>;
      next: PathwayNode<T>;
    }>;
  }

  /**
   * 获取更多周围的控制点信息（前、后、上一关键点后、下一关键点前），默认循环查找
   */
  getMoreNeighboringNodes<T extends Crood>(pathwayNode: PathwayNode<T>) {
    const nodes: [
      'cur-pre' | 'cur-next' | 'pre-next' | 'next-pre',
      PathwayNode<T>
    ][] = [];

    const cur = pathwayNode;
    const { pre, next } = this.getNeighboringNodes(cur, true);

    // 特殊情况1：当前是起始节点
    if (cur.instruction[0] === InstructionType.START) {
      if (pre) {
        const { pre: ppre } = this.getNeighboringNodes(pre, true);
        if (ppre) nodes.push(['pre-next', ppre]);
        nodes.push(['cur-pre', pre]);
      }
      nodes.push(['cur-next', cur]);
      if (next) nodes.push(['next-pre', next]);
    }
    // 特殊情况2：当前是自动闭合路径的闭合前节点
    else if (next?.instruction[0] === InstructionType.CLOSE) {
      const start = pathwayNode.section[0];
      const nnext = pathwayNode.section[1];
      if (pre) nodes.push(['pre-next', pre]);
      nodes.push(['cur-pre', cur]);
      nodes.push(['cur-next', start]);
      if (nnext) nodes.push(['next-pre', nnext]);
    }
    // 正常情况
    else {
      if (pre) nodes.push(['pre-next', pre]);
      nodes.push(['cur-pre', cur]);
      nodes.push(['cur-next', cur]);
      if (next) nodes.push(['next-pre', next]);
    }

    return nodes;
  }

  /**
   * 绘制路径，建立节点与指令的关联关系，使之可以通过直接控制控制路径及点位信息来控制指令变化
   * @param pathway 路径信息
   */
  draw(pathway: Pathway) {
    pathway.forEach(({ section, originPath }) => {
      const _section: PathwayNode<ResponsiveCrood>[] = [];
      section.forEach((item) => {
        const { instruction } = item;

        const proxyItem: PathwayNode<ResponsiveCrood> = {
          section: _section,
          instruction,
        };

        // 关键点
        const node = VizPath.getInstructionNodeCrood(instruction);
        if (node) {
          const responsiveNode = this._toResponsive(node);
          responsiveNode.observe((x, y) => {
            instruction[instruction.length - 2] = x;
            instruction[instruction.length - 1] = y;
          });
          proxyItem.node = responsiveNode;
          this.pathwayNodeMap.set(proxyItem.node, proxyItem);
        }

        // 指令控制点
        const { next } = this.getNeighboringNodes(item);
        const controllers = {} as NonNullable<
          PathwayNode<ResponsiveCrood>['controllers']
        >;

        if (item?.instruction[0] === InstructionType.BEZIER_CURVE) {
          controllers.pre = this._toResponsive({
            x: item.instruction[3],
            y: item.instruction[4],
          });
          controllers.pre.observe((x, y) => {
            item.instruction[3] = x;
            item.instruction[4] = y;
          });
        }

        if (next?.instruction[0] === InstructionType.BEZIER_CURVE) {
          controllers.next = this._toResponsive({
            x: next!.instruction[1],
            y: next!.instruction[2],
          });
          controllers.next.observe((x, y) => {
            next!.instruction[1] = x;
            next!.instruction[2] = y;
          });
        }

        proxyItem.controllers = controllers;

        _section.push(proxyItem);
      });
      this.pathway.push({
        section: _section,
        originPath,
      });
    });

    this._fire('draw', pathway);
  }

  /**
   * 使用新的路径信息绘制旧路径，多个路径段则会使原路径拆分成多个
   */
  drawWithNewSections(pathway: Pathway[number], sections: Instruction[][]) {
    const { originPath } = pathway;

    const { styles, layout } = parsePathJSON(originPath);
    const newPaths = sections.map((section) => {
      const path = new fabric.Path(
        (fabric.util as any).joinPath(
          originPath.path as unknown as Instruction[]
        )
      );
      path.set({ ...styles, ...layout });
      path.path = section as unknown as fabric.Point[];
      reinitializePath(path);

      const _section: PathwayNode[] = [];
      section.forEach((instruction) => {
        _section.push({
          section: _section,
          instruction,
        });
      });

      return {
        section: _section,
        originPath: path,
      };
    });

    this.clear(originPath);
    this.draw(newPaths);
  }

  /**
   * 清除路径
   */
  clear(target: PathwayNode[] | fabric.Path) {
    const index =
      target instanceof fabric.Path
        ? this.pathway.findIndex((i) => i.originPath === target)
        : this.pathway.findIndex((i) => i.section === target);

    if (index === -1) return;

    const pathway = this.pathway[index];

    pathway.section.forEach(({ node, controllers }) => {
      if (!node) return;

      node.unobserve();
      controllers?.pre?.unobserve();
      controllers?.next?.unobserve();
      this.pathwayNodeMap.delete(node);
    });

    this.pathway.splice(index, 1);

    this._fire('clear', [pathway]);
  }

  /**
   * 清除所有路径
   */
  clearAll() {
    this.pathway.forEach(({ section }) => {
      section.forEach(({ node, controllers }) => {
        node?.unobserve();
        controllers?.pre?.unobserve();
        controllers?.next?.unobserve();
      });
    });
    this.pathway = [];
    this.pathwayNodeMap = new WeakMap([]);

    this._fire('clearAll');
  }

  /**
   * 监听事件
   * @param eventName 事件名
   * @param callback 回调
   */
  on<Event extends keyof VizPathEvent>(
    eventName: Event,
    callback: VizPathEvent[Event]
  ) {
    this.events[eventName] = this.events[eventName] ?? [];
    this.events[eventName]!.push(callback);
  }

  /**
   * 取消监听事件
   * @param eventName 事件名
   * @param callback 回调
   */
  off<Event extends keyof VizPathEvent>(
    eventName: Event,
    callback?: VizPathEvent[Event]
  ) {
    if (!callback) delete this.events[eventName];

    const handlers = this.events[eventName];
    if (!handlers) return;

    const index = handlers.indexOf(callback as (typeof handlers)[number]);
    if (index !== -1) handlers.splice(index, 1);
  }

  /**
   * 触发编辑器事件
   */
  private _fire<Event extends keyof VizPathEvent>(
    eventName: Event,
    ...data: Parameters<VizPathEvent[Event]>
  ) {
    const handlers = this.events[eventName];
    if (!handlers) return;
    for (let callback of handlers) callback(...data);
  }

  /**
   * 移动控制点
   */
  move(target: ResponsiveCrood, crood: Crood) {
    if (target.x === crood.x && target.y === crood.y) return;

    target.x = crood.x;
    target.y = crood.y;
  }

  /**
   * 移除关键点
   *
   * @note
   *
   * ① 只有一个删除节点时，删除节点前后线段，连接前后节点
   * ② 有多个删除节点，仅删除节点间的线段，中间节点同时也会被移除
   */
  remove(...targets: ResponsiveCrood[]) {
    // 找出需要删除的路径和指令索引映射，便于后续同路径下节点的批量操作
    const sectionIndexMap = targets.reduce((maps, target) => {
      const pathwayNode = this.pathwayNodeMap.get(target);
      if (!pathwayNode) return maps;

      const { section, instruction } = pathwayNode;

      const indexes = maps.get(section) ?? [];

      const index = section.findIndex((i) => i.instruction === instruction);

      indexes.push(index);

      maps.set(section, indexes);

      return maps;
    }, new Map<PathwayNode<ResponsiveCrood>[], number[]>([]));

    const needRemoveSections = Array.from(sectionIndexMap).map((item) => {
      const [section, indexes] = item;

      indexes.sort();

      const isMultipleRemove = indexes.length > 1;
      const isIncludeStartNode = indexes[0] === 0;
      const isClosePath = section[section.length - 1].instruction[0] === InstructionType.CLOSE;
      if (isMultipleRemove && isIncludeStartNode && isClosePath) indexes.push(section.length - 2);

      return item;
    })

    const sections = needRemoveSections.map(([section, indexes]) => {
      let isClosePath = this.isClosePath(section);

      // 如果路径所有点都在删除列表列表中，直接移除整个路径
      const isWholePath =
        indexes.length === section.length ||
        (isClosePath && indexes.length === section.length - 1);
      if (isWholePath) {
        return {
          pathway: this.pathway.find((i) => i.section === section)!,
          section: [],
        };
      }

      /**
       * 删除单节点时
       */
      const removeSingleNode = (index: number) => {
        // 需要克隆出新的指令列表不然会影响到originPath
        const _sections: Instruction[][] = [
          cloneDeep(section.map((i) => i.instruction)),
        ];

        const instructions = _sections[0];

        const pre = instructions.slice(0, index);
        const next = instructions.slice(index);

        if (isClosePath) {
          pre.shift();
          next.pop();
          if (next[0][0] === InstructionType.START) next.pop();
        }

        next.shift();
        next[0]?.splice(
          0,
          next[0].length,
          InstructionType.START,
          ...next[0].slice(-2)
        );

        _sections.shift();
        if (isClosePath) {
          next.push(...pre);
          pre.length = 0;
        } else {
          pre.push(...next);
          next.length = 0;
        }

        if (next.length >= 1) _sections.unshift(next);
        if (pre.length >= 1) _sections.unshift(pre);

        // 如果原本是闭合路径，且剩余节点多于两个，保留闭合状态
        if (isClosePath && _sections[0].length > 2) {
          _sections[0].push([InstructionType.LINE, ..._sections[0][0].slice(-2)] as Instruction, [InstructionType.CLOSE]);
        }

        return _sections;
      }

      /**
       * 删除多节点
       */
      const removeMulitpleNodes = (indexs: number[]) => {
        // 需要克隆出新的指令列表不然会影响到originPath
        const _sections: Instruction[][] = [
          cloneDeep(section.map((i) => i.instruction)),
        ];

        const removeIndexes =
          indexes.length <= 1
            ? indexes
            : indexes.filter(
              (i, idx, arr) =>
                arr.length <= 1 || (idx >= 1 && arr[idx - 1] + 1 === i)
            );

        for (let i = removeIndexes.length - 1, startIndex = 0; i >= 0; i--) {
          const instructions = _sections[0];
          const index = startIndex + removeIndexes[i];

          const pre = instructions.slice(0, index);
          const next = instructions.slice(index);

          if (isClosePath) {
            pre.shift();
            next.pop();
            if (next[0][0] === InstructionType.START) next.pop();
          }

          next[0]?.splice(
            0,
            next[0].length,
            InstructionType.START,
            ...next[0].slice(-2)
          );

          _sections.shift();
          if (isClosePath) {
            startIndex = next.length - 1;
            next.push(...pre);
            pre.length = 0;
          }

          if (next.length > 1) _sections.unshift(next);
          if (pre.length > 1) _sections.unshift(pre);

          isClosePath = false;
        }

        return _sections;
      }

      return {
        pathway: this.pathway.find((i) => i.section === section)!,
        section: indexes.length === 1 ? removeSingleNode(indexes[0]) : removeMulitpleNodes(indexes),
      };
    });

    sections.forEach((i) => {
      if (i.section.length) {
        this.drawWithNewSections(i.pathway, i.section);
      } else {
        this.clear(i.pathway.originPath);
      }
    });

    sectionIndexMap.clear();
  }

  /**
   * 输出路径
   */
  toPaths(pathway: ResponsivePathway = this.pathway) {
    return pathway.map(({ section }) => section.map((i) => i.instruction));
  }

  /**
   * 输出路径指令
   */
  toPathD(pathway: ResponsivePathway = this.pathway) {
    return (fabric.util as any).joinPath(this.toPaths(pathway));
  }
}

export default VizPath;
