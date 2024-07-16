import { fabric } from 'fabric';
import cloneDeep from 'lodash-es/cloneDeep';
import { clearPathOffset, loadSVGToPathFromURL, parsePathJSON, repairPath } from '@utils';

export enum InstructionType {
  START = 'M',
  LINE = 'L',
  QUADRATIC_CURCE = 'Q',
  BEZIER_CURVE = 'C',
  CLOSE = 'Z',
}

export type Instruction = [InstructionType, ...number[]];

/** 响应式坐标 Responsive Coord */
export type RCoord = Coord & {
  setCoord: (coord: Coord, skipObserverIDs?: (string | undefined)[]) => void;
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
  path: Path;
  segment: PathSegment;
  instruction: Instruction;
  node?: RCoord;
  curveDots?: Partial<{
    pre: RCoord;
    next: RCoord;
  }>;
};

/** 路径子段 */
export type PathSegment = PathNode[];

class Path {
  segments: PathSegment[];

  object: fabric.Path;

  constructor(source: string | fabric.Path, options?: fabric.IObjectOptions) {
    const sourceObject = typeof source === 'string' ? new fabric.Path(source) : source;
    if (options) sourceObject.set(options);
    const { segments, object } = this._create(sourceObject);

    this.object = object;
    this.segments = segments;
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
   * 创建路径
   */
  private _create(pathObject: fabric.Path) {
    const { layout, styles } = parsePathJSON(pathObject);

    // 1.提取路径指令数据
    const pathSegments = this._splitPathSegments(
      cloneDeep(pathObject.path as unknown as Instruction[]),
    );
    const instructions = pathSegments.flat(1);

    // 2.创建路径
    const object = new fabric.Path((fabric.util as any).joinPath(instructions));
    object.path = instructions as unknown as fabric.Point[];
    object.set(layout);
    object.set(styles);
    clearPathOffset(object);
    repairPath(object);

    // 3.构造路径段
    const segments = [] as PathSegment[];
    pathSegments.forEach((segment) => {
      const _segment = [] as PathNode[];
      segment.forEach((instruction) => {
        _segment.push({
          path: this,
          segment: _segment,
          instruction,
        });
      });
      segments.push(_segment);
    });

    return {
      segments,
      object,
    };
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
   * 使用新的指令列表重新构建路径
   * @param instructions 新的指令列表
   */
  rebuild(instructions: Instruction[]) {
    this.object.path = instructions as unknown as fabric.Point[];
    repairPath(this.object);

    // 找到可复用映射数据
    const reuseWeakMap = new WeakMap<Instruction, PathNode>([]);
    this.segments.forEach((segment) =>
      segment.forEach((node) => {
        if (instructions.some((i) => i === node.instruction)) {
          reuseWeakMap.set(node.instruction, node);
        }
      }),
    );

    // 构建新的路径段数据
    const newSegments = [] as PathSegment[];
    this._splitPathSegments(instructions).forEach((segment) => {
      const newSegment = [] as PathNode[];
      segment.forEach((instruction) => {
        const reuseNode = reuseWeakMap.get(instruction);
        if (reuseNode) {
          reuseNode.segment = newSegment;
          delete reuseNode.node;
          delete reuseNode.curveDots;
          newSegment.push(reuseNode);
        } else {
          const node = {
            path: this,
            segment: newSegment,
            instruction,
          };
          newSegment.push(node);
        }
      });
      newSegments.push(newSegment);
    });
    this.segments = newSegments;
  }

  /**
   * 遍历路径节点
   */
  forEachNodes(callbackfn: (node: PathNode) => void) {
    this.segments.forEach((segment) => segment.forEach(callbackfn));
  }
}

export default Path;
