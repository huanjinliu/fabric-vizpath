import { fabric } from 'fabric';
import cloneDeep from 'lodash-es/cloneDeep';
import defaults from 'lodash-es/defaults';
import { clearPathOffset, loadSVGToPathFromURL, parsePathJSON, repairPath } from '@utils';
import round from 'lodash-es/round';
import VizPathEvent from './vizpath-event.class';
import type VizPathModule from './vizpath-module.class';
import VizPathEditor from './vizpath-editor.class';

export enum InstructionType {
  START = 'M',
  LINE = 'L',
  QUADRATIC_CURCE = 'Q',
  BEZIER_CURVE = 'C',
  CLOSE = 'Z',
}

export type Instruction = [InstructionType, ...number[]];

/** 路径节点 */
export type VizPathNode<T extends Crood = Crood> = {
  segment: VizPathSegment<T>;
  instruction: Instruction;
  node?: T;
  curveDots?: Partial<{
    pre: T;
    next: T;
  }>;
};

/** 路径段 */
export type VizPathSegment<T extends Crood = Crood> = {
  nodes: VizPathNode<T>[];
  pathObject: fabric.Path;
};

/** 响应式坐标 Responsive Crood */
export type RCrood = Crood & {
  setCrood: (crood: Crood, skipObserverIDs?: (string | undefined)[]) => void;
  observe: (
    handler: (newX: number, newY: number) => void,
    options?: {
      id?: string;
      immediate?: boolean;
    },
  ) => void;
  unobserve: (flag?: any) => void;
};

/** 可视化路径配置 */
type VizPathOptions = {
  /**
   * 触发路径更新状态的时机
   * @default 'auto' 自动更新，defer会延迟更新，比自动更新性能好，但是状态不完全同步，manual则完全不更新等待手动更新
   */
  refreshPathTriggerTime?: 'auto' | 'manual' | 'defer';
  /**
   * 延迟更新时的延迟时间/ms，仅当[refreshPathTriggerTime='defer']时生效
   * @default 100
   */
  refreshDeferDuration?: number;
};

/**
 * 可视化路径
 */
class VizPath {
  options: Required<VizPathOptions> = {
    refreshPathTriggerTime: 'auto',
    refreshDeferDuration: 100,
  };

  editor: VizPathEditor | null = null;

  events = new VizPathEvent<{
    draw: (paths: VizPathSegment<RCrood>[]) => void;
    clear: (paths: VizPathSegment<RCrood>[]) => void;
    update: (path: VizPathSegment<RCrood>) => void;
    clearAll: () => void;
    destroy: () => void;
  }>();

  /**
   * 增强模块列表
   */
  modules: VizPathModule[] = [];

  /**
   * 路径信息（包含路径分段、路径指令、路径节点及曲线变换点信息）
   */
  segments: VizPathSegment<RCrood>[] = [];

  /**
   * 路径信息映射
   */
  croodNodeMap: Map<RCrood, VizPathNode> = new Map([]);

  /**
   * 响应式节点的更改监听
   */
  private _observers = new Map<
    RCrood,
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

  constructor(path: string = '', options: VizPathOptions = {}) {
    this.options = defaults(options, this.options);

    if (!path) return;
    const vizpaths = VizPath.parsePathData(path);
    if (vizpaths.length) this.draw(vizpaths);
  }

  /**
   * 获取路径中的路径分段
   * @param instructions 路径指令列表
   * @returns 路径分段
   */
  static getVizPathSegments(instructions: Instruction[]) {
    const segments = instructions.reduce(
      (paths, instruction, idx, arr) => {
        if (!instruction) return paths;
        if (instruction[0] === InstructionType.START && paths[paths.length - 1].length)
          paths.push([]);
        paths[paths.length - 1].push(instruction);
        if (instruction[0] === InstructionType.CLOSE && idx !== arr.length - 1) paths.push([]);
        return paths;
      },
      [[]] as Instruction[][],
    );
    return segments;
  }

  /**
   * 通过fabric.Path对象解析路径信息
   *
   * @param path farbic路径对象
   * @example
   *
   * const path = parseFabricPath(new fabric.Path());
   */
  static parseFabricPath(pathObject: fabric.Path) {
    const { layout, styles } = parsePathJSON(pathObject);

    /**
     * 第一步：拆分组合路径， 如 new fabric.Path('M 0 0 L 10 10 z M 20 20 L 40 40 z')
     */
    const instructions = cloneDeep(pathObject.path as unknown as Instruction[]);
    const segments = VizPath.getVizPathSegments(instructions).map((segment) => {
      // 为每个子路径分配新建的路径对象
      const pathObject = new fabric.Path((fabric.util as any).joinPath(segment), styles);

      pathObject.path = segment as unknown as fabric.Point[];

      return { segment, pathObject };
    });

    // 建立组并销毁组是为了保持子路径对象的正确尺寸和位置
    const group = new fabric.Group(
      segments.map((i) => i.pathObject),
      layout,
    );

    // 避免原点问题导致元素偏移
    const centerPoint = pathObject.getCenterPoint();
    group.set({
      originX: 'center',
      originY: 'center',
      left: centerPoint.x,
      top: centerPoint.y,
    });
    group.destroy();

    /**
     * 第二步：组合path
     */
    const VizPathSegments: VizPathSegment[] = segments.map(({ segment, pathObject }) => {
      // ① 清除组合元素对路径的偏移影响
      clearPathOffset(pathObject);
      repairPath(pathObject);

      // ② 修正头指令，头指令必须是M开始指令，其他的也没效果
      if (segment[0][0] !== InstructionType.START) {
        segment[0] = [
          InstructionType.START,
          ...segment[0].slice(segment[0].length - 2),
        ] as Instruction;
      }

      // ③ 闭合指令的字母全改为大小以保证统一处理
      if (segment[segment.length - 1][0].toUpperCase() === InstructionType.CLOSE) {
        segment[segment.length - 1][0] = InstructionType.CLOSE;
      }

      // ④ 小于两个点的闭合路径直接解除闭合
      if (segment.length <= 2 && segment[segment.length - 1][0] === InstructionType.CLOSE) {
        segment.pop();
      }

      // ⑤ 闭合的路径如果在闭合指令前没有回到起始点，补充一条回到起始点的指令
      const isAutoClose = segment[segment.length - 1][0] === InstructionType.CLOSE;
      if (isAutoClose) {
        const startPoint = segment[0].slice(segment[0].length - 2);
        const endPoint = segment[segment.length - 2].slice(segment[segment.length - 2].length - 2);
        if (
          // 如果路径只有一个起始点且闭合[M,Z]
          segment[0] === segment[segment.length - 2] ||
          // 或者路径闭合但是最后一个路径节点不完全等于起始点
          endPoint[0] !== startPoint[0] ||
          endPoint[1] !== startPoint[1]
        ) {
          segment.splice(segment.length - 1, 0, [
            InstructionType.LINE,
            startPoint[0],
            startPoint[1],
          ] as Instruction);
        }
      }

      // ⑥ 给路径对象添加set代理，每次set即路径更新都要触发路径重绘事件

      // ⑦ 创建path
      const _segment = {
        nodes: [] as VizPathNode[],
        pathObject,
      };
      segment.forEach((instruction) => {
        _segment.nodes.push({
          segment: _segment,
          instruction,
        });
      });

      return _segment;
    });

    return VizPathSegments;
  }

  /**
   * 通过路径指令获取Editor路径信息
   *
   * @param d 路径指令信息
   * @example
   *
   * const path = parsePathData('M 0 0 L 100 100');
   */
  static parsePathData(d: string, options: fabric.IObjectOptions = {}) {
    const path = new fabric.Path(
      d,
      defaults(options, {
        left: 0,
        top: 0,
      }),
    );
    return this.parseFabricPath(path);
  }

  /**
   * 通过svg文件链接加载并获取Editor路径信息
   *
   * @param d 路径指令信息
   * @example
   *
   * const path = parsePathFile('http');
   */
  static async parsePathFile(url: string, options: fabric.IObjectOptions = {}) {
    const object = await loadSVGToPathFromURL(url);
    if (!object) return;

    const pathGroup = new fabric.Group([object]);

    if (options) pathGroup.set({ ...options });

    const segments: VizPathSegment[] = [];

    const extract = (group: fabric.Group) => {
      const children = group.getObjects();
      group.destroy();
      children.forEach((child) => {
        if (child.type === 'group') {
          extract(child as fabric.Group);
        } else if (child.type === 'path') {
          segments.concat(VizPath.parseFabricPath(child as fabric.Path));
        }
      });
    };
    extract(pathGroup);

    return segments;
  }

  /**
   * 获取指令中的路径节点
   *
   * @note 闭合指令无路径节点
   */
  static getInstructionPathNodeCrood(instruction: Instruction) {
    if (instruction[0] === InstructionType.CLOSE) return;
    return {
      x: instruction[instruction.length - 2],
      y: instruction[instruction.length - 1],
    } as Crood;
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
      set: (target: RCrood, p: string, value: any, receiver: any) => {
        if (p === 'x' || p === 'y') {
          const oldValue = target[p];
          const result = Reflect.set(target, p, value, receiver);
          if (oldValue !== value) {
            const observers = this._observers.get(proxy);
            if (observers) {
              const x = p === 'x' ? value : target.x;
              const y = p === 'y' ? value : target.y;
              for (const observe of observers) {
                if (observe.id && temporaryIgnoreIds.indexOf(observe.id) !== -1) continue;
                observe.handler(x, y);
              }
            }
          }
          return result;
        } else {
          return Reflect.set(target, p, value, receiver);
        }
      },
    }) as RCrood;
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

      const index = id ? observers.findIndex((observer) => observer.id === id) : -1;
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
        observers.filter((i) => i.id !== id),
      );
    };
    return proxy;
  }

  /**
   * 获取路径或指令列表所在的路径段
   */
  getSegment(target: VizPathNode<RCrood>[] | fabric.Path) {
    const index =
      target instanceof fabric.Path
        ? this.segments.findIndex((i) => i.pathObject === target)
        : this.segments.findIndex((i) => i.nodes === target);

    if (index === -1) return;

    return this.segments[index];
  }

  /**
   * 提取当前路径段的信息
   */
  getSegmentInfo(segment: VizPathSegment, precision = 3) {
    const { nodes, pathObject } = segment;
    const matrix = [...pathObject.calcOwnMatrix()] as Matrix;
    const matrixWithoutTranslate = [...matrix.slice(0, 4), 0, 0];
    const instructions = nodes.map((item) => {
      const instruction = [...item.instruction];
      for (let i = 0; i < instruction.length - 1; i += 2) {
        const point = fabric.util.transformPoint(
          new fabric.Point(instruction[i + 1] as number, instruction[i + 2] as number),
          matrix,
        );
        const offset = fabric.util.transformPoint(pathObject.pathOffset, matrixWithoutTranslate);
        point.x -= offset.x;
        point.y -= offset.y;
        instruction[i + 1] = round(point.x, precision);
        instruction[i + 2] = round(point.y, precision);
      }
      return instruction;
    });
    return instructions;
  }

  /**
   * 提取当前路径的信息
   */
  getSegmentData(segment: VizPathSegment, precision = 3) {
    const instructions = this.getSegmentInfo(segment, precision);
    return (fabric.util as any).joinPath(instructions);
  }

  /**
   * 是否是闭合路径段
   * @param segment 路径段
   */
  isCloseSegment(segment: VizPathSegment) {
    return segment.nodes[segment.nodes.length - 1]?.instruction[0] === InstructionType.CLOSE;
  }

  /**
   * 是否是路径端点
   */
  isTerminalNode(node: VizPathNode) {
    // 闭合路径必然不存在端点
    if (this.isCloseSegment(node.segment)) return false;

    const index = node.segment.nodes.indexOf(node);

    return index === 0 || index === node.segment.nodes.length - 1;
  }

  /**
   * 获取前后的指令信息
   * @param pathNode 路径节点
   * @param cycle 闭合路径是否开启循环查找
   */
  getNeighboringInstructions<T extends Crood>(node: VizPathNode<T>, cycle = true) {
    const { segment } = node;
    const { nodes } = segment;

    const index = nodes.indexOf(node);

    let pre = nodes[index - 1];
    let next = nodes[index + 1];

    // 是否循环并且是闭合路径
    if (cycle && this.isCloseSegment(segment)) {
      // 如果没有上一个指令，则倒数第二个指令视为上一个指令
      if (!pre) {
        pre = nodes[nodes.length - 2];
      }

      // 如果没有下一个指令，则起始指令视为下一个指令
      if (!next) {
        pre = nodes[0];
      }

      // 如果有下一个指令但下一个指令是闭合指令，则指向起始指令
      if (next && next.instruction[0] === InstructionType.CLOSE) {
        next = nodes[0];
      }
    }

    return { pre, next } as Partial<{
      pre: VizPathNode<T>;
      next: VizPathNode<T>;
    }>;
  }

  /**
   * 获取前后的指令节点信息
   * @param pathNode 路径节点
   * @param cycle 闭合路径是否开启循环查找
   */
  getNeighboringNodes<T extends Crood>(node: VizPathNode<T>, cycle = true) {
    const { segment } = node;
    const { nodes } = segment;

    const _cycle = this.isCloseSegment(segment) && cycle;
    const _index = nodes.indexOf(node);

    let pre: VizPathNode<T> | undefined;
    let next: VizPathNode<T> | undefined;

    if (_index !== -1) {
      let i = _index;
      while (!pre && nodes[i]) {
        if (i !== _index && nodes[i].node) pre = nodes[i];
        i--;
        if (i === -1 && _cycle) i = nodes.length - 1;
        if (i === _index) break;
      }
      i = _index;
      while (!next && nodes[i]) {
        if (i !== _index && nodes[i].node) next = nodes[i];
        i++;
        if (i === nodes.length && _cycle) i = 0;
        if (i === _index) break;
      }
    }

    return { pre, next } as Partial<{
      pre: VizPathNode<T>;
      next: VizPathNode<T>;
    }>;
  }

  /**
   * 获取周围的曲线变换点信息（前、后、上一路径节点后、下一路径节点前），默认循环查找
   */
  getNeighboringCurveDots<T extends Crood>(node: VizPathNode<T>) {
    const curveDots: {
      position: 'cur' | 'pre' | 'next';
      direction: 'pre' | 'next';
      from: VizPathNode<T>;
    }[] = [];

    curveDots.push({ position: 'cur', direction: 'pre', from: node });
    curveDots.push({ position: 'cur', direction: 'next', from: node });

    const { pre, next } = this.getNeighboringNodes(node);
    if (pre) curveDots.push({ position: 'pre', direction: 'next', from: pre });
    if (next) curveDots.push({ position: 'next', direction: 'pre', from: next });

    return curveDots;
  }

  /**
   * 添加拓展模块
   */
  use(module: VizPathModule) {
    const index = this.modules.findIndex(
      (item) => (item.constructor as any).ID === (module.constructor as any).ID,
    );
    if (index !== -1) {
      this.modules.splice(index, 1);
    }

    this.modules.push(module);

    return this;
  }

  /**
   * 通过模块ID查找模块
   */
  findModuleByID<Module extends Constructor>(ID: string) {
    return this.modules.find((module) => (module.constructor as any).ID === ID) as
      | InstanceType<Module>
      | undefined;
  }

  /**
   * 查找模块
   */
  findModule<Module extends Constructor>(moduleConstructor: Module) {
    return this.findModuleByID<Module>((moduleConstructor as any).ID);
  }

  /**
   * 绘制路径
   *
   * @note
   *
   * 闭合点和起始点的闭合重叠点均无路径节点和曲线变换点
   *
   * @param path 路径信息
   */
  draw(paths: VizPathSegment[] | string) {
    const _paths = typeof paths === 'string' ? VizPath.parsePathData(paths) : paths;

    const drawedPaths: VizPathSegment<RCrood>[] = [];
    _paths.forEach((item) => {
      const drawPath = item as VizPathSegment<RCrood>;
      const { nodes, pathObject } = item;
      nodes.forEach((pathNode, index) => {
        const { instruction } = pathNode;

        // 是否是起始点的闭合重叠点，其路径节点沿用起始点，而曲线变换点也会被起始点占用
        const isStartSyncPoint =
          nodes[index + 1] && nodes[index + 1].instruction?.[0] === InstructionType.CLOSE;

        // 路径节点
        const node = VizPath.getInstructionPathNodeCrood(instruction);
        if (node && !pathNode.node) {
          if (isStartSyncPoint) {
            (nodes[0].node as RCrood)?.observe((x, y) => {
              instruction[instruction.length - 2] = x;
              instruction[instruction.length - 1] = y;
              this._rerenderOriginPath(pathObject);
            });
          } else {
            const responsiveNode = this._toResponsive(node);
            responsiveNode.observe((x, y) => {
              instruction[instruction.length - 2] = x;
              instruction[instruction.length - 1] = y;
              this._rerenderOriginPath(pathObject);
            });
            pathNode.node = responsiveNode;
            this.croodNodeMap.set(pathNode.node as RCrood, pathNode);
          }
        }

        // 指令曲线变换点
        const curveDots = {} as NonNullable<VizPathNode<RCrood>['curveDots']>;

        const { pre, next } = this.getNeighboringInstructions(pathNode);

        // 前曲线变换点
        if (isStartSyncPoint) {
          if (pathNode?.instruction[0] === InstructionType.BEZIER_CURVE) {
            const curveDot = this._toResponsive({
              x: pathNode.instruction[3],
              y: pathNode.instruction[4],
            });
            curveDot.observe((x, y) => {
              pathNode.instruction[3] = x;
              pathNode.instruction[4] = y;
              this._rerenderOriginPath(pathObject);
            });
            nodes[0].curveDots = nodes[0].curveDots ?? {};
            nodes[0].curveDots.pre = curveDot;
          }

          if (
            pathNode?.instruction[0] === InstructionType.QUADRATIC_CURCE &&
            pre &&
            pre.instruction[0]
          ) {
            const curveDot = pre.curveDots!.next! as RCrood;
            curveDot.observe((x, y) => {
              pathNode.instruction[1] = x;
              pathNode.instruction[2] = y;
              this._rerenderOriginPath(pathObject);
            });
            nodes[0].curveDots = nodes[0].curveDots ?? {};
            nodes[0].curveDots.pre = curveDot;
          }
        } else {
          if (pathNode?.instruction[0] === InstructionType.BEZIER_CURVE) {
            curveDots.pre = this._toResponsive({
              x: pathNode.instruction[3],
              y: pathNode.instruction[4],
            });
            curveDots.pre.observe((x, y) => {
              pathNode.instruction[3] = x;
              pathNode.instruction[4] = y;
              this._rerenderOriginPath(pathObject);
            });
          }

          if (
            pathNode?.instruction[0] === InstructionType.QUADRATIC_CURCE &&
            pre &&
            pre.instruction[0]
          ) {
            curveDots.pre = pre.curveDots!.next! as RCrood;
            curveDots.pre.observe((x, y) => {
              pathNode.instruction[1] = x;
              pathNode.instruction[2] = y;
              this._rerenderOriginPath(pathObject);
            });
          }
        }

        // 后曲线变换点
        if (
          next &&
          [InstructionType.BEZIER_CURVE, InstructionType.QUADRATIC_CURCE].includes(
            next.instruction[0],
          )
        ) {
          curveDots.next = this._toResponsive({
            x: next.instruction[1],
            y: next.instruction[2],
          });
          curveDots.next.observe((x, y) => {
            next.instruction[1] = x;
            next.instruction[2] = y;
            this._rerenderOriginPath(pathObject);
          });
        }

        if (pathNode.curveDots) {
          if (pathNode.curveDots.pre) this._observers.delete(pathNode.curveDots.pre as RCrood);
          if (pathNode.curveDots.next) this._observers.delete(pathNode.curveDots.next as RCrood);
        }

        if (Object.keys(curveDots).length) {
          pathNode.curveDots = curveDots;
        } else {
          delete pathNode.curveDots;
        }
      });

      const index = this.segments.findIndex((i) => i.pathObject === pathObject);
      if (index === -1) {
        this.segments.push(drawPath);
      } else {
        pathObject.path = nodes.map((i) => i.instruction) as unknown as fabric.Point[];
        this._rerenderOriginPath(pathObject);
        this.segments.splice(index, 1, drawPath);
      }

      drawedPaths.push(drawPath);
    });

    this.events.fire('draw', drawedPaths);

    return drawedPaths;
  }

  /**
   * 重新渲染路径，修正路径位置及尺寸
   * @param path 路径信息
   *
   * @description
   *
   * fabric.Path对象直接改内部路径指令，其路径会渲染正确的，但却保持其原尺寸和偏移信息，导致对象信息错误，
   * 该方法使用initialize重新初始化路径，使其获取正确的尺寸，但偏移是错的，该方法同时修正偏移。
   */
  rerenderOriginPath(path: fabric.Path) {
    repairPath(path);
    path.canvas?.requestRenderAll();

    this.events.fire('update', this.getSegment(path)!);
  }

  /**
   * 重新渲染路径，修正路径位置及尺寸，为了性能默认为延迟（防抖）更新
   */
  private _rerenderOriginPath(path: fabric.Path) {
    if (this._onceRerenderPaths) {
      this._onceRerenderPaths.add(path);
      return;
    }

    const { refreshPathTriggerTime, refreshDeferDuration } = this.options;
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
        }, refreshDeferDuration),
      );
    }
  }

  /**
   * 在回调中执行，可以让过程中的路径重渲染操作只执行一次
   */
  onceRerenderOriginPath<T>(callback: () => T): T {
    // 外层设置了一次渲染则直接进行回调即可
    if (this._onceRerenderPaths) return callback();
    this._onceRerenderPaths = new Set([]);
    const result = callback();
    const paths = Array.from(this._onceRerenderPaths.values());
    this._onceRerenderPaths.clear();
    this._onceRerenderPaths = null;
    paths.forEach(this._rerenderOriginPath.bind(this));
    return result;
  }

  /**
   * 使用新的路径信息绘制旧路径，多个路径段则会使原路径拆分成多个
   */
  replacePathSegments(originSegment: VizPathSegment, segments: Instruction[][]) {
    const { pathObject, nodes } = originSegment;

    const newPath = segments.map((segment, index) => {
      let path = pathObject;

      if (index > 0) {
        const { styles, layout } = parsePathJSON(pathObject);
        path = new fabric.Path(
          (fabric.util as any).joinPath(pathObject.path as unknown as Instruction[]),
        );
        path.set({ ...styles, ...layout });
      }

      path.path = segment as unknown as fabric.Point[];

      repairPath(path);

      const newSegment = {
        nodes: [] as VizPathNode[],
        pathObject: path,
      };
      segment.forEach((instruction) => {
        const oldInstruction =
          index === 0 ? nodes.find((i) => i.instruction === instruction) : undefined;

        if (oldInstruction) {
          oldInstruction.segment = newSegment;

          delete oldInstruction.node;
          delete oldInstruction.curveDots;
        }

        newSegment.nodes.push(
          oldInstruction ?? {
            segment: newSegment,
            instruction,
          },
        );
      });

      return newSegment;
    });

    const result = this.draw(newPath);
    this._rerenderOriginPath(pathObject);
    return result;
  }

  /**
   * 移除路径节点
   *
   * @note
   *
   * ① 只有一个删除节点时，删除节点前后线段，连接前后节点
   * ② 有多个删除节点，仅删除节点间的线段，中间节点同时也会被移除
   */
  remove(...targets: RCrood[]) {
    // 找出需要删除的路径和指令索引映射，便于后续同路径下节点的批量操作
    const segmentIndexMap = targets.reduce((maps, target) => {
      const pathNode = this.croodNodeMap.get(target) as VizPathNode<RCrood>;
      if (!pathNode) return maps;

      const { segment, instruction } = pathNode;

      const indexes = maps.get(segment.nodes) ?? [];

      const index = segment.nodes.findIndex((i) => i.instruction === instruction);

      indexes.push(index);

      maps.set(segment.nodes, indexes);

      return maps;
    }, new Map<VizPathNode<RCrood>[], number[]>([]));

    const needRemoveSegments = Array.from(segmentIndexMap).map((item) => {
      const [nodes, indexes] = item;

      indexes.sort();

      const isMultipleRemove = indexes.length > 1;
      const isIncludeStartNode = indexes[0] === 0;
      const isClosePath = nodes[nodes.length - 1].instruction[0] === InstructionType.CLOSE;
      if (isMultipleRemove && isIncludeStartNode && isClosePath) indexes.push(nodes.length - 2);

      return item;
    });

    const segments = needRemoveSegments.map(([nodes, indexes]) => {
      const segment = this.getSegment(nodes)!;
      const { pathObject } = segment;

      let isClosePath = this.isCloseSegment(segment);

      // 先替换掉路径信息，避免被修改到
      pathObject.path = cloneDeep(nodes.map((i) => i.instruction)) as any;

      // 如果路径所有点都在删除列表列表中，直接移除整个路径
      const isWholePath =
        indexes.length === nodes.length || (isClosePath && indexes.length === nodes.length - 1);
      if (isWholePath) return { segment, nodes: [] };

      /**
       * 删除单节点时
       */
      const removeSingleNode = (index: number) => {
        const _segments: Instruction[][] = [nodes.map((i) => i.instruction)];

        const instructions = _segments[0];

        const pre = instructions.slice(0, index);
        const next = instructions.slice(index);

        if (isClosePath) {
          pre.shift();
          next.pop();
          if (next[0][0] === InstructionType.START) next.pop();
        }

        next.shift();
        next[0]?.splice(0, next[0].length, InstructionType.START, ...next[0].slice(-2));

        _segments.shift();
        if (isClosePath) {
          next.push(...pre);
          pre.length = 0;
        } else {
          if (pre.length > 0 && next[0]) next[0][0] = InstructionType.LINE;
          pre.push(...next);
          next.length = 0;
        }

        if (next.length >= 1) _segments.unshift(next);
        if (pre.length >= 1) _segments.unshift(pre);

        // 如果原本是闭合路径，且剩余节点多于1个，保留闭合状态
        if (isClosePath && _segments[0].length > 1) {
          _segments[0].push([InstructionType.LINE, ..._segments[0][0].slice(-2)] as Instruction, [
            InstructionType.CLOSE,
          ]);
        }

        return _segments;
      };

      /**
       * 删除多节点
       */
      const removeMulitpleNodes = (indexes: number[]) => {
        // 需要克隆出新的指令列表不然会影响到pathObject
        const _segments: Instruction[][] = [nodes.map((i) => i.instruction)];

        const removeIndexes =
          indexes.length <= 1
            ? indexes
            : indexes.filter(
                (i, idx, arr) => arr.length <= 1 || (idx >= 1 && arr[idx - 1] + 1 === i),
              );

        for (let i = removeIndexes.length - 1, startIndex = 0; i >= 0; i--) {
          const instructions = _segments[0];
          const index = startIndex + removeIndexes[i];

          const pre = instructions.slice(0, index);
          const next = instructions.slice(index);

          if (isClosePath) {
            pre.shift();
            next.pop();
            if (next[0][0] === InstructionType.START) next.pop();
          }

          next[0]?.splice(0, next[0].length, InstructionType.START, ...next[0].slice(-2));

          _segments.shift();
          if (isClosePath) {
            startIndex = next.length - 1;
            next.push(...pre);
            pre.length = 0;
          }

          if (next.length > 1) _segments.unshift(next);
          if (pre.length > 1) _segments.unshift(pre);

          isClosePath = false;
        }

        return _segments;
      };

      return {
        segment,
        nodes: indexes.length === 1 ? removeSingleNode(indexes[0]) : removeMulitpleNodes(indexes),
      };
    });

    segments.forEach((i) => {
      if (i.nodes.length) {
        this.replacePathSegments(i.segment, i.nodes);
      } else {
        this.clear(i.segment.pathObject);
      }
    });

    segmentIndexMap.clear();
  }

  /**
   * 新增路径指令
   * @param pathNode 指令对象
   * @param instruction 新指令
   */
  insert(segment: VizPathSegment<RCrood>, index: number, instruction: Instruction) {
    const newPath = this._updatePathByCommands(segment, [
      {
        type: 'add',
        index,
        instruction,
      },
    ]);
    return newPath[0].nodes[index];
  }

  /**
   * 在节点前新增路径指令
   * @param node 指令对象
   * @param instruction 新指令
   */
  insertBeforeNode(node: VizPathNode<RCrood>, instruction: Instruction) {
    const segment = node.segment;

    const index = segment.nodes.indexOf(node);
    if (index === -1) return;

    return this.insert(segment, index, instruction);
  }

  /**
   * 在节点后新增路径指令
   * @param node 指令对象
   * @param instruction 新指令
   */
  insertAfterNode(node: VizPathNode<RCrood>, instruction: Instruction) {
    const segment = node.segment;

    const index = segment.nodes.indexOf(node);
    if (index === -1) return;

    return this.insert(segment, index + 1, instruction);
  }

  /**
   * 替换路径节点所在指令
   *
   * @note 路径节点的引用不会发生变化
   *
   * @param node 指令对象
   * @param instruction 新指令
   */
  replace(node: VizPathNode<RCrood>, instruction: Instruction) {
    const segment = node.segment;
    const { nodes } = segment;

    const isClosed = this.isCloseSegment(segment);

    let index = nodes.indexOf(node);
    if (index === -1) return;
    if (isClosed && index === nodes.length - 2) index = 0;

    const updateCommands: {
      type: 'add' | 'update';
      index: number;
      instruction: Instruction;
    }[] = [];

    if (index === 0) {
      const newStartInstruction = [
        InstructionType.START,
        ...(instruction.slice(-2) as number[]),
      ] as Instruction;

      updateCommands.push({
        type: 'update',
        index: 0,
        instruction: newStartInstruction,
      });

      if (isClosed) {
        updateCommands.push({
          type: 'update',
          index: nodes.length - 2,
          instruction,
        });
      }
    } else {
      updateCommands.push({
        type: 'update',
        index,
        instruction,
      });
    }

    const newPath = this._updatePathByCommands(
      this.segments.find((i) => i.nodes === nodes)!,
      updateCommands,
    );

    return newPath[0].nodes[index];
  }

  /**
   * 闭合路径
   */
  close(node: VizPathNode<RCrood>) {
    const segment = node.segment;
    const { nodes } = segment;

    // 自闭合的路径无需再做闭合处理
    if (this.isCloseSegment(segment)) return;

    // 少于2个节点时无法实现闭合
    if (nodes.length < 2) return;

    const updateCommands: {
      type: 'add' | 'update';
      index: number;
      instruction: Instruction;
    }[] = [];

    const startNode = nodes[0].node!;
    const endNode = nodes[nodes.length - 1].node!;

    // 需要考虑添加闭合重叠点
    if (startNode.x !== endNode.x || startNode.y !== endNode.y) {
      updateCommands.push({
        type: 'add',
        index: nodes.length,
        instruction: [InstructionType.LINE, startNode.x, startNode.y],
      });
    }

    updateCommands.push({
      type: 'add',
      index: nodes.length + updateCommands.length,
      instruction: [InstructionType.CLOSE],
    });

    this._updatePathByCommands(segment, updateCommands);
  }

  /**
   * 通过更新命令更新路径
   * @param target
   * @param instruction
   */
  private _updatePathByCommands(
    segment: VizPathSegment<RCrood>,
    queue: {
      type: 'add' | 'update';
      index: number;
      instruction: Instruction;
    }[],
  ) {
    const { nodes } = segment;

    queue.sort((a, b) => b.index - a.index);

    queue.forEach(({ type, index, instruction }) => {
      if (type === 'add') {
        // 改变原来的起始点指令类型
        if (index === 0 && nodes.length) {
          nodes.splice(0, 1, {
            segment,
            instruction: [InstructionType.LINE, nodes[0].node!.x, nodes[0].node!.y],
          });
        }
        nodes.splice(index, 0, {
          segment,
          instruction,
        });
      }

      if (type === 'update') {
        const pathNode = segment.nodes[index];

        if (pathNode.node) {
          this.croodNodeMap.delete(pathNode.node);
          this._observers.delete(pathNode.node);
          if (pathNode.curveDots?.pre) this._observers.delete(pathNode.curveDots.pre);
          if (pathNode.curveDots?.next) this._observers.delete(pathNode.curveDots.next);
        }

        pathNode.instruction = instruction;

        delete pathNode.node;
        delete pathNode.curveDots;
      }
    });

    return this.draw([segment]);
  }

  /**
   * 清除路径
   */
  clear(target: VizPathNode[] | fabric.Path) {
    const index =
      target instanceof fabric.Path
        ? this.segments.findIndex((i) => i.pathObject === target)
        : this.segments.findIndex((i) => i.nodes === target);

    if (index === -1) return;

    const segment = this.segments[index];

    segment.nodes.forEach(({ node, curveDots }) => {
      if (!node) return;

      node.unobserve();
      curveDots?.pre?.unobserve();
      curveDots?.next?.unobserve();
      this.croodNodeMap.delete(node);
    });

    this.segments.splice(index, 1);

    this._rerenderOriginPath(segment.pathObject);

    this.events.fire('clear', [segment]);
  }

  /**
   * 清除所有路径
   */
  clearAll() {
    this.segments.forEach(({ nodes }) => {
      nodes.forEach(({ node, curveDots }) => {
        node?.unobserve();
        curveDots?.pre?.unobserve();
        curveDots?.next?.unobserve();
      });
    });
    this.segments.length = 0;
    this.croodNodeMap.clear();
    this._observers.clear();

    this.events.fire('clearAll');
  }

  /**
   * 销毁
   */
  destroy() {
    this.modules.forEach((module) => {
      module.__unload(this);
    });
    this.modules.length = 0;

    this.editor?.__unload(this);
    this.editor = null;

    this.events.clear();
  }

  /**
   * 挂载编辑器
   */
  async mount(canvas: fabric.Canvas) {
    // 先加载默认内置编辑器模块
    this.editor = new VizPathEditor(canvas);
    await this.editor.__load(this);

    // 加载其他增强模块
    await new Promise<void>((resolve) => {
      let next = 0;

      const loadModule = async () => {
        const module = this.modules[next];
        if (!module) {
          resolve();
          return;
        }

        await Promise.resolve(module.__load(this));

        next++;
        loadModule();
      };

      loadModule();
    });

    this.draw(this.segments);
  }

  unmounted() {}
}

export default VizPath;
