import { fabric } from 'fabric';
import cloneDeep from 'lodash-es/cloneDeep';
import VizPathContext from '.';
import {
  type Pathway,
  type Instruction,
  InstructionType,
  type PathwayNode,
} from '.';
import { parsePathJSON, reinitializePath, repairPath } from '@utils';

export enum VizPathSymbalType {
  PATH = 'path',
  NODE = 'node',
  CONTROLLER_POINT = 'controller-point',
  CONTROLLER_LINE = 'controller-line',
}

export type ResponsiveCrood = Crood & {
  setCrood: (crood: Crood, skipObserverIDs?: (string | undefined)[]) => void;
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
  draw: (pathway: ResponsivePathway) => void;
  clear: (pathway: ResponsivePathway) => void;
  update: (pathway: ResponsivePathway[number]) => void;
  clearAll: () => void;
  destroy: () => void;
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
   * 路径信息（包含路径分段、路径指令、路径节点及曲线变换点信息）
   */
  pathway: ResponsivePathway = [];

  /**
   * 路径信息映射
   */
  pathwayNodeMap: Map<Crood, PathwayNode> = new Map([]);

  /**
   * 监听事件
   */
  events: Partial<Record<keyof VizPathEvent, ((...args: any[]) => void)[]>> =
    {};

  /**
   * 响应式节点的更改监听
   */
  private _observers = new Map<
    ResponsiveCrood,
    {
      handler: (newX: number, newY: number) => void;
      id?: string;
    }[]
  >();

  /**
   * 防抖更新路径
   */
  private _debounceRerenderPathMap = new WeakMap<fabric.Path, number>([]);

  /**
   * 需要一次更新路径列表
   */
  private _onceRerenderPaths: Set<fabric.Path> | null = null;

  constructor(context: VizPathContext) {
    this.context = context;
  }

  /**
   * 获取指令中的路径节点
   *
   * @note 闭合指令无路径节点
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
    let temporaryIgnoreIds: (string | undefined)[] = [];
    const proxy = new Proxy(crood, {
      set: (target: ResponsiveCrood, p: string, value: any, receiver: any) => {
        if (p === 'x' || p === 'y') {
          const oldValue = target[p];
          const result = Reflect.set(target, p, value, receiver);
          if (oldValue !== value) {
            const observers = this._observers.get(proxy);
            if (observers) {
              const x = p === 'x' ? value : target.x;
              const y = p === 'y' ? value : target.y;
              for (let observe of observers) {
                if (observe.id && temporaryIgnoreIds.indexOf(observe.id) !== -1)
                  continue;
                observe.handler(x, y);
              }
            }
          }
          return result;
        } else {
          return Reflect.set(target, p, value, receiver);
        }
      },
    }) as ResponsiveCrood;
    proxy.setCrood = (crood, skipObserverIDs = []) => {
      if (typeof crood !== 'object') return;
      if (Array.isArray(skipObserverIDs)) {
        temporaryIgnoreIds = skipObserverIDs;
      }
      proxy.x = crood.x;
      proxy.y = crood.y;
      temporaryIgnoreIds = [];
    };
    proxy.observe = (handler, options = {}) => {
      const { immediate, id } = options;
      if (immediate) handler(crood.x, crood.y);

      const observers = this._observers.get(proxy) ?? [];

      const index = id
        ? observers.findIndex((observer) => observer.id === id)
        : -1;
      if (index === -1) observers.push({ handler, id });
      else observers.splice(index, 1, { handler, id });

      this._observers.set(proxy, observers);
    };
    proxy.unobserve = (id?: string) => {
      const observers = this._observers.get(proxy);
      if (!observers) return;
      if (!id) {
        this._observers.delete(proxy);
        return;
      }
      this._observers.set(
        proxy,
        observers.filter((i) => i.id !== id)
      );
    };
    return proxy;
  }

  /**
   * 提取当前路径的信息
   */
  exportPathwayD(pathway: ResponsivePathway = this.pathway) {
    return pathway
      .map(({ section, originPath }) => {
        const matrix = [...originPath.calcOwnMatrix()] as Matrix;
        const matrixWithoutTranslate = [...matrix.slice(0, 4), 0, 0];
        const instructions = section.map((item) => {
          const instruction = [...item.instruction];
          for (let i = 0; i < instruction.length - 1; i += 2) {
            const point = fabric.util.transformPoint(new fabric.Point(
              instruction[i + 1] as number,
              instruction[i + 2] as number
            ), matrix);
            const offset = fabric.util.transformPoint(
              originPath.pathOffset,
              matrixWithoutTranslate
            );
            point.x -= offset.x;
            point.y -= offset.y;
            instruction[i + 1] = point.x;
            instruction[i + 2] = point.y;
          }
          return instruction;
        });
        return (fabric.util as any).joinPath(instructions);
      })
      .join(' ');
  }

  /**
   * 输出路径指令
   */
  // toPathD(pathway: ResponsivePathway = this.pathway) {
  //   return (fabric.util as any).joinPath(this.toPaths(pathway)) as string;
  // }

  /**
   * 获取路径或指令列表所在的路径
   */
  getPathway(target: PathwayNode[] | fabric.Path) {
    const index =
      target instanceof fabric.Path
        ? this.pathway.findIndex((i) => i.originPath === target)
        : this.pathway.findIndex((i) => i.section === target);

    if (index === -1) return;

    return this.pathway[index];
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
   * 是否是路径端点
   */
  isTerminalNode(node: PathwayNode) {
    // 闭合路径必然不存在端点
    if (this.isClosePath(node.section)) return false;

    const index = node.section.indexOf(node);

    return index === 0 || index === node.section.length - 1;
  }

  /**
   * 获取前后的指令信息
   * @param pathwayNode 路径节点
   * @param cycle 闭合路径是否开启循环查找
   */
  getNeighboringInstructions<T extends Crood>(
    pathwayNode: PathwayNode<T>,
    cycle = true
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
   * 获取前后的指令节点信息
   * @param pathwayNode 路径节点
   * @param cycle 闭合路径是否开启循环查找
   */
  getNeighboringNodes<T extends Crood>(
    pathwayNode: PathwayNode<T>,
    cycle = true
  ) {
    const { section } = pathwayNode;

    const _cycle = this.isClosePath(section) && cycle;
    const _index = section.indexOf(pathwayNode);

    let pre: PathwayNode<T> | undefined;
    let next: PathwayNode<T> | undefined;

    if (_index !== -1) {
      let i = _index;
      while (!pre && section[i]) {
        if (i !== _index && section[i].node) pre = section[i];
        i--;
        if (i === -1 && _cycle) i = section.length - 1;
        if (i === _index) break;
      }
      i = _index;
      while (!next && section[i]) {
        if (i !== _index && section[i].node) next = section[i];
        i++;
        if (i === section.length && _cycle) i = 0;
        if (i === _index) break;
      }
    }

    return { pre, next } as Partial<{
      pre: PathwayNode<T>;
      next: PathwayNode<T>;
    }>;
  }

  /**
   * 获取周围的曲线变换点信息（前、后、上一路径节点后、下一路径节点前），默认循环查找
   */
  getNeighboringControllers<T extends Crood>(pathwayNode: PathwayNode<T>) {
    const controllers: {
      position: 'cur' | 'pre' | 'next';
      direction: 'pre' | 'next';
      from: PathwayNode<T>;
    }[] = [];

    controllers.push({ position: 'cur', direction: 'pre', from: pathwayNode });
    controllers.push({ position: 'cur', direction: 'next', from: pathwayNode });

    const { pre, next } = this.getNeighboringNodes(pathwayNode);
    if (pre)
      controllers.push({ position: 'pre', direction: 'next', from: pre });
    if (next)
      controllers.push({ position: 'next', direction: 'pre', from: next });

    return controllers;
  }

  /**
   * 绘制路径
   *
   * @note
   *
   * 闭合点和起始点的闭合重叠点均无路径节点和曲线变换点
   *
   * @param pathway 路径信息
   */
  draw(pathway: Pathway) {
    const allDrawPathways: ResponsivePathway = [];
    pathway.forEach((item) => {
      const drawPathway = item as ResponsivePathway[number];
      const { section, originPath } = item;
      section.forEach((pathwayNode, index) => {
        const { instruction } = pathwayNode;

        // 是否是起始点的闭合重叠点，其路径节点沿用起始点，而曲线变换点也会被起始点占用
        const isStartSyncPoint =
          section[index + 1] &&
          section[index + 1].instruction?.[0] === InstructionType.CLOSE;

        // 路径节点
        const node = VizPath.getInstructionNodeCrood(instruction);
        if (node && !pathwayNode.node) {
          if (isStartSyncPoint) {
            (section[0].node as ResponsiveCrood)?.observe((x, y) => {
              instruction[instruction.length - 2] = x;
              instruction[instruction.length - 1] = y;
              this._rerenderOriginPath(originPath);
            });
          } else {
            const responsiveNode = this._toResponsive(node);
            responsiveNode.observe((x, y) => {
              instruction[instruction.length - 2] = x;
              instruction[instruction.length - 1] = y;
              this._rerenderOriginPath(originPath);
            });
            pathwayNode.node = responsiveNode;
            this.pathwayNodeMap.set(pathwayNode.node, pathwayNode);
          }
        }

        // 指令曲线变换点
        const controllers = {} as NonNullable<
          PathwayNode<ResponsiveCrood>['controllers']
        >;

        const { pre, next } = this.getNeighboringInstructions(pathwayNode);

        // 前曲线变换点
        if (isStartSyncPoint) {
          if (pathwayNode?.instruction[0] === InstructionType.BEZIER_CURVE) {
            const controller = this._toResponsive({
              x: pathwayNode.instruction[3],
              y: pathwayNode.instruction[4],
            });
            controller.observe((x, y) => {
              pathwayNode.instruction[3] = x;
              pathwayNode.instruction[4] = y;
              this._rerenderOriginPath(originPath);
            });
            section[0].controllers = section[0].controllers ?? {};
            section[0].controllers.pre = controller;
          }

          if (
            pathwayNode?.instruction[0] === InstructionType.QUADRATIC_CURCE &&
            pre &&
            pre.instruction[0]
          ) {
            const controller = pre.controllers!.next! as ResponsiveCrood;
            controller.observe((x, y) => {
              pathwayNode.instruction[1] = x;
              pathwayNode.instruction[2] = y;
              this._rerenderOriginPath(originPath);
            });
            section[0].controllers = section[0].controllers ?? {};
            section[0].controllers.pre = controller;
          }
        } else {
          if (pathwayNode?.instruction[0] === InstructionType.BEZIER_CURVE) {
            controllers.pre = this._toResponsive({
              x: pathwayNode.instruction[3],
              y: pathwayNode.instruction[4],
            });
            controllers.pre.observe((x, y) => {
              pathwayNode.instruction[3] = x;
              pathwayNode.instruction[4] = y;
              this._rerenderOriginPath(originPath);
            });
          }

          if (
            pathwayNode?.instruction[0] === InstructionType.QUADRATIC_CURCE &&
            pre &&
            pre.instruction[0]
          ) {
            controllers.pre = pre.controllers!.next! as ResponsiveCrood;
            controllers.pre.observe((x, y) => {
              pathwayNode.instruction[1] = x;
              pathwayNode.instruction[2] = y;
              this._rerenderOriginPath(originPath);
            });
          }
        }

        // 后曲线变换点
        if (
          next &&
          [
            InstructionType.BEZIER_CURVE,
            InstructionType.QUADRATIC_CURCE,
          ].includes(next.instruction[0])
        ) {
          controllers.next = this._toResponsive({
            x: next.instruction[1],
            y: next.instruction[2],
          });
          controllers.next.observe((x, y) => {
            next.instruction[1] = x;
            next.instruction[2] = y;
            this._rerenderOriginPath(originPath);
          });
        }

        if (pathwayNode.controllers) {
          if (pathwayNode.controllers.pre)
            this._observers.delete(
              pathwayNode.controllers.pre as ResponsiveCrood
            );
          if (pathwayNode.controllers.next)
            this._observers.delete(
              pathwayNode.controllers.next as ResponsiveCrood
            );
        }

        if (Object.keys(controllers).length) {
          pathwayNode.controllers = controllers;
        } else {
          delete pathwayNode.controllers;
        }
      });

      const index = this.pathway.indexOf(drawPathway);
      if (index === -1) {
        this.pathway.push(drawPathway);
      } else {
        originPath.path = section.map(
          (i) => i.instruction
        ) as unknown as fabric.Point[];
        this._rerenderOriginPath(originPath);
        this.pathway.splice(index, 1, drawPathway);
      }

      allDrawPathways.push(drawPathway);
    });

    this._fire('draw', pathway as ResponsivePathway);

    return allDrawPathways;
  }

  /**
   * 重新渲染路径，修正路径位置及尺寸
   * @param pathway 路径信息
   *
   * @description
   *
   * fabric.Path对象直接改内部路径指令，其路径会渲染正确的，但却保持其原尺寸和偏移信息，导致对象信息错误，
   * 该方法使用initialize重新初始化路径，使其获取正确的尺寸，但偏移是错的，该方法同时修正偏移。
   */
  rerenderOriginPath(path: fabric.Path) {
    repairPath(path);
    path.canvas?.requestRenderAll();

    this._fire('update', this.getPathway(path)!);
  }

  /**
   * 重新渲染路径，修正路径位置及尺寸，为了性能默认为延迟（防抖）更新
   */
  private _rerenderOriginPath(path: fabric.Path) {
    if (this._onceRerenderPaths) {
      this._onceRerenderPaths.add(path);
      return;
    }

    const { refreshPathTriggerTime, refreshDeferDuration } =
      this.context.options;
    if (refreshPathTriggerTime === 'manual') return;

    if (refreshPathTriggerTime === 'auto') {
      this.rerenderOriginPath(path);
    } else {
      const timeout = this._debounceRerenderPathMap.get(path);
      if (timeout) clearTimeout(timeout);

      this._debounceRerenderPathMap.set(
        path,
        setTimeout(() => {
          this.rerenderOriginPath(path);
          this._debounceRerenderPathMap.delete(path);
        }, refreshDeferDuration)
      );
    }
  }

  /**
   * 在回调中执行，可以让过程中的路径重渲染操作只执行一次
   */
  onceRerenderOriginPath(callback: () => void) {
    // 外层设置了一次渲染则直接进行回调即可
    if (this._onceRerenderPaths) {
      callback();
      return;
    }
    this._onceRerenderPaths = new Set([]);
    callback();
    const paths = Array.from(this._onceRerenderPaths.values());
    this._onceRerenderPaths = null;
    paths.forEach(this._rerenderOriginPath.bind(this));
  }

  /**
   * 使用新的路径信息绘制旧路径，多个路径段则会使原路径拆分成多个
   */
  replacePathwaySections(
    pathway: ResponsivePathway[number],
    sections: Instruction[][]
  ) {
    const { originPath } = pathway;

    const { styles, layout } = parsePathJSON(originPath);
    const newPathway = sections.map((section) => {
      const path = new fabric.Path(
        (fabric.util as any).joinPath(
          originPath.path as unknown as Instruction[]
        )
      );
      path.set({ ...styles, ...layout });
      path.path = section as unknown as fabric.Point[];
      repairPath(path);

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

    this.onceRerenderOriginPath(() => {
      this.clear(originPath);
      this.draw(newPathway);
      this._rerenderOriginPath(originPath);
    });
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
   * 移除路径节点
   *
   * @note
   *
   * ① 只有一个删除节点时，删除节点前后线段，连接前后节点
   * ② 有多个删除节点，仅删除节点间的线段，中间节点同时也会被移除
   */
  remove(...targets: ResponsiveCrood[]) {
    // 找出需要删除的路径和指令索引映射，便于后续同路径下节点的批量操作
    const sectionIndexMap = targets.reduce((maps, target) => {
      const pathwayNode = this.pathwayNodeMap.get(
        target
      ) as PathwayNode<ResponsiveCrood>;
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
      const isClosePath =
        section[section.length - 1].instruction[0] === InstructionType.CLOSE;
      if (isMultipleRemove && isIncludeStartNode && isClosePath)
        indexes.push(section.length - 2);

      return item;
    });

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
          if (next[0]) next[0][0] = InstructionType.LINE;
          pre.push(...next);
          next.length = 0;
        }

        if (next.length >= 1) _sections.unshift(next);
        if (pre.length >= 1) _sections.unshift(pre);

        // 如果原本是闭合路径，且剩余节点多于1个，保留闭合状态
        if (isClosePath && _sections[0].length > 1) {
          _sections[0].push(
            [InstructionType.LINE, ..._sections[0][0].slice(-2)] as Instruction,
            [InstructionType.CLOSE]
          );
        }

        return _sections;
      };

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
      };

      return {
        pathway: this.pathway.find((i) => i.section === section)!,
        section:
          indexes.length === 1
            ? removeSingleNode(indexes[0])
            : removeMulitpleNodes(indexes),
      };
    });

    sections.forEach((i) => {
      if (i.section.length) {
        this.replacePathwaySections(i.pathway, i.section);
      } else {
        this.clear(i.pathway.originPath);
      }
    });

    sectionIndexMap.clear();
  }

  /**
   * 新增路径节点
   * @param target 参考路径节点
   * @param newTarget 新添加的路径节点位置
   */
  insert(target: ResponsiveCrood, newTarget: Crood) {
    const pathwayNode = this.pathwayNodeMap.get(target);
    if (!pathwayNode) return;

    const section = pathwayNode.section;

    const index = section.indexOf(pathwayNode);
    if (index === -1) return;

    const newPathway = this._updatePathwayByCommands(
      this.pathway.find((i) => i.section === section)!,
      [
        {
          type: 'add',
          index,
          instruction: [InstructionType.LINE, newTarget.x, newTarget.y],
        },
      ]
    );

    return newPathway[0].section[index + 1];
  }

  /**
   * 替换路径节点所在指令
   *
   * @note 路径节点的引用不会发生变化
   *
   * @param pathwayNode 指令对象
   * @param instruction 新指令
   */
  replace(pathwayNode: PathwayNode<ResponsiveCrood>, instruction: Instruction) {
    const section = pathwayNode.section;

    const index = section.indexOf(pathwayNode);
    if (index === -1) return;

    const updateCommands: {
      type: 'add' | 'update';
      index: number;
      instruction: Instruction;
    }[] = [];

    if (index === 0 && this.isClosePath(section)) {
      const newStartInstruction = [
        InstructionType.START,
        ...(instruction.slice(-2) as number[]),
      ] as Instruction;

      updateCommands.push({
        type: 'update',
        index,
        instruction: newStartInstruction,
      });

      updateCommands.push({
        type: 'update',
        index: section.length - 2,
        instruction,
      });
    } else {
      updateCommands.push({
        type: 'update',
        index,
        instruction,
      });
    }

    this._updatePathwayByCommands(
      this.pathway.find((i) => i.section === section)!,
      updateCommands
    );
  }

  /**
   * 闭合路径
   */
  close(pathwayNode: PathwayNode<ResponsiveCrood>) {
    const pathway = this.getPathway(pathwayNode.section);
    if (!pathway) return;

    // 自闭合的路径无需再做闭合处理
    if (this.isClosePath(pathway.section)) return;

    // 少于2个节点时无法实现闭合
    if (pathway.section.length < 2) return;

    const updateCommands: {
      type: 'add' | 'update';
      index: number;
      instruction: Instruction;
    }[] = [];

    const startNode = pathway.section[0].node!;
    const endNode = pathway.section[pathway.section.length - 1].node!;

    // 需要考虑添加闭合重叠点
    if (startNode.x !== endNode.x || startNode.y !== endNode.y) {
      updateCommands.push({
        type: 'add',
        index: pathway.section.length - 1,
        instruction: [InstructionType.LINE, startNode.x, startNode.y],
      });
    }

    updateCommands.push({
      type: 'add',
      index: pathway.section.length + updateCommands.length - 1,
      instruction: [InstructionType.CLOSE],
    });

    this._updatePathwayByCommands(pathway, updateCommands);
  }

  /**
   * 通过更新命令更新路径
   * @param target
   * @param instruction
   */
  private _updatePathwayByCommands(
    pathway: ResponsivePathway[number],
    queue: {
      type: 'add' | 'update';
      index: number;
      instruction: Instruction;
    }[]
  ) {
    const { section } = pathway;

    queue.sort((a, b) => b.index - a.index);

    queue.forEach(({ type, index, instruction }) => {
      if (type === 'add') {
        section.splice(index + 1, 0, {
          section,
          instruction,
        });
      }

      if (type === 'update') {
        const pathwayNode = section[index];

        if (pathwayNode.node) {
          this.pathwayNodeMap.delete(pathwayNode.node);
          this._observers.delete(pathwayNode.node);
          if (pathwayNode.controllers?.pre)
            this._observers.delete(pathwayNode.controllers.pre);
          if (pathwayNode.controllers?.next)
            this._observers.delete(pathwayNode.controllers.next);
        }

        pathwayNode.instruction = instruction;

        delete pathwayNode.node;
        delete pathwayNode.controllers;
      }
    });

    return this.draw([pathway]);
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

    this._rerenderOriginPath(pathway.originPath);

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
    this.pathwayNodeMap.clear();
    this._observers.clear();

    this._fire('clearAll');
  }

  /**
   * 销毁并释放内存
   */
  destroy() {
    this.clearAll();

    this.events = {};

    this.context.modules.forEach((module) => {
      module.unload(this);
    });

    this._fire('destroy');
  }
}

export default VizPath;
