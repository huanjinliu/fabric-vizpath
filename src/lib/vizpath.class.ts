import { fabric } from 'fabric';
import cloneDeep from 'lodash-es/cloneDeep';
import VizPathCreator from '.';
import { type Path, type Instruction, InstructionType, type PathNode } from '.';
import { parsePathJSON, repairPath } from '@utils';
import round from 'lodash-es/round';
import BaseEvent from './base-event.class';

export type ResponsiveCrood = Crood & {
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

export type ResponsivePath = {
  segment: PathNode<ResponsiveCrood>[];
  pathObject: fabric.Path;
};

/**
 * VizPath (Visualization Path，可视化路径)
 */
class VizPath extends BaseEvent<{
  draw: (paths: ResponsivePath[]) => void;
  clear: (paths: ResponsivePath[]) => void;
  update: (path: ResponsivePath) => void;
  clearAll: () => void;
  destroy: () => void;
}> {
  /**
   * 上下文
   */
  context: VizPathCreator;

  /**
   * 路径信息（包含路径分段、路径指令、路径节点及曲线变换点信息）
   */
  paths: ResponsivePath[] = [];

  /**
   * 路径信息映射
   */
  pathNodeMap: Map<Crood, PathNode> = new Map([]);

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

  constructor(context: VizPathCreator) {
    super();

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
  static getPathSegments(instructions: Instruction[]) {
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
   * 获取路径或指令列表所在的路径
   */
  getPath(target: PathNode[] | fabric.Path) {
    const index =
      target instanceof fabric.Path
        ? this.paths.findIndex((i) => i.pathObject === target)
        : this.paths.findIndex((i) => i.segment === target);

    if (index === -1) return;

    return this.paths[index];
  }

  /**
   * 提取当前路径的信息
   */
  getPathSegmentsInfo(paths: ResponsivePath[] = this.paths, precision = 3) {
    const ds = paths.map(({ segment, pathObject }) => {
      const matrix = [...pathObject.calcOwnMatrix()] as Matrix;
      const matrixWithoutTranslate = [...matrix.slice(0, 4), 0, 0];
      const instructions = segment.map((item) => {
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
    });
    return ds;
  }

  /**
   * 提取当前路径的信息
   */
  getPathData(paths: ResponsivePath[] = this.paths, precision = 3) {
    const segments = this.getPathSegmentsInfo(paths, precision);
    return segments.map((fabric.util as any).joinPath).join(' ');
  }

  /**
   * 是否是闭合路径段
   * @param segment 路径段
   */
  isClosePath(segment: PathNode[]) {
    return segment[segment.length - 1]?.instruction[0] === InstructionType.CLOSE;
  }

  /**
   * 是否是路径端点
   */
  isTerminalNode(node: PathNode) {
    // 闭合路径必然不存在端点
    if (this.isClosePath(node.segment)) return false;

    const index = node.segment.indexOf(node);

    return index === 0 || index === node.segment.length - 1;
  }

  /**
   * 获取前后的指令信息
   * @param pathNode 路径节点
   * @param cycle 闭合路径是否开启循环查找
   */
  getNeighboringInstructions<T extends Crood>(pathNode: PathNode<T>, cycle = true) {
    const { segment } = pathNode;

    const index = segment.indexOf(pathNode);

    let pre = segment[index - 1];
    let next = segment[index + 1];

    // 是否循环并且是闭合路径
    if (cycle && this.isClosePath(segment)) {
      // 如果没有上一个指令，则倒数第二个指令视为上一个指令
      if (!pre) {
        pre = segment[segment.length - 2];
      }

      // 如果没有下一个指令，则起始指令视为下一个指令
      if (!next) {
        pre = segment[0];
      }

      // 如果有下一个指令但下一个指令是闭合指令，则指向起始指令
      if (next && next.instruction[0] === InstructionType.CLOSE) {
        next = segment[0];
      }
    }

    return { pre, next } as Partial<{
      pre: PathNode<T>;
      next: PathNode<T>;
    }>;
  }

  /**
   * 获取前后的指令节点信息
   * @param pathNode 路径节点
   * @param cycle 闭合路径是否开启循环查找
   */
  getNeighboringNodes<T extends Crood>(pathNode: PathNode<T>, cycle = true) {
    const { segment } = pathNode;

    const _cycle = this.isClosePath(segment) && cycle;
    const _index = segment.indexOf(pathNode);

    let pre: PathNode<T> | undefined;
    let next: PathNode<T> | undefined;

    if (_index !== -1) {
      let i = _index;
      while (!pre && segment[i]) {
        if (i !== _index && segment[i].node) pre = segment[i];
        i--;
        if (i === -1 && _cycle) i = segment.length - 1;
        if (i === _index) break;
      }
      i = _index;
      while (!next && segment[i]) {
        if (i !== _index && segment[i].node) next = segment[i];
        i++;
        if (i === segment.length && _cycle) i = 0;
        if (i === _index) break;
      }
    }

    return { pre, next } as Partial<{
      pre: PathNode<T>;
      next: PathNode<T>;
    }>;
  }

  /**
   * 获取周围的曲线变换点信息（前、后、上一路径节点后、下一路径节点前），默认循环查找
   */
  getNeighboringCurveDots<T extends Crood>(pathNode: PathNode<T>) {
    const curveDots: {
      position: 'cur' | 'pre' | 'next';
      direction: 'pre' | 'next';
      from: PathNode<T>;
    }[] = [];

    curveDots.push({ position: 'cur', direction: 'pre', from: pathNode });
    curveDots.push({ position: 'cur', direction: 'next', from: pathNode });

    const { pre, next } = this.getNeighboringNodes(pathNode);
    if (pre) curveDots.push({ position: 'pre', direction: 'next', from: pre });
    if (next) curveDots.push({ position: 'next', direction: 'pre', from: next });

    return curveDots;
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
  draw(paths: Path) {
    const allDrawPaths: ResponsivePath[] = [];
    paths.forEach((item) => {
      const drawPath = item as ResponsivePath;
      const { segment, pathObject } = item;
      segment.forEach((pathNode, index) => {
        const { instruction } = pathNode;

        // 是否是起始点的闭合重叠点，其路径节点沿用起始点，而曲线变换点也会被起始点占用
        const isStartSyncPoint =
          segment[index + 1] && segment[index + 1].instruction?.[0] === InstructionType.CLOSE;

        // 路径节点
        const node = VizPath.getInstructionNodeCrood(instruction);
        if (node && !pathNode.node) {
          if (isStartSyncPoint) {
            (segment[0].node as ResponsiveCrood)?.observe((x, y) => {
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
            this.pathNodeMap.set(pathNode.node, pathNode);
          }
        }

        // 指令曲线变换点
        const curveDots = {} as NonNullable<PathNode<ResponsiveCrood>['curveDots']>;

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
            segment[0].curveDots = segment[0].curveDots ?? {};
            segment[0].curveDots.pre = curveDot;
          }

          if (
            pathNode?.instruction[0] === InstructionType.QUADRATIC_CURCE &&
            pre &&
            pre.instruction[0]
          ) {
            const curveDot = pre.curveDots!.next! as ResponsiveCrood;
            curveDot.observe((x, y) => {
              pathNode.instruction[1] = x;
              pathNode.instruction[2] = y;
              this._rerenderOriginPath(pathObject);
            });
            segment[0].curveDots = segment[0].curveDots ?? {};
            segment[0].curveDots.pre = curveDot;
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
            curveDots.pre = pre.curveDots!.next! as ResponsiveCrood;
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
          if (pathNode.curveDots.pre)
            this._observers.delete(pathNode.curveDots.pre as ResponsiveCrood);
          if (pathNode.curveDots.next)
            this._observers.delete(pathNode.curveDots.next as ResponsiveCrood);
        }

        if (Object.keys(curveDots).length) {
          pathNode.curveDots = curveDots;
        } else {
          delete pathNode.curveDots;
        }
      });

      const index = this.paths.indexOf(drawPath);
      if (index === -1) {
        this.paths.push(drawPath);
      } else {
        pathObject.path = segment.map((i) => i.instruction) as unknown as fabric.Point[];
        this._rerenderOriginPath(pathObject);
        this.paths.splice(index, 1, drawPath);
      }

      allDrawPaths.push(drawPath);
    });

    this.fire('draw', paths as ResponsivePath[]);

    return allDrawPaths;
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

    this.fire('update', this.getPath(path)!);
  }

  /**
   * 重新渲染路径，修正路径位置及尺寸，为了性能默认为延迟（防抖）更新
   */
  private _rerenderOriginPath(path: fabric.Path) {
    if (this._onceRerenderPaths) {
      this._onceRerenderPaths.add(path);
      return;
    }

    const { refreshPathTriggerTime, refreshDeferDuration } = this.context.options;
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
  replacePathSegments(path: ResponsivePath, segments: Instruction[][]) {
    const { pathObject } = path;

    const { styles, layout } = parsePathJSON(pathObject);
    const newPath = segments.map((segment) => {
      const path = new fabric.Path(
        (fabric.util as any).joinPath(pathObject.path as unknown as Instruction[]),
      );
      path.set({ ...styles, ...layout });
      path.path = segment as unknown as fabric.Point[];
      repairPath(path);

      const _segment: PathNode[] = [];
      segment.forEach((instruction) => {
        _segment.push({
          segment: _segment,
          instruction,
        });
      });

      return {
        segment: _segment,
        pathObject: path,
      };
    });

    return this.onceRerenderOriginPath(() => {
      this.clear(pathObject);
      const newResponsivePath = this.draw(newPath);
      this._rerenderOriginPath(pathObject);
      return newResponsivePath;
    });
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
    const segmentIndexMap = targets.reduce((maps, target) => {
      const pathNode = this.pathNodeMap.get(target) as PathNode<ResponsiveCrood>;
      if (!pathNode) return maps;

      const { segment, instruction } = pathNode;

      const indexes = maps.get(segment) ?? [];

      const index = segment.findIndex((i) => i.instruction === instruction);

      indexes.push(index);

      maps.set(segment, indexes);

      return maps;
    }, new Map<PathNode<ResponsiveCrood>[], number[]>([]));

    const needRemoveSegments = Array.from(segmentIndexMap).map((item) => {
      const [segment, indexes] = item;

      indexes.sort();

      const isMultipleRemove = indexes.length > 1;
      const isIncludeStartNode = indexes[0] === 0;
      const isClosePath = segment[segment.length - 1].instruction[0] === InstructionType.CLOSE;
      if (isMultipleRemove && isIncludeStartNode && isClosePath) indexes.push(segment.length - 2);

      return item;
    });

    const segments = needRemoveSegments.map(([segment, indexes]) => {
      let isClosePath = this.isClosePath(segment);

      // 如果路径所有点都在删除列表列表中，直接移除整个路径
      const isWholePath =
        indexes.length === segment.length || (isClosePath && indexes.length === segment.length - 1);
      if (isWholePath) {
        return {
          path: this.paths.find((i) => i.segment === segment)!,
          segment: [],
        };
      }

      /**
       * 删除单节点时
       */
      const removeSingleNode = (index: number) => {
        // 需要克隆出新的指令列表不然会影响到pathObject
        const _segments: Instruction[][] = [cloneDeep(segment.map((i) => i.instruction))];

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
      const removeMulitpleNodes = (indexs: number[]) => {
        // 需要克隆出新的指令列表不然会影响到pathObject
        const _segments: Instruction[][] = [cloneDeep(segment.map((i) => i.instruction))];

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
        path: this.paths.find((i) => i.segment === segment)!,
        segment: indexes.length === 1 ? removeSingleNode(indexes[0]) : removeMulitpleNodes(indexes),
      };
    });

    segments.forEach((i) => {
      if (i.segment.length) {
        this.replacePathSegments(i.path, i.segment);
      } else {
        this.clear(i.path.pathObject);
      }
    });

    segmentIndexMap.clear();
  }

  /**
   * 新增路径
   * @param pathNode 指令对象
   * @param instruction 新指令
   */
  insert(pathNode: PathNode<ResponsiveCrood>, instruction: Instruction) {
    const segment = pathNode.segment;

    const index = segment.indexOf(pathNode);
    if (index === -1) return;

    const newPath = this._updatePathByCommands(this.paths.find((i) => i.segment === segment)!, [
      {
        type: 'add',
        index,
        instruction,
      },
    ]);

    return newPath[0].segment[index + 1];
  }

  /**
   * 替换路径节点所在指令
   *
   * @note 路径节点的引用不会发生变化
   *
   * @param pathNode 指令对象
   * @param instruction 新指令
   */
  replace(pathNode: PathNode<ResponsiveCrood>, instruction: Instruction) {
    const segment = pathNode.segment;

    const index = segment.indexOf(pathNode);
    if (index === -1) return;

    const updateCommands: {
      type: 'add' | 'update';
      index: number;
      instruction: Instruction;
    }[] = [];

    if (index === 0 && this.isClosePath(segment)) {
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
        index: segment.length - 2,
        instruction,
      });
    } else {
      updateCommands.push({
        type: 'update',
        index,
        instruction,
      });
    }

    const newPath = this._updatePathByCommands(
      this.paths.find((i) => i.segment === segment)!,
      updateCommands,
    );

    return newPath[0].segment[index];
  }

  /**
   * 闭合路径
   */
  close(pathNode: PathNode<ResponsiveCrood>) {
    const path = this.getPath(pathNode.segment);
    if (!path) return;

    // 自闭合的路径无需再做闭合处理
    if (this.isClosePath(path.segment)) return;

    // 少于2个节点时无法实现闭合
    if (path.segment.length < 2) return;

    const updateCommands: {
      type: 'add' | 'update';
      index: number;
      instruction: Instruction;
    }[] = [];

    const startNode = path.segment[0].node!;
    const endNode = path.segment[path.segment.length - 1].node!;

    // 需要考虑添加闭合重叠点
    if (startNode.x !== endNode.x || startNode.y !== endNode.y) {
      updateCommands.push({
        type: 'add',
        index: path.segment.length - 1,
        instruction: [InstructionType.LINE, startNode.x, startNode.y],
      });
    }

    updateCommands.push({
      type: 'add',
      index: path.segment.length + updateCommands.length - 1,
      instruction: [InstructionType.CLOSE],
    });

    this._updatePathByCommands(path, updateCommands);
  }

  /**
   * 通过更新命令更新路径
   * @param target
   * @param instruction
   */
  private _updatePathByCommands(
    path: ResponsivePath,
    queue: {
      type: 'add' | 'update';
      index: number;
      instruction: Instruction;
    }[],
  ) {
    const { segment } = path;

    queue.sort((a, b) => b.index - a.index);

    queue.forEach(({ type, index, instruction }) => {
      if (type === 'add') {
        segment.splice(index + 1, 0, {
          segment,
          instruction,
        });
      }

      if (type === 'update') {
        const pathNode = segment[index];

        if (pathNode.node) {
          this.pathNodeMap.delete(pathNode.node);
          this._observers.delete(pathNode.node);
          if (pathNode.curveDots?.pre) this._observers.delete(pathNode.curveDots.pre);
          if (pathNode.curveDots?.next) this._observers.delete(pathNode.curveDots.next);
        }

        pathNode.instruction = instruction;

        delete pathNode.node;
        delete pathNode.curveDots;
      }
    });

    return this.draw([path]);
  }

  /**
   * 清除路径
   */
  clear(target: PathNode[] | fabric.Path) {
    const index =
      target instanceof fabric.Path
        ? this.paths.findIndex((i) => i.pathObject === target)
        : this.paths.findIndex((i) => i.segment === target);

    if (index === -1) return;

    const path = this.paths[index];

    path.segment.forEach(({ node, curveDots }) => {
      if (!node) return;

      node.unobserve();
      curveDots?.pre?.unobserve();
      curveDots?.next?.unobserve();
      this.pathNodeMap.delete(node);
    });

    this.paths.splice(index, 1);

    this._rerenderOriginPath(path.pathObject);

    this.fire('clear', [path]);
  }

  /**
   * 清除所有路径
   */
  clearAll() {
    this.paths.forEach(({ segment }) => {
      segment.forEach(({ node, curveDots }) => {
        node?.unobserve();
        curveDots?.pre?.unobserve();
        curveDots?.next?.unobserve();
      });
    });
    this.paths.length = 0;
    this.pathNodeMap.clear();
    this._observers.clear();

    this.fire('clearAll');
  }

  /**
   * 销毁并释放内存
   */
  destroy() {
    this.clearAll();

    this._onceRerenderPaths?.clear();
    this._onceRerenderPaths = null;

    this.context.destroy();

    this.events = {};
    this.fire('destroy');
  }
}

export default VizPath;
