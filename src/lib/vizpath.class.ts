import { fabric } from 'fabric';
import round from 'lodash-es/round';
import type VizPathContext from '.';
import {
  type Pathway,
  type Instruction,
  InstructionType,
  type PathwayNode,
} from '.';

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
  draw: () => void;
  clean: () => void;
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
      if (crood.x) proxy.x = crood.x;
      if (crood.y) proxy.y = crood.y;
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
    return section[section.length - 1]?.instruction[0] === InstructionType.CLOSE;
  }

  /**
   * 获取前后的指令节点信息
   */
  getAroundPathwayNodes<T extends Crood>(pathwayNode: PathwayNode<T>) {
    const { section } = pathwayNode;
    const index = section.indexOf(pathwayNode);

    let pre = section[index - 1];
    let next = section[index + 1];

    // 如果没有上一个指令，则判断是否是闭合路径，如果是闭合路径则倒数第二个指令视为上一个指令
    const isClosePath =
      section[section.length - 1].instruction[0] === InstructionType.CLOSE;
    if (isClosePath && !pre) {
      pre = section[section.length - 2];
    }

    // 如果有下一个指令且下一个指令是闭合指令，则指向起始指令
    if (next && next.instruction[0] === InstructionType.CLOSE) {
      next = section[0];
    }

    return { pre, next } as Partial<{
      pre: PathwayNode<T>;
      next: PathwayNode<T>;
    }>;
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
        const { pre, next } = this.getAroundPathwayNodes(item);
        const controllers = {} as NonNullable<
          PathwayNode<ResponsiveCrood>['controllers']
        >;
        const instructions = {
          // 如果是起始指令且为自动闭合路径，则前一个控制点来自前一个指令
          pre: (instruction[0] === InstructionType.START && pre ? pre : item)
            ?.instruction,
          next: next?.instruction,
        };

        if (instructions.pre?.[0] === InstructionType.BEZIER_CURVE) {
          controllers.pre = this._toResponsive({
            x: instructions.pre[3],
            y: instructions.pre[4],
          });
          controllers.pre.observe((x, y) => {
            instructions.pre[3] = x;
            instructions.pre[4] = y;
          });
        }

        if (instructions.next?.[0] === InstructionType.BEZIER_CURVE) {
          controllers.next = this._toResponsive({
            x: instructions.next[1],
            y: instructions.next[2],
          });
          controllers.next.observe((x, y) => {
            instructions.next![1] = x;
            instructions.next![2] = y;
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

    this._fire('draw');
  }

  /**
   * 清除所有路径
   */
  clean() {
    this.pathway.forEach(({ section }) => {
      section.forEach(({ node }) => {
        node?.unobserve();
      });
    });
    this.pathway = [];
    this.pathwayNodeMap = new WeakMap([]);

    this._fire('draw');
    this._fire('clean');
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
