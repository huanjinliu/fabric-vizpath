import { fabric } from 'fabric';
import cloneDeep from 'lodash-es/cloneDeep';
import round from 'lodash-es/round';
import {
  clearPathOffset,
  loadSVGToPathFromURL,
  parsePathJSON,
  reversePath,
  transform,
} from '@utils';
import uniqueId from 'lodash-es/uniqueId';
import VizPathEditor from './vizpath-editor.class';
import VizPathEvent from './vizpath-event.class';

export enum InstructionType {
  START = 'M',
  LINE = 'L',
  QUADRATIC_CURCE = 'Q',
  BEZIER_CURVE = 'C',
  CLOSE = 'Z',
}

export type Instruction = [`${InstructionType}`, ...number[]];

export type InstructionItem =
  | [`${InstructionType.START}`, x: number, y: number]
  | [`${InstructionType.LINE}`, x: number, y: number]
  | [`${InstructionType.QUADRATIC_CURCE}`, x0: number, y0: number, x1: number, y1: number]
  | [
      `${InstructionType.BEZIER_CURVE}`,
      x0: number,
      y0: number,
      x1: number,
      y1: number,
      x2: number,
      y2: number,
    ]
  | [`${InstructionType.CLOSE}`];

/** 响应式坐标 Responsive Coord */
export type RCoord = Coord & {
  set: (x: number, y: number, skipObserverIDs?: (string | undefined)[]) => void;
  observe: (
    handler: (newX: number, newY: number) => void,
    options?: {
      id?: string;
      immediate?: boolean;
    },
  ) => void;
  unobserve: (flag?: any) => void;
};

/** 路径节点 */
export type PathNode = {
  id: string;
  path: VizPath;
  segment: PathSegment;
  instruction: Instruction;
  node?: RCoord;
  deformers?: Partial<{
    pre: RCoord;
    next: RCoord;
  }>;
};

/** 路径子段 */
export type PathSegment = PathNode[];

export class VizPath {
  path: Path;

  segments: PathSegment[] = [];

  instructionNodeMap = new WeakMap<Instruction, PathNode>([]);

  events = new VizPathEvent<{
    'before:update': () => void;
    'after:update': () => void;
  }>();

  /**
   * 响应式节点的更改监听
   */
  private _observers = new Map<
    RCoord,
    {
      handler: (newX: number, newY: number) => void;
      id?: string;
    }[]
  >();

  /**
   * 修复请求
   */
  private _requestRepair: number | undefined;

  constructor(path: Path) {
    this.path = path;

    // 清除路径起始偏移
    clearPathOffset(path);

    // 关闭变换缓存，避免节点变换导致路径渲染被裁切
    path.ownMatrixCache = () => false;

    // 重构响应式路径
    this.setInstructions(path.path as unknown as Instruction[]);
  }

  /**
   * 遍历路径指令节点
   */
  static mapInstructionCoord(
    instructions: Instruction[],
    callback: (x: number, y: number, index: number, instruction: Instruction) => Coord,
  ) {
    return instructions.map((instruction) => {
      const _instruction = [...instruction] as Instruction;
      for (let i = 0; i < _instruction.length - 1; i += 2) {
        const coord = callback(
          instruction[i + 1] as number,
          instruction[i + 2] as number,
          i,
          instruction,
        );
        _instruction[i + 1] = coord.x;
        _instruction[i + 2] = coord.y;
      }
      return _instruction;
    });
  }

  /**
   * 将指令列表数据转为字符串形式的路径命令数据
   *
   * @param instructions 指令列表
   * @param outputOptions 提取配置
   */
  static toPathData(
    instructions: Instruction[],
    outputOptions: Partial<{
      precision: number;
      matrix: Matrix;
      withTransform: boolean;
      withTranslate: boolean;
    }> = {},
  ): string {
    const {
      precision = 4,
      matrix = [1, 0, 0, 1, 0, 0],
      withTransform = false,
      withTranslate = false,
    } = outputOptions;
    const segment = VizPath.mapInstructionCoord(instructions, (x, y) => {
      let point = new fabric.Point(x, y);
      if (withTransform) {
        point = fabric.util.transformPoint(point, matrix, !withTranslate);
      }
      return {
        x: round(point.x, precision),
        y: round(point.y, precision),
      };
    });
    return (fabric.util as any).joinPath(segment);
  }

  /**
   * 将路径命令数据转为指令列表数据结构
   */
  static toInstructions(d: string) {
    try {
      const path = new fabric.Path(d);
      const instructions = path.path as unknown as Instruction[];
      return instructions;
    } catch {
      throw Error('(VizPath Error) The path data entered is not valid.');
    }
  }

  /**
   * 变换指令
   * @param instructions 指令列表
   * @param matrix 变换矩阵
   */
  static transformInstructions(instructions: Instruction[], matrix: Matrix) {
    return VizPath.mapInstructionCoord(instructions, (x, y) =>
      fabric.util.transformPoint(new fabric.Point(x, y), matrix),
    );
  }

  /**
   * 通过svg文件链接加载并获取fabric路径对象，原文件中的基础形状也会一并转为路径对象
   *
   * @param url 文件链接
   * @param options 加载SVG后整体对象配置
   * @example
   *
   * const paths = loadFabricPathFromURL('http');
   *
   * paths.forEach(path => {
   *   ...
   *   vizPath.draw(path);
   * })
   */
  static async loadFabricPathFromURL(url: string, options: fabric.IObjectOptions = {}) {
    const object = await loadSVGToPathFromURL(url);
    if (!object) return [];

    const pathGroup = new fabric.Group([object]);

    if (options) pathGroup.set({ ...options });

    const paths: fabric.Path[] = [];

    const extract = (group: fabric.Group) => {
      const children = group.getObjects();
      group.destroy();
      children.forEach((child) => {
        if (child.type === 'group') {
          extract(child as fabric.Group);
        } else if (child.type === 'path') {
          paths.push(child as fabric.Path);
        }
      });
    };
    extract(pathGroup);

    return paths;
  }

  /**
   * 转为起始指令
   *
   * @note 不允许将闭合指令转起始指令
   */
  private _toStartInstruction(instruction: Instruction) {
    instruction[0] = InstructionType.START;
    instruction[1] = instruction[instruction.length - 2] as number;
    instruction[2] = instruction[instruction.length - 1] as number;
    instruction.length = 3;
  }

  /**
   * 转为贝塞尔曲线指令
   */
  private _toCurveInstruction(instruction: Instruction, midPoints: Coord[]) {
    instruction.splice(
      0,
      instruction.length - 2,
      [InstructionType.LINE, InstructionType.QUADRATIC_CURCE, InstructionType.BEZIER_CURVE][
        Math.min(2, midPoints.length)
      ],
      ...midPoints.slice(0, 2).reduce((list, coord) => [...list, coord.x, coord.y], [] as number[]),
    );
    return instruction;
  }

  /**
   * 修复指令，缺失的坐标统统补0
   */
  private _repairInstruction(instruction: Instruction) {
    instruction.push(0, 0, 0, 0, 0, 0);

    const length = {
      [InstructionType.START]: 3,
      [InstructionType.LINE]: 3,
      [InstructionType.QUADRATIC_CURCE]: 5,
      [InstructionType.BEZIER_CURVE]: 7,
      [InstructionType.CLOSE]: 1,
    }[instruction[0]];
    if (length) instruction.length = length;
    else {
      instruction[0] = InstructionType.START;
      instruction.length = 3;
    }

    return instruction;
  }

  /**
   * 拆分并遍历路径分段
   * @param instructions 路径指令列表
   * @param callbackfn 遍历回调
   */
  private _splitInstructions(
    instructions: Instruction[],
    callbackfn: (start: number, end: number, closed: boolean) => void,
  ) {
    if (instructions.length === 0) return instructions;

    let start = 0;
    for (let i = 0; i < instructions.length; i++) {
      const instruction = instructions[i];
      const closed = instruction[0].toUpperCase() === InstructionType.CLOSE;
      if (
        closed ||
        instructions[i + 1]?.[0] === InstructionType.START ||
        i + 1 === instructions.length
      ) {
        callbackfn(start, i, closed);
        start = i + 1;
      }
    }
  }

  /**
   * 拆分路径段
   * @param instructions 路径指令列表
   * @returns 路径分段
   */
  private _splitPathSegments(instructions: Instruction[]) {
    const pathSegments: Instruction[][] = [];
    this._splitInstructions(instructions, (start, end, closed) => {
      const segment = instructions.slice(start, end + 1);
      // 只有一个闭合指令的直接过滤
      if (segment[0][0].toUpperCase() === InstructionType.CLOSE) return;
      // 修正头指令，头指令必须是M开始指令，其他的也没效果
      if (segment[0][0] !== InstructionType.START) {
        segment[0] = [InstructionType.START, ...segment[0].slice(-2)] as Instruction;
      }
      // 如果是闭合路径
      if (closed) {
        // 小于两个点的闭合路径直接解除闭合
        if (segment.length <= 2) {
          segment.pop();
        }
        // 将闭合指令变大写，保持统一以避免后续错误
        else {
          segment[segment.length - 1][0] = InstructionType.CLOSE;
          // 闭合的路径如果在闭合指令前没有回到起始点，补充一条回到起始点的指令
          const startPoint = segment[0].slice(segment[0].length - 2);
          const endPoint = segment[segment.length - 2].slice(
            segment[segment.length - 2].length - 2,
          );
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
      }
      pathSegments.push(segment);
    });
    return pathSegments;
  }

  /**
   * 获取路径指令信息
   */
  getInstructions(
    callback = (segment: PathSegment, index: number) => segment.map((node) => node.instruction),
  ): Instruction[] {
    const segments: Instruction[][] = [];
    this.segments.forEach((segment, index) => {
      segments.push(callback(segment, index));
    });
    return segments.flat(1);
  }

  /**
   * 使用新的指令列表重构当前路径指令
   * @param instructions 新的指令列表
   */
  setInstructions(instructions: Instruction[]) {
    this.events.fire('before:update');

    // 构建新的路径段数据
    const newSegments = [] as PathSegment[];
    this._splitPathSegments(instructions).forEach((segment) => {
      const pathNodes = [] as PathNode[];
      segment.forEach((instruction) => {
        const reuseNode = this.instructionNodeMap.get(instruction);
        const pathNode = reuseNode ?? {
          id: uniqueId(),
          path: this,
          segment: pathNodes,
          instruction,
        };

        pathNode.path = this;
        pathNode.segment = pathNodes;

        pathNodes.push(pathNode);
        this.instructionNodeMap.set(instruction, pathNode);
      });
      newSegments.push(pathNodes);
    });

    // 将路径段转为响应式
    newSegments.forEach((segment) => {
      segment.forEach((node, index) => {
        this._toResponsiveNode(segment, node);
      });
      this._initSegmentDeformers(segment);
    });

    const oldSegments = this.segments;

    this.segments = newSegments;
    this.path.path = instructions as unknown as fabric.Point[];
    this.requestRepair();

    // 释放旧节点数据
    this._revokeDisusedRCoords(oldSegments);

    this.events.fire('after:update');
  }

  /**
   * 获取路径的指令字符串
   */
  getPathData(
    segment: PathSegment | null = null,
    outputOptions: Partial<{
      precision: number;
      withTransform: boolean;
      withTranslate: boolean;
    }> = {},
  ) {
    const instructions = cloneDeep(
      (segment ?? this.segments.flat(1)).map((node) => node.instruction),
    );
    const matrix = [...this.path.calcOwnMatrix()] as Matrix;
    const offset = fabric.util.transformPoint(this.path.pathOffset, matrix, true);
    matrix[4] -= offset.x;
    matrix[5] -= offset.y;
    return VizPath.toPathData(instructions, { ...outputOptions, matrix });
  }

  /**
   * 设置路径指令字符串
   */
  setPathData(data: string) {
    const path = clearPathOffset(new fabric.Path(data));
    const instructions = path.path as unknown as Instruction[];
    this.setInstructions(instructions);
  }

  /**
   * 重新修正路径的尺寸和位置
   *
   * @note
   *
   * fabric.Path对象直接改内部路径指令，其路径会渲染正确的，但却保持其原尺寸和偏移信息，导致对象信息错误，
   * 该方法使用initialize重新初始化路径，使其获取正确的尺寸，但偏移是错的，该方法同时修正偏移。
   */
  repair() {
    const path = this.path as fabric.Path;

    // 记录旧的路径信息
    const oldInfo = {
      left: path.left!,
      top: path.top!,
      width: path.width!,
      height: path.height!,
      pathOffset: { ...path.pathOffset },
    };

    // 持有旧的指令后恢复避免丢失引用
    const instructions = path.path;
    const _d = (fabric.util as any).joinPath(instructions as unknown as Instruction[]);

    // 更新路径尺寸
    path.initialize(_d);
    path.path = instructions;

    // 计算路径偏移差值
    const inverse = (value: number, inverse = false) => value * (-1) ** Number(inverse);
    const repairOffset = fabric.util.transformPoint(
      new fabric.Point(
        path.pathOffset.x -
          inverse(path.width! - oldInfo.width, path.flipX) / 2 -
          oldInfo.pathOffset.x,
        path.pathOffset.y -
          inverse(path.height! - oldInfo.height, path.flipY) / 2 -
          oldInfo.pathOffset.y,
      ),
      path.calcOwnMatrix(),
      true,
    );

    // 设置回正确的偏移位置
    path.set({
      left: oldInfo.left + repairOffset.x,
      top: oldInfo.top + repairOffset.y,
    });

    path.setCoords();

    // 更新画布
    path.canvas?.requestRenderAll();
  }

  /**
   * 申请重新修正路径的尺寸和位置，跟随浏览器刷新频率
   */
  requestRepair() {
    if (this._requestRepair) {
      window.cancelAnimationFrame(this._requestRepair);
    }
    this._requestRepair = window.requestAnimationFrame(() => {
      this.repair();
      this._requestRepair = undefined;
    });
  }

  /**
   * 转化为响应式更改的点对象
   * @param coord 点
   * @param callback 响应式更改回调
   * @returns
   */
  private _toResponsiveCoord(coord: Coord) {
    let temporaryIgnoreIds: (string | undefined)[] = [];
    const proxy = new Proxy(coord, {
      set: (target: RCoord, p: string, value: any, receiver: any) => {
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
            this.requestRepair();
          }
          return result;
        } else {
          return Reflect.set(target, p, value, receiver);
        }
      },
    }) as RCoord;
    proxy.set = (x: number, y: number, skipObserverIDs = []) => {
      if (Array.isArray(skipObserverIDs)) {
        temporaryIgnoreIds = skipObserverIDs;
      }
      proxy.x = x;
      proxy.y = y;

      temporaryIgnoreIds = [];
    };
    proxy.observe = (handler, options = {}) => {
      const { immediate, id } = options;
      if (immediate) handler(coord.x, coord.y);

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
   * 转为响应式的路径节点
   * @param pathNodes 节点列表
   * @param node 节点
   * @param index 所在指令列表的索引位置
   * @returns 响应式的路径节点
   */
  private _toResponsiveNode(pathNodes: PathNode[], node: PathNode) {
    const instruction = node.instruction;

    const coord = this.getInstructionCoord(instruction);
    if (coord) {
      if (this.isCoincideNode(node)) {
        pathNodes[0].node?.observe((x, y) => {
          instruction[instruction.length - 2] = x;
          instruction[instruction.length - 1] = y;
        });
      } else {
        node.node = node.node ?? this._toResponsiveCoord(coord);
        node.node.unobserve();
        node.node.observe((x, y) => {
          instruction[instruction.length - 2] = x;
          instruction[instruction.length - 1] = y;
        });
        node.node.set(coord.x, coord.y);
      }
    }

    return node;
  }

  /**
   * 补充变换器
   */
  private _initSegmentDeformers(segment: PathSegment) {
    const nodes = segment;

    const isQuadraticCurve = (node: PathNode) =>
      node.instruction[0] === InstructionType.QUADRATIC_CURCE;

    nodes.forEach((node, index) => {
      // 旧的变换器
      const oldDeformers = node.deformers ?? {};

      // 指令曲线变换器
      const deformers = {} as NonNullable<PathNode['deformers']>;

      const { pre, next } = this.getNeighboringInstructions(node);

      // 前一个节点是否已经有next变换器
      const preNodeHadNextDeformer = index > 0 && pre && pre.deformers?.next !== undefined;

      // 前曲线变换器
      if (node.instruction[0] === 'C' || (node.instruction[0] === 'Q' && !preNodeHadNextDeformer)) {
        const length = node.instruction.length;
        const coord = {
          x: node.instruction[length - 4] as number,
          y: node.instruction[length - 3] as number,
        };
        const curveDot = oldDeformers.pre ?? this._toResponsiveCoord(coord);
        curveDot.unobserve();
        curveDot.observe((x, y) => {
          node.instruction[length - 4] = x;
          node.instruction[length - 3] = y;
        });
        if (this.isCoincideNode(node)) {
          nodes[0].deformers = nodes[0].deformers ?? {};
          nodes[0].deformers.pre = curveDot;
        } else {
          deformers.pre = curveDot;
        }
      }

      // 后曲线变换器
      if (
        next &&
        (next.instruction[0] === 'C' || (next.instruction[0] === 'Q' && !preNodeHadNextDeformer))
      ) {
        const coord = {
          x: next.instruction[1] as number,
          y: next.instruction[2] as number,
        };
        const curveDot = oldDeformers.next ?? this._toResponsiveCoord(coord);
        curveDot.unobserve();
        curveDot.observe((x, y) => {
          next.instruction[1] = x;
          next.instruction[2] = y;
        });
        curveDot.set(coord.x, coord.y);

        if (next.instruction[0] === 'Q' && this.isCoincideNode(next)) {
          nodes[0].deformers = nodes[0].deformers ?? {};
          nodes[0].deformers.pre = curveDot;
        } else {
          deformers.next = curveDot;
        }
      }

      if (oldDeformers.pre && !deformers.pre) oldDeformers.pre.unobserve();
      if (oldDeformers.next && !deformers.next) oldDeformers.next.unobserve();

      if (Object.keys(deformers).length) {
        node.deformers = deformers;
      } else {
        delete node.deformers;
      }
    });
  }

  /**
   * 添加变换器
   */
  addNodeDeformer(node: PathNode, type: 'pre' | 'next', coord: Coord) {
    node.deformers = node.deformers ?? {};
    if (node.deformers[type]) {
      node.deformers[type]!.set(coord.x, coord.y);
      return;
    }
    node.deformers[type] = this._toResponsiveCoord(coord);
    node.deformers[type]!.set(coord.x, coord.y);
  }

  /**
   * 将画布坐标转化为特定路径的相对指令坐标位置
   */
  calcAbsolutePosition(coord: Coord, object: fabric.Path | fabric.Group = this.path): Position {
    const matrix = [...object.calcOwnMatrix()];

    // 路径如果带有偏移则需要移除偏移带来的影响
    if (object.type === 'path') {
      const offset = fabric.util.transformPoint((object as fabric.Path).pathOffset, matrix, true);

      matrix[4] -= offset.x;
      matrix[5] -= offset.y;
    }

    const point = fabric.util.transformPoint(new fabric.Point(coord.x, coord.y), matrix);

    return { left: point.x, top: point.y };
  }

  /**
   * 将路径内的相对指令坐标位置转为所在画布的坐标位置
   */
  calcRelativeCoord(position: Position, object: fabric.Path | fabric.Group = this.path): Coord {
    const matrix = [...object.calcOwnMatrix()];

    if (object.type === 'path') {
      const offset = fabric.util.transformPoint((object as fabric.Path).pathOffset, matrix, true);

      matrix[4] -= offset.x;
      matrix[5] -= offset.y;
    }

    const point = fabric.util.transformPoint(
      new fabric.Point(position.left, position.top),
      fabric.util.invertTransform(matrix),
    );

    return point;
  }

  /**
   * 获取指令中的路径节点
   *
   * @note 闭合指令无路径节点
   */
  getInstructionCoord(instruction: Instruction) {
    if (instruction[0] === InstructionType.CLOSE) return;
    return {
      x: instruction[instruction.length - 2],
      y: instruction[instruction.length - 1],
    } as Coord;
  }

  /**
   * 获取前后的指令信息
   * @param pathNode 路径节点
   * @param cycle 闭合路径是否开启循环查找
   */
  getNeighboringInstructions(node: PathNode, cycle = true) {
    const { segment } = node;

    const index = segment.indexOf(node);

    let pre: PathNode | undefined = segment[index - 1];
    let next: PathNode | undefined = segment[index + 1];

    // 是否循环并且是闭合路径
    if (cycle && this.isClosedSegment(segment)) {
      // 如果没有上一个指令，则倒数第二个指令视为上一个指令（倒数第一是闭合指令，倒数第二是起始同步指令）
      if (!pre) {
        pre = segment[segment.length - 2];
      }

      // 如果有下一个指令但下一个指令是闭合指令，则指向起始指令下一个指令
      if (!next || next.instruction[0] === InstructionType.CLOSE) {
        next = segment[1];
      }
    }

    return { pre, next } as Partial<{
      pre: PathNode;
      next: PathNode;
    }>;
  }

  /**
   * 获取前后的指令节点信息
   * @param pathNode 路径节点
   * @param cycle 闭合路径是否开启循环查找
   */
  getNeighboringNodes(node: PathNode, cycle = true) {
    const { segment } = node;

    const _cycle = cycle && this.isClosedSegment(segment);
    const _index = segment.indexOf(node);

    let pre: PathNode | undefined;
    let next: PathNode | undefined;

    if (_index !== -1) {
      let i = _index;
      while (!pre && segment[i]) {
        if (i !== _index && segment[i]) pre = segment[i];
        i--;
        if (_cycle && i === -1) i = segment.length - 3;
        if (i === _index) break;
      }
      i = _index;
      while (!next && segment[i]) {
        if (i !== _index && segment[i]) next = segment[i];
        i++;
        if (_cycle && i === segment.length - 2) i = 0;
        if (i === _index) break;
      }
    }

    return { pre, next } as Partial<{
      pre: PathNode;
      next: PathNode;
    }>;
  }

  /**
   * 获取周围的曲线变换器信息（前、后、上一路径节点后、下一路径节点前），默认循环查找
   */
  getNeighboringCurveDots(node: PathNode) {
    const deformers: {
      position: 'cur' | 'pre' | 'next';
      direction: 'pre' | 'next';
      from: PathNode;
    }[] = [];

    deformers.push({ position: 'cur', direction: 'pre', from: node });
    deformers.push({ position: 'cur', direction: 'next', from: node });

    const { pre, next } = this.getNeighboringNodes(node);
    if (pre) deformers.push({ position: 'pre', direction: 'next', from: pre });
    if (next) deformers.push({ position: 'next', direction: 'pre', from: next });

    return deformers;
  }

  /**
   * 获取路径节点可进行变换的前后配置
   */
  getConvertibleNodes(node: PathNode) {
    const { instruction } = node;
    const { pre, next } = this.getNeighboringInstructions(node);

    const convertibleNodes: ['pre' | 'next', PathNode][] = [];

    switch (instruction[0]) {
      case InstructionType.START:
        if (
          pre?.instruction[0] === InstructionType.LINE ||
          pre?.instruction[0] === InstructionType.QUADRATIC_CURCE
        ) {
          convertibleNodes.push(['pre', pre]);
        }
        if (
          next?.instruction[0] === InstructionType.LINE ||
          next?.instruction[0] === InstructionType.QUADRATIC_CURCE
        ) {
          convertibleNodes.push(['next', next]);
        }
        break;
      case InstructionType.LINE:
        convertibleNodes.push(['pre', node]);
        if (
          next?.instruction[0] === InstructionType.LINE ||
          next?.instruction[0] === InstructionType.QUADRATIC_CURCE
        ) {
          convertibleNodes.push(['next', next]);
        }
        break;
      case InstructionType.QUADRATIC_CURCE:
        convertibleNodes.push(['pre', node]);
        if (
          next?.instruction[0] === InstructionType.LINE ||
          next?.instruction[0] === InstructionType.QUADRATIC_CURCE
        ) {
          convertibleNodes.push(['next', next]);
        }
        break;
      case InstructionType.BEZIER_CURVE:
        if (
          next?.instruction[0] === InstructionType.LINE ||
          next?.instruction[0] === InstructionType.QUADRATIC_CURCE
        ) {
          convertibleNodes.push(['next', next]);
        }
        break;
      default:
        break;
    }

    return convertibleNodes;
  }

  /**
   * 是否是闭合路径段
   * @param segment 路径段
   */
  isClosedSegment(segment: PathSegment) {
    return segment[segment.length - 1]?.instruction[0] === InstructionType.CLOSE;
  }

  /**
   * 是否是路径端点
   */
  isTerminalNode(node: PathNode) {
    // 闭合路径必然不存在端点
    if (this.isClosedSegment(node.segment)) return false;

    const index = node.segment.indexOf(node);

    return index === 0 || index === node.segment.length - 1;
  }

  /**
   * 是否是起始点的闭合重叠点，其路径节点沿用起始点，而曲线变换器也会被起始点占用
   */
  isCoincideNode(node: PathNode) {
    const index = node.segment.indexOf(node);
    return node.segment[index + 1]?.instruction[0] === InstructionType.CLOSE;
  }

  /**
   * 判断两点是否可以相连
   */
  isLinkableNodes(startNode: PathNode, endNode: PathNode) {
    return startNode !== endNode && this.isTerminalNode(startNode) && this.isTerminalNode(endNode);
  }

  /**
   * 遍历路径节点
   */
  forEachNodes(callbackfn: (node: PathNode) => void) {
    this.segments.forEach((segment) => segment.forEach(callbackfn));
  }

  /**
   * 在路径片段中插入新指令
   * @param segment 路径片段
   * @param index 插入位置索引
   * @param instruction 新指令
   */
  insert(segment: PathSegment, index: number, instruction: Instruction) {
    this._executeUpdateCommands(segment, [
      {
        type: 'add',
        index,
        instruction,
      },
    ]);
    return this.instructionNodeMap.get(instruction);
  }

  /**
   * 在目标路径节点前新增指令
   * @param node 指令对象
   * @param instruction 新指令
   */
  insertBefore(node: PathNode, instruction: Instruction) {
    const segment = node.segment;

    const index = segment.indexOf(node);
    if (index === -1) return;

    return this.insert(segment, index, instruction);
  }

  /**
   * 在目标路径节点后新增指令
   * @param node 指令对象
   * @param instruction 新指令
   */
  insertAfter(node: PathNode, instruction: Instruction) {
    const segment = node.segment;

    const index = segment.indexOf(node);
    if (index === -1) return;

    return this.insert(segment, index + 1, instruction);
  }

  /**
   * 在路径片段中后添加新指令
   * @param segment 路径片段
   * @param instruction 新指令
   */
  add(segment: PathSegment, instruction: Instruction) {
    this._executeUpdateCommands(segment, [
      {
        type: 'add',
        index: segment.length,
        instruction,
      },
    ]);
    return this.instructionNodeMap.get(instruction);
  }

  /**
   * 移除路径节点
   *
   * @note
   *
   * ① 只有一个删除节点时，删除节点前后线段，连接前后节点
   *
   * ② 有多个删除节点，仅删除节点间的线段，中间节点同时也会被移除，独立节点不受影响
   */
  remove(...nodes: (PathNode | undefined)[]) {
    // 找出需要删除的路径和指令索引映射，便于后续同路径下节点的批量操作
    const segmentRemoveIndexsMap = nodes.reduce((maps, node) => {
      if (!node) return maps;

      const { segment, instruction } = node;

      const indexes = maps.get(segment) ?? [];

      const index = segment.findIndex((i) => i.instruction === instruction);

      indexes.push(index);

      maps.set(segment, indexes);

      return maps;
    }, new Map<PathSegment, number[]>([]));

    const newInstructions = this.getInstructions((segment) => {
      const instructions = segment.map((i) => i.instruction);
      if (!segmentRemoveIndexsMap.has(segment)) return instructions;

      const indexes = segmentRemoveIndexsMap.get(segment) as number[];
      if (!indexes.length) return instructions;

      const isClosedSegment = segment[segment.length - 1].instruction[0] === InstructionType.CLOSE;

      indexes.sort();

      for (let i = 0; i < indexes.length; i++) {
        const index = indexes[i] - i;
        if (instructions[index + 1] && instructions[index + 1][0] !== InstructionType.CLOSE) {
          this._toStartInstruction(instructions[index + 1]);
        }
        instructions.splice(index, 1);
      }

      // 处理闭合路径
      if (isClosedSegment) {
        instructions.pop();
        const coincideNode = instructions.pop()!;
        if (instructions.length) {
          if (indexes[0] !== 0) {
            instructions[0].splice(0, instructions[0].length, ...coincideNode);
          }
          while (instructions[0][0] !== InstructionType.START) {
            instructions.push(instructions.shift() as Instruction);
          }
        }
      }

      return instructions;
    });

    this.setInstructions(newInstructions);
  }

  /**
   * 替换指令
   *
   * @note 路径节点的引用不会发生变化
   *
   * @param node 指令对象
   * @param instruction 新指令
   */
  replace(node: PathNode, instruction: Instruction) {
    const segment = node.segment;

    const isClosed = this.isClosedSegment(segment);

    const index = segment.indexOf(node);
    if (index === -1) return;

    const updateCommands: {
      type: 'add' | 'update';
      index: number;
      instruction: Instruction;
    }[] = [];

    if (index === 0) {
      updateCommands.push({
        type: 'update',
        index: 0,
        instruction,
      });

      if (isClosed) {
        updateCommands.push({
          type: 'update',
          index: segment.length - 2,
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

    this._executeUpdateCommands(segment, updateCommands);

    return this.instructionNodeMap.get(node.instruction);
  }

  /**
   * 路径升级
   *
   * @note
   *
   * 直线先升级到二阶，再从二阶曲线升级到三阶曲线；
   */
  upgrade(node: PathNode, direction: 'pre' | 'next' | 'both' = 'both', highest = false) {
    const { instruction, node: nodeCoord } = node;

    const { pre, next } = this.getNeighboringInstructions(node, true);

    const directionNodeMap = {
      pre: instruction[0] === InstructionType.START ? pre : node,
      next,
    };

    const targets: [direction: 'pre' | 'next', pathNode: PathNode][] = [];

    if ((direction === 'both' || direction === 'pre') && directionNodeMap.pre) {
      targets.push(['pre', directionNodeMap.pre]);
    }

    if ((direction === 'both' || direction === 'next') && directionNodeMap.next) {
      targets.push(['next', directionNodeMap.next]);
    }

    const upgrade = (node: PathNode, direction: 'pre' | 'next') => {
      const instruction = node.instruction;
      if (instruction[0] === InstructionType.BEZIER_CURVE) return;

      const coord = this.getInstructionCoord(instruction)!;

      instruction[0] = {
        [InstructionType.LINE]: InstructionType.QUADRATIC_CURCE,
        [InstructionType.QUADRATIC_CURCE]: InstructionType.BEZIER_CURVE,
      }[instruction[0]];

      if (direction === 'pre') {
        const { pre } = this.getNeighboringInstructions(node);
        const insertIndex = -2;
        const insertCoord = {
          x: (coord.x + pre!.node!.x) / 2,
          y: (coord.y + pre!.node!.y) / 2,
        };
        instruction.splice(insertIndex, 0, insertCoord.x, insertCoord.y);
        this.replace(node, instruction);
      }

      if (direction === 'next') {
        const insertIndex = 1;
        const insertCoord = {
          x: (coord.x + nodeCoord!.x) / 2,
          y: (coord.y + nodeCoord!.y) / 2,
        };
        instruction.splice(insertIndex, 0, insertCoord.x, insertCoord.y);
        this.replace(node, instruction);
      }
    };

    targets.forEach(([direction, pathNode]) => {
      upgrade(pathNode, direction);
      if (highest) upgrade(pathNode, direction);
    });
  }

  /**
   * 路径降级
   *
   * @note
   *
   * 二阶贝塞尔曲线会降级为直线；三阶贝塞尔曲线会先降级为二阶贝塞尔曲线，再降级才会转化为直线。
   */
  degrade(node: PathNode, direction: 'pre' | 'next' | 'both' = 'both', lowest = false) {
    const { pre, next } = this.getNeighboringInstructions(node, true);

    const directionNodeMap = {
      pre: node.instruction[0] === InstructionType.START ? pre : node,
      next,
    };

    const targets: [direction: 'pre' | 'next', pathNode: PathNode][] = [];

    if ((direction === 'both' || direction === 'pre') && directionNodeMap.pre) {
      targets.push(['pre', directionNodeMap.pre]);
    }

    if ((direction === 'both' || direction === 'next') && directionNodeMap.next) {
      targets.push(['next', directionNodeMap.next]);
    }

    targets.forEach(([direction, pathNode]) => {
      const instruction = pathNode.instruction;
      if (['M', 'L'].includes(instruction[0])) return;

      if (lowest) {
        instruction[0] = InstructionType.LINE;
        instruction.splice(1, instruction.length - 3);
      } else {
        instruction[0] = {
          [InstructionType.QUADRATIC_CURCE]: InstructionType.LINE,
          [InstructionType.BEZIER_CURVE]: InstructionType.QUADRATIC_CURCE,
        }[instruction[0]];
        instruction.splice({ pre: -4, next: 1 }[direction], 2);
      }

      this.replace(pathNode, instruction);
    });
  }

  /**
   * 执行更新命令
   * @param segment 路径片段
   * @param queue 命令队列
   */
  private _executeUpdateCommands(
    segment: PathSegment,
    queue: {
      type: 'add' | 'update';
      index: number;
      instruction: Instruction;
    }[],
  ) {
    const newInstructions = this.getInstructions((item) => {
      const instructions = item.map((node) => node.instruction);

      if (item === segment) {
        queue.sort((a, b) => b.index - a.index);

        queue.forEach(({ type, index, instruction }) => {
          // 如果需要修复指令
          if (index === 0 && instruction[0] !== InstructionType.START) {
            this._toStartInstruction(instruction);
          }
          if (index !== 0) this._repairInstruction(instruction);

          // 添加指令
          if (type === 'add') {
            if (index === 0 && segment.length) {
              instructions[0][0] = InstructionType.LINE;
            }
            instructions.splice(index, 0, instruction);
          }

          // 更新指令
          if (type === 'update') {
            instructions[index].splice(0, instructions[index].length, ...instruction);
          }
        });
      }

      return instructions;
    });

    this.setInstructions(newInstructions);
  }

  /**
   * 路径片段拼接
   */
  joinSegment(
    startNode: PathNode,
    endNode: PathNode,
    curvePoints: Coord[] = [],
  ): {
    action: 'close' | 'join' | 'none';
    node?: PathNode;
  } {
    if (!this.isLinkableNodes(startNode, endNode)) return { action: 'none' };

    const startSegmentIndex = this.segments.indexOf(startNode.segment);
    const endSegmentIndex = this.segments.indexOf(endNode.segment);

    if (startSegmentIndex === endSegmentIndex) {
      this.closeSegment(startNode.segment, curvePoints);
      return { action: 'close', node: endNode };
    }

    const segments = this.segments.map((segment, index) => {
      let instructions = segment.map((i) => i.instruction);
      if (index === startSegmentIndex && startNode === segment[0]) {
        instructions = reversePath(instructions);
      }
      if (index === endSegmentIndex && endNode === segment[segment.length - 1]) {
        instructions = reversePath(instructions);
      }
      if (index === endSegmentIndex) {
        this._toCurveInstruction(instructions[0], curvePoints);
      }
      return instructions;
    });

    const startSegment = segments[startSegmentIndex];
    const endSegment = segments[endSegmentIndex];
    segments[startSegmentIndex] = startSegment.concat(endSegment);
    segments.splice(endSegmentIndex, 1)[0];

    this.setInstructions(segments.flat(1));

    return { action: 'join', node: this.instructionNodeMap.get(endSegment[0]) };
  }

  /**
   * 闭合路径片段
   */
  closeSegment(segment: PathSegment, curvePoints: Coord[] = []) {
    // 未闭合的路径做闭合处理
    if (!this.isClosedSegment(segment)) {
      const updateCommands: {
        type: 'add' | 'update';
        index: number;
        instruction: Instruction;
      }[] = [];

      const startNode = segment[0].node!;
      const endNode = segment[segment.length - 1].node!;

      // 需要考虑添加闭合重叠点
      if (startNode.x !== endNode.x || startNode.y !== endNode.y) {
        updateCommands.push({
          type: 'add',
          index: segment.length,
          instruction: this._toCurveInstruction(
            [InstructionType.LINE, startNode.x, startNode.y],
            curvePoints,
          ),
        });
      }

      updateCommands.push({
        type: 'add',
        index: segment.length + updateCommands.length,
        instruction: [InstructionType.CLOSE],
      });

      this._executeUpdateCommands(segment, updateCommands);
    }

    // 返回起始路径节点
    return this.instructionNodeMap.get(segment[0].instruction);
  }

  /**
   * 移除路径片段
   */
  removeSegment(segment: PathSegment) {
    const index = this.segments.indexOf(segment);
    if (index === -1) return;

    // 重新构建路径指令
    const instructions = this.segments.reduce((list, item) => {
      if (item === segment) return list;
      list.push(...item.map((node) => node.instruction));
      return list;
    }, [] as Instruction[]);

    this.setInstructions(instructions);

    return segment;
  }

  /**
   * 添加路径片段
   */
  addSegment(source: string | fabric.Path) {
    const instructions = this.getInstructions();
    const path = typeof source === 'string' ? new fabric.Path(source) : source;
    const matrix = path.calcOwnMatrix() as Matrix;
    const offset = fabric.util.transformPoint(path.pathOffset, matrix, true);
    matrix[4] -= offset.x;
    matrix[5] -= offset.y;
    instructions.push(
      ...VizPath.transformInstructions(path.path as unknown as Instruction[], matrix),
    );

    this.setInstructions(instructions);
    return this.segments[this.segments.length - 1];
  }

  /**
   * 反转路径片段
   */
  reverseSegment(segment: PathSegment) {
    const index = this.segments.indexOf(segment);
    if (index === -1) return;

    // 重新构建路径指令
    const instructions = this.segments.reduce((list, item) => {
      let _instructions = item.map((node) => node.instruction);
      if (item === segment) _instructions = reversePath(_instructions);
      list.push(..._instructions);
      return list;
    }, [] as Instruction[]);

    this.setInstructions(instructions);
  }

  /**
   * 将路径片段拆分出来并生成独立路径
   */
  splitSegment(segment: PathSegment) {
    const _segment = this.removeSegment(segment);
    if (!_segment) return null;
    const { layout, styles } = parsePathJSON(this.path);
    const clonePath = new Path(this.getPathData(_segment), { ...layout, ...styles });
    clonePath.visualize();
    return clonePath;
  }

  /**
   * 释放所有节点的响应式
   */
  private _revokeDisusedRCoords(oldSegments: PathSegment[]) {
    oldSegments.forEach((segment) => {
      segment.forEach((node) => {
        if (!this.instructionNodeMap.has(node.instruction)) {
          // @ts-ignore
          node.path = null;
          node.node?.unobserve();
          node.deformers?.pre?.unobserve();
          node.deformers?.next?.unobserve();
          delete node.node;
          delete node.deformers;
        }
      });
    });
  }

  /**
   * 结束可视化
   */
  destroy() {
    const oldSegments = this.segments;

    this.path.vizpath = null;
    this.segments = [];
    this.instructionNodeMap = new WeakMap();
    this._requestRepair = undefined;

    this._revokeDisusedRCoords(oldSegments);
  }
}

export class Path extends fabric.Path {
  vizpath: VizPath | null = null;

  /**
   * 将普通的fabric.Path对象转为可作为可视化的路径对象
   */
  static from(fabricPath: fabric.Path) {
    const path = fabricPath as any;
    const proxyPath = new Path() as any;

    const proto = proxyPath.__proto__;
    proxyPath.__proto__ = path.__proto__;
    path.__proto__ = proto;

    path.vizpath = null;
    path.visualize();

    return path as Path;
  }

  /**
   * 路径变换
   */
  static transform(path: string, transformQueue: Split<Transform>[]) {
    const instructions = new fabric.Path(path).path as unknown as Instruction[];
    instructions.forEach((item, idx) => {
      const [, ...coords] = item as unknown as [type: string, ...coords: number[]];
      for (let i = 0; i < coords.length; i += 2) {
        const { x, y } = transform(
          {
            x: instructions[idx][i + 1] as number,
            y: instructions[idx][i + 2] as number,
          },
          transformQueue,
        );
        instructions[idx][i + 1] = x;
        instructions[idx][i + 2] = y;
      }
    });
    return instructions.flat(1).join(' ');
  }

  /**
   * 可视化路径对象
   * @returns vizpath 可视化路径对象
   */
  visualize() {
    this.vizpath = this.vizpath ?? new VizPath(this);
    return this.vizpath;
  }

  /**
   * 退出可视化
   */
  exitVisualize() {
    this.leaveEditing();
    this.vizpath?.destroy();
  }

  /**
   * 从所在画布中寻找编辑器并进入编辑态
   */
  enterEditing() {
    const editor: VizPathEditor | undefined = this.canvas?.[VizPathEditor.symbol];
    if (editor) {
      editor.enterEditing(this);
      return editor;
    }

    throw Error(
      '(VizPath Error) You must ensure that the path is added to the canvas within the mounted editor prior to any editing operations.',
    );
  }

  /**
   * 退出编辑态
   */
  leaveEditing() {
    const editor: VizPathEditor | undefined = this.canvas?.[VizPathEditor.symbol];
    if (editor) {
      editor.leaveEditing();
      return editor;
    }
  }
}

export default Path;
