import { fabric } from 'fabric';
import cloneDeep from 'lodash-es/cloneDeep';
import defaults from 'lodash-es/defaults';
import { repairPath } from '@utils';
import round from 'lodash-es/round';
import VizPathEvent from './vizpath-event.class';
import type VizPathModule from './vizpath-module.class';
import VizPathEditor from './vizpath-editor.class';
import Path, { InstructionType } from './path.class';
import type { Instruction, PathNode, PathSegment, RCoord } from './path.class';
import uniqueId from 'lodash-es/uniqueId';

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
    draw: (paths: Path) => void;
    clear: (paths: Path) => void;
    update: (path: Path) => void;
    clearAll: () => void;
    destroy: () => void;
  }>();

  /**
   * 增强模块列表
   */
  modules: VizPathModule[] = [];

  /**
   * 路径列表
   */
  paths: Path[] = [];

  /**
   * 路径信息映射
   */
  coordNodeMap: Map<RCoord, PathNode> = new Map([]);

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
   * 防抖更新路径
   */
  private _debounceRerenderPathMap = new WeakMap<fabric.Path, number>([]);

  /**
   * 需要一次更新路径列表
   */
  private _onceRerenderPaths: Set<fabric.Path> | null = null;

  constructor(path: string = '', options: VizPathOptions = {}) {
    this.options = defaults(options, this.options);

    if (path) this.paths = [new Path(path)];
  }

  /**
   * 获取指令中的路径节点
   *
   * @note 闭合指令无路径节点
   */
  static getInstructionPathNodeCoord(instruction: Instruction) {
    if (instruction[0] === InstructionType.CLOSE) return;
    return {
      x: instruction[instruction.length - 2],
      y: instruction[instruction.length - 1],
    } as Coord;
  }

  /**
   * 转化为响应式更改的点对象
   * @param coord 点
   * @param callback 响应式更改回调
   * @returns
   */
  private _toResponsive(coord: Coord) {
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
   * 获取路径或指令列表所在的路径
   */
  getPathByObject(pathObject: fabric.Path) {
    const index = this.paths.findIndex((i) => i === pathObject);

    if (index === -1) return;

    return this.paths[index];
  }

  /**
   * 获取路径或指令列表所在的路径
   */
  getPathBySegment(segment: PathSegment) {
    const index = this.paths.findIndex((i) => i.segments.includes(segment));

    if (index === -1) return;

    return this.paths[index];
  }

  /**
   * 提取当前路径的信息
   */
  getPathInfo(path: Path, precision = 3) {
    const { segments } = path;
    const matrix = [...path.calcOwnMatrix()] as Matrix;
    const matrixWithoutTranslate = [...matrix.slice(0, 4), 0, 0];
    const instructions = segments.flat(1).map((item) => {
      const instruction = [...item.instruction];
      for (let i = 0; i < instruction.length - 1; i += 2) {
        const point = fabric.util.transformPoint(
          new fabric.Point(instruction[i + 1] as number, instruction[i + 2] as number),
          matrix,
        );
        const offset = fabric.util.transformPoint(path.pathOffset, matrixWithoutTranslate);
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
  getPathData(path: Path, precision = 3) {
    const instructions = this.getPathInfo(path, precision);
    return (fabric.util as any).joinPath(instructions);
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
   * 获取前后的指令信息
   * @param pathNode 路径节点
   * @param cycle 闭合路径是否开启循环查找
   */
  getNeighboringInstructions(node: PathNode, cycle = true) {
    const { segment } = node;

    const index = segment.indexOf(node);

    let pre = segment[index - 1];
    let next = segment[index + 1];

    // 是否循环并且是闭合路径
    if (cycle && this.isClosedSegment(segment)) {
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

    const _cycle = this.isClosedSegment(segment) && cycle;
    const _index = segment.indexOf(node);

    let pre: PathNode | undefined;
    let next: PathNode | undefined;

    if (_index !== -1) {
      let i = _index;
      while (!pre && segment[i]) {
        if (i !== _index && segment[i]) pre = segment[i];
        i--;
        if (i === -1 && _cycle) i = segment.length - 1;
        if (i === _index) break;
      }
      i = _index;
      while (!next && segment[i]) {
        if (i !== _index && segment[i]) next = segment[i];
        i++;
        if (i === segment.length && _cycle) i = 0;
        if (i === _index) break;
      }
    }

    return { pre, next } as Partial<{
      pre: PathNode;
      next: PathNode;
    }>;
  }

  /**
   * 获取周围的曲线变换点信息（前、后、上一路径节点后、下一路径节点前），默认循环查找
   */
  getNeighboringCurveDots(node: PathNode) {
    const curveDots: {
      position: 'cur' | 'pre' | 'next';
      direction: 'pre' | 'next';
      from: PathNode;
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
   * @param path 路径对象
   */
  private _draw(path: Path) {
    const { segments } = path;
    segments.forEach((segment) => {
      segment.forEach((pathNode, index) => {
        const { instruction } = pathNode;

        // 是否是起始点的闭合重叠点，其路径节点沿用起始点，而曲线变换点也会被起始点占用
        const isStartSyncPoint = segment[index + 1]?.instruction?.[0] === InstructionType.CLOSE;

        // 路径节点
        const node = VizPath.getInstructionPathNodeCoord(instruction);
        if (node && !pathNode.node) {
          if (isStartSyncPoint) {
            segment[0].node?.observe((x, y) => {
              instruction[instruction.length - 2] = x;
              instruction[instruction.length - 1] = y;
              this._rerenderOriginPath(path);
            });
          } else {
            const responsiveNode = this._toResponsive(node);
            responsiveNode.observe((x, y) => {
              instruction[instruction.length - 2] = x;
              instruction[instruction.length - 1] = y;
              this._rerenderOriginPath(path);
            });
            pathNode.node = responsiveNode;
            this.coordNodeMap.set(pathNode.node as RCoord, pathNode);
          }
        }

        // 指令曲线变换点
        const curveDots = {} as NonNullable<PathNode['curveDots']>;

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
              this._rerenderOriginPath(path);
            });
            segment[0].curveDots = segment[0].curveDots ?? {};
            segment[0].curveDots.pre = curveDot;
          }

          if (
            pathNode?.instruction[0] === InstructionType.QUADRATIC_CURCE &&
            pre &&
            pre.instruction[0]
          ) {
            const curveDot = pre.curveDots!.next! as RCoord;
            curveDot.observe((x, y) => {
              pathNode.instruction[1] = x;
              pathNode.instruction[2] = y;
              this._rerenderOriginPath(path);
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
              this._rerenderOriginPath(path);
            });
          }

          if (
            pathNode?.instruction[0] === InstructionType.QUADRATIC_CURCE &&
            pre &&
            pre.instruction[0]
          ) {
            curveDots.pre = pre.curveDots!.next! as RCoord;
            curveDots.pre.observe((x, y) => {
              pathNode.instruction[1] = x;
              pathNode.instruction[2] = y;
              this._rerenderOriginPath(path);
            });
          }
        }

        // 后曲线变换点
        if (next && ['Q', 'C'].includes(next.instruction[0])) {
          curveDots.next = this._toResponsive({
            x: next.instruction[1],
            y: next.instruction[2],
          });
          curveDots.next.observe((x, y) => {
            next.instruction[1] = x;
            next.instruction[2] = y;
            this._rerenderOriginPath(path);
          });
        }

        if (pathNode.curveDots) {
          if (pathNode.curveDots.pre) this._observers.delete(pathNode.curveDots.pre as RCoord);
          if (pathNode.curveDots.next) this._observers.delete(pathNode.curveDots.next as RCoord);
        }

        if (Object.keys(curveDots).length) {
          pathNode.curveDots = curveDots;
        } else {
          delete pathNode.curveDots;
        }
      });
    });

    const index = this.paths.findIndex((i) => i === path);
    if (index === -1) {
      this.paths.push(path);
    } else {
      path.path = segments.flat(1).map((i) => i.instruction) as unknown as fabric.Point[];
      this._rerenderOriginPath(path);
      this.paths.splice(index, 1, path);
    }

    this.events.fire('draw', path);

    return path;
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
  draw(source: string | fabric.Path, options?: fabric.IObjectOptions) {
    const path = new Path(source, options);
    return this._draw(path);
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

    this.events.fire('update', this.getPathByObject(path)!);
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
   * 使用新的路径信息绘制旧路径
   */
  redraw(originPath: Path, instructions: Instruction[]) {
    originPath.reinitialize(instructions);
    const result = this._draw(originPath);
    this._rerenderOriginPath(originPath);
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
  remove(...targets: RCoord[]) {
    // 找出需要删除的路径和指令索引映射，便于后续同路径下节点的批量操作
    const segmentIndexMap = targets.reduce((maps, target) => {
      const pathNode = this.coordNodeMap.get(target) as PathNode;
      if (!pathNode) return maps;

      const { segment, instruction } = pathNode;

      const indexes = maps.get(segment) ?? [];

      const index = segment.findIndex((i) => i.instruction === instruction);

      indexes.push(index);

      maps.set(segment, indexes);

      return maps;
    }, new Map<PathNode[], number[]>([]));

    const needRemoveSegments = Array.from(segmentIndexMap).map((item) => {
      const [nodes, indexes] = item;

      indexes.sort();

      const isMultipleRemove = indexes.length > 1;
      const isIncludeStartNode = indexes[0] === 0;
      const isClosedSegment = nodes[nodes.length - 1].instruction[0] === InstructionType.CLOSE;
      if (isMultipleRemove && isIncludeStartNode && isClosedSegment) indexes.push(nodes.length - 2);

      return item;
    });

    const segments = needRemoveSegments.map(([segment, indexes]) => {
      const path = this.getPathBySegment(segment)!;
      // 先替换掉路径信息，避免拼接路径信息修改到原路径对象
      path.path = cloneDeep(segment.map((i) => i.instruction)) as any;

      let isClosedSegment = this.isClosedSegment(segment);

      // 如果路径所有点都在删除列表列表中，直接移除整个路径
      const isWholePath =
        indexes.length === segment.length ||
        (isClosedSegment && indexes.length === segment.length - 1);
      if (isWholePath) return { path, segment, instructions: [] };

      /**
       * 删除单节点时
       */
      const removeSingleNode = (index: number) => {
        const _segments: Instruction[][] = [segment.map((i) => i.instruction)];

        const instructions = _segments[0];

        const pre = instructions.slice(0, index);
        const next = instructions.slice(index);

        if (isClosedSegment) {
          pre.shift();
          next.pop();
          if (next[0][0] === InstructionType.START) next.pop();
        }

        next.shift();
        next[0]?.splice(0, next[0].length, InstructionType.START, ...next[0].slice(-2));

        _segments.shift();
        if (isClosedSegment) {
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
        if (isClosedSegment && _segments[0].length > 1) {
          _segments[0].push([InstructionType.LINE, ..._segments[0][0].slice(-2)] as Instruction, [
            InstructionType.CLOSE,
          ]);
        }

        return _segments.flat(1);
      };

      /**
       * 删除多节点
       */
      const removeMulitpleNodes = (indexes: number[]) => {
        const _segments: Instruction[][] = [segment.map((i) => i.instruction)];

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

          if (isClosedSegment) {
            pre.shift();
            next.pop();
            if (next[0][0] === InstructionType.START) next.pop();
          }

          next[0]?.splice(0, next[0].length, InstructionType.START, ...next[0].slice(-2));

          _segments.shift();
          if (isClosedSegment) {
            startIndex = next.length - 1;
            next.push(...pre);
            pre.length = 0;
          }

          if (next.length > 1) _segments.unshift(next);
          if (pre.length > 1) _segments.unshift(pre);

          isClosedSegment = false;
        }

        return _segments.flat(1);
      };

      return {
        path,
        segment,
        instructions:
          indexes.length === 1 ? removeSingleNode(indexes[0]) : removeMulitpleNodes(indexes),
      };
    });

    segments.forEach((i) => {
      if (i.instructions.length) {
        this.redraw(i.path, i.instructions);
      } else {
        this.clearPathSegment(i.path, i.segment);
      }
    });

    segmentIndexMap.clear();
  }

  /**
   * 新增路径指令
   * @param pathNode 指令对象
   * @param instruction 新指令
   */
  insert(segment: PathSegment, index: number, instruction: Instruction) {
    this._updatePathByCommands(segment, [
      {
        type: 'add',
        index,
        instruction,
      },
    ]);
    return segment[index];
  }

  /**
   * 在节点前新增路径指令
   * @param node 指令对象
   * @param instruction 新指令
   */
  insertBeforeNode(node: PathNode, instruction: Instruction) {
    const segment = node.segment;

    const index = segment.indexOf(node);
    if (index === -1) return;

    return this.insert(segment, index, instruction);
  }

  /**
   * 在节点后新增路径指令
   * @param node 指令对象
   * @param instruction 新指令
   */
  insertAfterNode(node: PathNode, instruction: Instruction) {
    const segment = node.segment;

    const index = segment.indexOf(node);
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
  replace(node: PathNode, instruction: Instruction) {
    const segment = node.segment;

    const isClosed = this.isClosedSegment(segment);

    let index = segment.indexOf(node);
    if (index === -1) return;
    if (isClosed && index === segment.length - 2) index = 0;

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

    this._updatePathByCommands(segment, updateCommands);

    return segment[index];
  }

  /**
   * 闭合路径
   */
  close(node: PathNode) {
    const segment = node.segment;

    // 自闭合的路径无需再做闭合处理
    if (this.isClosedSegment(segment)) return;

    // 少于2个节点时无法实现闭合
    if (segment.length < 2) return;

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
        instruction: [InstructionType.LINE, startNode.x, startNode.y],
      });
    }

    updateCommands.push({
      type: 'add',
      index: segment.length + updateCommands.length,
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
    segment: PathSegment,
    queue: {
      type: 'add' | 'update';
      index: number;
      instruction: Instruction;
    }[],
  ) {
    const path = this.getPathBySegment(segment);
    if (!path) return segment;

    queue.sort((a, b) => b.index - a.index);

    queue.forEach(({ type, index, instruction }) => {
      if (type === 'add') {
        // 改变原来的起始点指令类型
        if (index === 0 && segment.length) {
          segment.splice(0, 1, {
            id: uniqueId(),
            path,
            segment,
            instruction: [InstructionType.LINE, segment[0]!.node!.x, segment[0]!.node!.y],
          });
        }
        segment.splice(index, 0, {
          id: uniqueId(),
          path,
          segment,
          instruction,
        });
      }

      if (type === 'update') {
        const pathNode = segment[index];

        if (pathNode.node) {
          this.coordNodeMap.delete(pathNode.node);
          this._observers.delete(pathNode.node);
          if (pathNode.curveDots?.pre) this._observers.delete(pathNode.curveDots.pre);
          if (pathNode.curveDots?.next) this._observers.delete(pathNode.curveDots.next);
        }

        pathNode.instruction = instruction;

        delete pathNode.node;
        delete pathNode.curveDots;
      }
    });

    return this._draw(path);
  }

  /**
   * 清除路径片段
   */
  clearPathSegment(path: Path, segment: PathSegment) {
    const index = path.segments.indexOf(segment);
    if (index === -1) return;

    // 如果是最后一个片段，则整个路径都删除
    if (index === 0 && path.segments.length === 1) {
      this.clearPath(path);
      return;
    }

    path.segments.splice(index, 1);
    const instructions = path.segments.reduce((list, segment) => {
      list.push(...segment.map((node) => node.instruction));
      return list;
    }, [] as Instruction[]);
    this.redraw(path, instructions);
  }

  /**
   * 清除路径
   */
  clearPath(path: Path) {
    const index = this.paths.indexOf(path);
    if (index === -1) return;

    path.forEachNodes(({ node, curveDots }) => {
      if (!node) return;
      node.unobserve();
      curveDots?.pre?.unobserve();
      curveDots?.next?.unobserve();
      this.coordNodeMap.delete(node);
    });

    this.paths.splice(index, 1);

    // this._rerenderOriginPath(object);

    this.events.fire('clear', path);
  }

  /**
   * 清除所有路径
   */
  clearAll() {
    this.paths.forEach((path) => {
      path.forEachNodes(({ node, curveDots }) => {
        node?.unobserve();
        curveDots?.pre?.unobserve();
        curveDots?.next?.unobserve();
      });
    });
    this.paths.length = 0;
    this.coordNodeMap.clear();
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
   * 挂载编辑器实现路径可视化，会一并加载增强模块
   * @param canvas fabric.Canvas对象
   */
  async mount(canvas: fabric.Canvas) {
    // 加载默认内置模块 —— 路径编辑器
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

    return this.editor;
  }

  unmounted() {}
}

export default VizPath;
