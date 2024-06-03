import { fabric } from 'fabric';
import { v4 as uuid } from 'uuid';
import {
  calcCanvasCrood,
  calcCroodsAngle,
  calcCroodsDistance,
  deepIterateGroup,
  fireMouseUpAndSelect,
  observe,
  reversePath,
  transform,
} from '@utils';
import EditorModule from '../base.class';
import Editor from '../editor/index.class';
import VizPath, { VizPathSymbalType } from '../../vizpath.class';
import EditorPath from '../editor-path/index.class';
import VizPathCreator, { InstructionType, type Instruction, type PathNode } from '../..';
import type { ResponsiveCrood } from '../../vizpath.class';
import EditorUI, { type ThemeDecorator } from '../editor-ui/index.class';

enum Mode {
  MOVE = 'move',
  ADD = 'add',
  CONVERT = 'convert',
}

type EditorCurveDot = {
  type: 'pre' | 'next';
  pathNode: PathNode<ResponsiveCrood>;
  curveDot: ResponsiveCrood;
  node: fabric.Object;
  point: fabric.Object;
  line: fabric.Line;
};

class EditorNode extends EditorModule {
  static ID = 'editor-node';

  /**
   * 动态配置，会影响交互效果
   */
  setting: {
    /**
     * 节点模式，不同模式下会影响节点的交互逻辑
     *
     * move 移动 - 节点鼠标选中为移动操作
     *
     * add 添加 - 鼠标点击外部区域会在区域位置上添加一个新的节点
     *
     * convert 转换 - 鼠标点击节点无法移动，但可以通过拖拽实现节点转换
     *
     * @default 'move'
     */
    mode: `${Mode}`;
    /**
     * 是否开启强制曲线变换点对称
     * @default 'none'
     */
    forcePointSymmetric: 'none' | 'angle' | 'entire';
  } = {
    mode: Mode.MOVE,
    forcePointSymmetric: 'none',
  };

  vizPath: VizPath | null = null;

  editor: Editor | null = null;

  nodes: fabric.Object[] = [];

  curveDots: EditorCurveDot[] = [];

  objectNodeMap: Map<fabric.Object, PathNode<ResponsiveCrood>> = new Map([]);

  nodeObjectMap: Map<PathNode<ResponsiveCrood>, fabric.Object> = new Map([]);

  activeNodes: fabric.Object[] = [];

  activePoint: fabric.Object | null = null;

  /**
   * 临时停用选择监听处理
   */
  private _deactivateSelectListeners = false;

  /**
   * 废弃的画布对象池，可用于复用减少创建消耗
   */
  private _abandonedPool: {
    nodes: fabric.Object[];
    points: fabric.Object[];
    lines: fabric.Line[];
  } = {
    nodes: [],
    points: [],
    lines: [],
  };

  private _initPathNodes() {
    const objects: fabric.Object[] = [];
    const objectNodeMap: typeof this.objectNodeMap = new Map();
    const nodeObjectMap: typeof this.nodeObjectMap = new Map();

    const vizPath = this.vizPath;
    const editorPath = vizPath?.context.find(EditorPath);
    if (!vizPath || !editorPath) return { objects, objectNodeMap, nodeObjectMap };

    const ui = vizPath?.context.find(EditorUI);

    /**
     * 创建路径节点对应的fabric对象
     * @param node 路径节点
     * @param originObject 来源对象
     */
    const createNodeObject = (node: ResponsiveCrood, originObject?: fabric.Object) => {
      const decorator: ThemeDecorator<fabric.Object> = (customObject, callback) => {
        customObject.set({
          name: uuid(),
          // 选中时不出现选中框
          hasBorders: false,
          hasControls: false,
          // 保持居中
          originX: 'center',
          originY: 'center',
        });

        // 不做另外的画布缓存
        deepIterateGroup(customObject, (object) => {
          object.set({
            objectCaching: false,
          });
        });

        customObject[VizPath.symbol] = VizPathSymbalType.NODE;

        if (callback) callback(vizPath.context, customObject);

        return customObject;
      };

      let object = originObject ?? (ui?.options.node ?? EditorUI.noneUI.node)(decorator);

      if (!object[VizPath.symbol]) object = decorator(object);

      // 加入画布时添加自动响应
      const onAddedNode = () => {
        node.observe(
          (x, y) => {
            const position = editorPath.calcAbsolutePosition(
              { x, y },
              editorPath.nodePathMap.get(node)!.pathObject,
            );
            if (object.group) {
              const relativePosition = editorPath.calcRelativeCrood(position, object.group);
              object
                .set({
                  left: relativePosition.x,
                  top: relativePosition.y,
                })
                .setCoords();
              object.group.addWithUpdate();
            } else {
              object.set(position).setCoords();
            }
          },
          {
            id: object.name,
            immediate: true,
          },
        );
      };

      // 移除时结束自动响应
      const onRemovedNode = () => {
        object.off('added', onAddedNode);
        object.off('removed', onRemovedNode);
        node.unobserve(object.name);
        observe(object, ['left', 'top'], () => {});
        this._abandonedPool.nodes.push(object);
      };

      object.on('added', onAddedNode);
      object.on('removed', onRemovedNode);

      return object;
    };

    // 第一轮遍历为了重用旧对象，避免每次更新fabric对象都变化还需要重新处理聚焦事件
    vizPath.path.forEach(({ segment }) => {
      segment.forEach((item) => {
        const { node } = item;
        if (!node) return;

        const reuseObject = this.nodeObjectMap.get(item);
        if (reuseObject) {
          const object = createNodeObject(node, reuseObject);
          if (!object) return;

          objects.push(object);
          objectNodeMap.set(object, item);
          nodeObjectMap.set(item, object);
        }
      });
    });

    // 第二轮遍历则是为了创建新对象
    vizPath.path.forEach(({ segment }) => {
      segment.forEach((item) => {
        const { node } = item;
        if (!node) return;

        if (nodeObjectMap.has(item)) return;

        let recycleObject: fabric.Object | undefined;
        do {
          recycleObject = this._abandonedPool.nodes.pop();
        } while (recycleObject && objectNodeMap.has(recycleObject));

        const object = createNodeObject(node, recycleObject);
        if (!object) return;

        objects.push(object);
        objectNodeMap.set(object, item);
        nodeObjectMap.set(item, object);
      });
    });

    return {
      objects,
      objectNodeMap,
      nodeObjectMap,
    };
  }

  /**
   * 添加活跃组的响应式变化
   */
  private _addActiveSelectionObserve(group: fabric.ActiveSelection) {
    observe(group, ['left', 'top', 'angle'], () => {
      this.vizPath?.onceRerenderOriginPath(() => {
        const hadFollowedCroods = new Set<ResponsiveCrood>([]);
        for (const object of group._objects as fabric.Object[]) {
          const followCurveDots: ResponsiveCrood[] = [];
          const pathNode = this.objectNodeMap.get(object)!;
          const curveDots = this.vizPath?.getNeighboringCurveDots(pathNode) ?? [];
          curveDots?.forEach(({ position, direction, from }) => {
            const crood = from.curveDots?.[direction];
            if (position !== 'cur' || !crood) return;
            // 避免重复的曲线变换点跟随更改
            if (hadFollowedCroods.has(crood)) return;
            followCurveDots.push(crood);
            hadFollowedCroods.add(crood);
          });

          const decomposeMatrix = fabric.util.qrDecompose(object.calcTransformMatrix(false));
          const left = decomposeMatrix.translateX;
          const top = decomposeMatrix.translateY;
          this.move(object, { left, top }, followCurveDots);
        }
        hadFollowedCroods.clear();
      });
    });
  }

  /**
   * 添加单个活跃对象的响应式变化
   */
  private _addActivePointObserve(object: fabric.Object) {
    observe(object, ['left', 'top'], ({ left, top }) => {
      if (object.group) return;

      const followCurveDots: ResponsiveCrood[] = [];
      const pathNode = this.objectNodeMap.get(object)!;
      const curveDots = this.vizPath?.getNeighboringCurveDots(pathNode) ?? [];
      curveDots?.forEach(({ position, direction, from }) => {
        const crood = from.curveDots?.[direction];
        if (position !== 'cur' || !crood) return;
        followCurveDots.push(crood);
      });

      this.move(object, { left: left!, top: top! }, followCurveDots);
    });
  }

  /**
   * 移除当前曲线变换点
   */
  private _removeCurrentCurveDots() {
    const editor = this.vizPath?.context.find(Editor);
    const canvas = editor?.canvas;
    if (!canvas) return;

    canvas.renderOnAddRemove = false;
    this.curveDots.forEach((i) => {
      canvas.remove(i.point, i.line);
    });
    this.curveDots = [];
    canvas.renderOnAddRemove = true;
    canvas.requestRenderAll();
  }

  /**
   * 添加活跃节点的周围曲线变换点
   */
  private _addActivePointCurveDots(nodeObject: fabric.Object) {
    const canvas = nodeObject.canvas;
    if (!canvas) return;

    const vizPath = this.vizPath;
    if (!vizPath) return;

    const editorPath = vizPath.context.find(EditorPath);
    if (!editorPath) return;

    const curPathNode = this.objectNodeMap.get(nodeObject);
    if (!curPathNode) return;

    const ui = vizPath.context.find(EditorUI);

    // 创建新的路径曲线变换点
    const curveDots: EditorCurveDot[] = [];
    const curveDotSet = new WeakSet<ResponsiveCrood>([]);
    const neighboringCurveDots = vizPath.getNeighboringCurveDots(curPathNode);
    neighboringCurveDots.forEach(({ position, direction, from }) => {
      const node = from.node;
      const curveDot = from.curveDots?.[direction];
      if (!node || !curveDot || curveDotSet.has(curveDot)) return false;

      const nodeObject = this.nodeObjectMap.get(from)!;

      /**
       * 创建指令曲线变换点
       */
      const pointDecorator: ThemeDecorator<fabric.Object> = (customObject, callback) => {
        customObject.set({
          name: uuid(),
          // 选中时不出现选中框
          hasBorders: false,
          hasControls: false,
          // 保持居中
          originX: 'center',
          originY: 'center',
        });

        // 不做另外的画布缓存
        deepIterateGroup(customObject, (object) => {
          object.set({
            objectCaching: false,
          });
        });

        customObject[VizPath.symbol] = VizPathSymbalType.CURVE_DOT;

        if (callback) callback(vizPath.context, customObject);

        return customObject;
      };

      let point =
        this._abandonedPool.points.pop() ??
        (ui?.options.dot ?? EditorUI.noneUI.dot)(pointDecorator);

      if (!point[VizPath.symbol]) point = pointDecorator(point);

      // 建立相互响应，指令的数据和元素的位置更改会相互同步
      const onAddedPoint = () => {
        curveDot.observe(
          (x, y) => {
            if (point.canvas?.getActiveObject() === point) return;
            const position = editorPath.calcAbsolutePosition(
              { x, y },
              editorPath.nodePathMap.get(node)!.pathObject,
            );
            point.set(position).setCoords();
          },
          {
            immediate: true,
            id: point.name,
          },
        );
        observe(
          point,
          ['left', 'top'],
          ({ left, top }) => {
            // 与中心点相对角度固定
            const nodeCenter = nodeObject.getCenterPoint();
            const pointCenter = point.getCenterPoint();
            point.set({
              angle:
                45 +
                (Math.atan2(pointCenter.y - nodeCenter.y, pointCenter.x - nodeCenter.x) * 180) /
                  Math.PI,
            });

            // 响应式更改指令信息
            if (point.canvas?.getActiveObject() === point) {
              const crood = editorPath.calcRelativeCrood(
                {
                  left: left!,
                  top: top!,
                },
                editorPath.nodePathMap.get(node)!.pathObject,
              );
              // 曲线变换点对称操作
              if (this.setting.forcePointSymmetric !== 'none') {
                const symmetricCurveDot = this.curveDots.find((i) => {
                  const antiDirection = { pre: 'next', next: 'pre' }[direction];
                  if (i.type !== antiDirection) return false;
                  return (
                    i.pathNode ===
                    neighboringCurveDots.find(
                      (i) => i.position === position && i.direction === antiDirection,
                    )?.from
                  );
                });
                if (symmetricCurveDot) {
                  const { curveDot: _curveDot } = symmetricCurveDot;
                  // 旧镜像曲线变换点到路径节点的距离
                  const d = calcCroodsDistance(_curveDot, node);
                  // 新镜像曲线变换点到路径节点的距离
                  const new_d = calcCroodsDistance(
                    {
                      x: node.x - (crood.x - node.x),
                      y: node.y - (crood.y - node.y),
                    },
                    node,
                  );
                  const scale = this.setting.forcePointSymmetric === 'entire' ? 1 : d / new_d;
                  _curveDot.setCrood({
                    x: node.x - (crood.x - node.x) * scale,
                    y: node.y - (crood.y - node.y) * scale,
                  });
                }
              }
              curveDot.setCrood(crood, [point.name]);
            }
          },
          true,
        );
      };
      const onRemovedPoint = () => {
        point.off('added', onAddedPoint);
        point.off('removed', onRemovedPoint);

        curveDot.unobserve(point.name);
        observe(point, ['left', 'top'], () => {});
        this._abandonedPool.points.push(point);
      };
      point.on('added', onAddedPoint);
      point.on('removed', onRemovedPoint);

      /**
       * 创建曲线变换点和节点的连线
       */
      const lineDecorator: ThemeDecorator<fabric.Line> = (customObject, callback) => {
        customObject.set({
          name: uuid(),
          // 保持比例
          strokeUniform: true,
          // 不允许选中
          selectable: false,
          evented: false,
          // 保持居中
          originX: 'center',
          originY: 'center',
          // 不做另外的画布缓存
          objectCaching: false,
        });

        customObject[VizPath.symbol] = VizPathSymbalType.LINE;

        if (callback) callback(vizPath.context, customObject);

        return customObject;
      };

      let line =
        this._abandonedPool.lines.pop() ??
        (ui?.options.line ?? EditorUI.noneUI.line)(lineDecorator);

      if (!line[VizPath.symbol]) line = lineDecorator(line);

      // 建立响应式，让连线随时跟随指令的值进行变化
      const onAddedLine = () => {
        node.observe(
          (x, y) => {
            const position = editorPath.calcAbsolutePosition(
              { x, y },
              editorPath.nodePathMap.get(node)!.pathObject,
            );
            line.set({ x1: position.left, y1: position.top });
          },
          {
            immediate: true,
            id: line.name,
          },
        );
        curveDot.observe(
          (x, y) => {
            const position = editorPath.calcAbsolutePosition(
              { x, y },
              editorPath.nodePathMap.get(node)!.pathObject,
            );
            line.set({ x2: position.left, y2: position.top });
          },
          {
            immediate: true,
            id: line.name,
          },
        );
      };
      const onRemovedLine = () => {
        line.off('added', onAddedLine);
        line.off('removed', onRemovedLine);

        node.unobserve(line.name);
        curveDot.unobserve(line.name);
        this._abandonedPool.lines.push(line);
      };
      line.on('added', onAddedLine);
      line.on('removed', onRemovedLine);

      curveDots.push({
        type: direction,
        pathNode: from,
        curveDot,
        node: nodeObject,
        point,
        line,
      });

      curveDotSet.add(curveDot);
    });

    // 移除旧对象并添加新对象
    canvas.renderOnAddRemove = false;
    canvas.remove(...this.curveDots.map((i) => [i.point, i.line]).flat(1));
    const baseIndex =
      canvas._objects.indexOf(editorPath.paths[0].pathObject) + editorPath.paths.length;
    curveDots.forEach((i, idx) => {
      canvas.insertAt(i.line, baseIndex + idx, false);
      canvas.add(i.point);
    });
    this.curveDots = curveDots;
    canvas.renderOnAddRemove = true;
    canvas.requestRenderAll();
  }

  /**
   * 初始画布节点选中事件
   */
  private _initSelectEvents() {
    if (!this.editor) return;
    this.editor.on('canvas', 'selection:created', (e) => {
      if (this._deactivateSelectListeners) return;
      this.focus(...e.selected);
    });
    this.editor.on('canvas', 'selection:updated', (e) => {
      if (this._deactivateSelectListeners) return;
      this.focus(...e.selected);
    });
    this.editor.on('canvas', 'selection:cleared', () => {
      if (this._deactivateSelectListeners) return;
      this.focus();
    });
    // 选中路径段时自动选中路线段内的所有指令路径节点
    this.editor.on('canvas', 'mouse:dblclick', (e) => {
      if (e.target) return;

      const editorPath = this.vizPath?.context.find(EditorPath);
      if (!editorPath) return;

      let focusPath: (typeof editorPath.paths)[number] | undefined;
      for (let i = editorPath.paths.length - 1; i >= 0; i--) {
        const path = editorPath.paths[i];
        if (path.pathObject.containsPoint(e.pointer)) {
          focusPath = path;
          break;
        }
      }
      if (focusPath) {
        this.focus(
          ...this.nodes.filter(
            (node) => editorPath.nodePathMap.get(this.objectNodeMap.get(node)!.node!) === focusPath,
          ),
        );
      }
    });
  }

  /**
   * 初始路径绘制事件
   */
  private _initDrawEvents() {
    if (!this.vizPath) return;

    const editor = this.vizPath.context.find(Editor);
    if (!editor) return;

    const editorPath = this.vizPath.context.find(EditorPath);
    if (!editorPath) return;

    const updateNodes = () => {
      const canvas = editor.canvas;
      if (!canvas) return;

      const storeActiveObjects = this.activeNodes;

      // 失去当前选中状态
      if (storeActiveObjects.length) this.blur();

      // 初始路径路径节点
      const { objects, objectNodeMap, nodeObjectMap } = this._initPathNodes();

      // 由于需要多次添加路径节点和曲线变换点，如果不设置该配置，每次添加和移除都会渲染一次画布，设置为false后可以控制为1次渲染
      canvas.renderOnAddRemove = false;

      // 移除旧对象
      canvas.remove(...this.nodes);
      this.objectNodeMap.clear();
      this.nodeObjectMap.clear();

      // 添加新对象并重新建立映射关系
      this.nodes = objects;
      this.objectNodeMap = objectNodeMap;
      this.nodeObjectMap = nodeObjectMap;

      canvas.add(...objects);

      canvas.renderOnAddRemove = true;

      canvas.requestRenderAll();

      // 保留原聚焦状态
      if (storeActiveObjects.length) this.focus(...storeActiveObjects);
    };

    this.vizPath.on('draw', updateNodes);
  }

  /**
   * 初始路径清除事件
   */
  private _initClearEvents() {
    if (!this.vizPath) return;

    const editor = this.vizPath.context.find(Editor);
    if (!editor) return;

    const canvas = editor.canvas;
    if (!canvas) return;

    this.vizPath.on('clear', (path) => {
      const removeObjects: fabric.Object[] = [];
      path.forEach(({ segment }) => {
        segment.forEach((node) => {
          const object = this.nodeObjectMap.get(node);
          if (object) removeObjects.push(object);
        });
      });

      this.blur();
      canvas.remove(...removeObjects);

      removeObjects.forEach((object) => {
        const node = this.objectNodeMap.get(object);
        if (node) {
          this.nodeObjectMap.delete(node);
          this.objectNodeMap.delete(object);
        }
      });
      this.nodes = this.nodes.filter((i) => !removeObjects.includes(i));
    });

    this.vizPath.on('clearAll', () => {
      this.blur();
      canvas.remove(...this.nodes);
      this.nodes = [];
      this.objectNodeMap.clear();
      this.nodeObjectMap.clear();
    });

    this.vizPath.on('destroy', () => {
      this._abandonedPool = {
        nodes: [],
        points: [],
        lines: [],
      };
    });
  }

  /**
   * 获取路径节点进行转换的配置
   */
  private _getConvertibleNodes(node: PathNode<ResponsiveCrood>) {
    if (!this.vizPath) return [];

    const { instruction } = node;
    const { pre, next } = this.vizPath.getNeighboringInstructions(node);

    const convertibleNodes: ['pre' | 'next', PathNode<ResponsiveCrood>][] = [];

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
   * 初始路径指令转换事件
   */
  private _initConvertEvents() {
    if (!this.editor) return;

    const editorPath = this.vizPath?.context.find(EditorPath);
    if (!editorPath) return;

    let target: fabric.Object | undefined;

    this.editor.on('canvas', 'mouse:down:before', (event) => {
      if (this.setting.mode !== Mode.CONVERT) return;

      if (event.target?.[VizPath.symbol] !== VizPathSymbalType.NODE) return;

      if (this.activeNodes.length > 1) return;

      const activeObject = this.activeNodes[0];
      const object = event.target;

      const currentNode = this.objectNodeMap.get(object)!;

      // 判断指令升降级
      if (activeObject && object !== activeObject) {
        const activeNode = this.objectNodeMap.get(activeObject)!;
        const { pre, next } = this.vizPath!.getNeighboringNodes(activeNode);

        if (this.curveDots.filter((i) => i.node === object).length === 0) {
          let upgradeDirection: 'pre' | 'next' | undefined;
          if (currentNode === pre) upgradeDirection = 'next';
          if (currentNode === next) upgradeDirection = 'pre';
          if (upgradeDirection) {
            this.upgrade(object, upgradeDirection);
            const curveDot = this.curveDots.find(
              (i) => i.pathNode === currentNode && i.type === upgradeDirection,
            );
            if (curveDot) {
              this.focus(curveDot.point);
              fireMouseUpAndSelect(curveDot.point);
              return;
            }
          }
        }
      }

      this.degrade(object, 'both', true);

      target = object.set({ lockMovementX: true, lockMovementY: true });
    });

    this.editor.on('canvas', 'mouse:move', (event) => {
      const pointer = calcCanvasCrood(this.editor!.canvas!, event.pointer);

      if (!target) return;

      // 如果鼠标还在点上不触发控制曲线作用，当移出后才触发，避免触发敏感
      if (target.containsPoint(event.pointer)) return;

      const targetNode = this.objectNodeMap.get(target)!;

      const pathObject = editorPath.nodePathMap.get(targetNode.node!)!.pathObject;
      const convertibleNodes = this._getConvertibleNodes(targetNode);
      const neighboringNodes = this.vizPath!.getNeighboringNodes(targetNode, true);

      const position = editorPath.calcRelativeCrood(
        { left: pointer.x, top: pointer.y },
        pathObject,
      );
      const antiPosition = editorPath.calcRelativeCrood(
        {
          left: target.left! - (pointer.x - target.left!),
          top: target.top! - (pointer.y - target.top!),
        },
        pathObject,
      );

      // 根据夹角大小排序，夹角越小意味鼠标越接近
      if (convertibleNodes.length > 1) {
        convertibleNodes.sort((a, b) => {
          return (
            calcCroodsAngle(position, targetNode.node!, neighboringNodes[a[0]]!.node!) -
            calcCroodsAngle(position, targetNode.node!, neighboringNodes[b[0]]!.node!)
          );
        });
      }

      convertibleNodes.forEach((item, index) => {
        const newCrood = [position, antiPosition][index];
        const newInstruction = [...item[1].instruction] as Instruction;
        newInstruction[0] = {
          [InstructionType.LINE]: InstructionType.QUADRATIC_CURCE,
          [InstructionType.QUADRATIC_CURCE]: InstructionType.BEZIER_CURVE,
        }[newInstruction[0]];
        newInstruction.splice(item[0] === 'pre' ? -2 : 1, 0, newCrood.x, newCrood.y);
        this.vizPath?.replace(item[1], newInstruction);
      });

      const targetCurveDot = this.curveDots.find((i) => {
        return i.pathNode === targetNode && i.type === convertibleNodes[0]?.[0];
      });

      if (targetCurveDot) {
        this.focus(targetCurveDot.point);
        fireMouseUpAndSelect(targetCurveDot.point);
      }
    });

    this.editor.on('canvas', 'mouse:up', () => {
      if (target) {
        target.set({ lockMovementX: false, lockMovementY: false });
        target = undefined;
      }
    });
  }

  /**
   * 初始路径点添加事件
   */
  private _initAddEvents() {
    if (!this.editor) return;

    const editorPath = this.vizPath?.context.find(EditorPath);
    if (!editorPath) return;

    let target: fabric.Object | undefined;
    this.editor.on('canvas', 'mouse:down:before', (event) => {
      if (this.setting.mode !== Mode.ADD) return;

      if (event.target) {
        if (
          this.activeNodes.length === 1 &&
          event.target[VizPath.symbol] === VizPathSymbalType.NODE
        ) {
          this.link(
            this.objectNodeMap.get(this.activeNodes[0]!)!,
            this.objectNodeMap.get(event.target)!,
          );
          target = event.target;
        }
      } else {
        // 新增节点
        const pointer = calcCanvasCrood(this.editor!.canvas!, event.pointer);
        target = this.add({ left: pointer.x, top: pointer.y });
      }

      if (target) {
        target.set({ lockMovementX: true, lockMovementY: true });
  
        // 先将两边的点都降级，便于后续拖拽变换
        this.degrade(target!, 'both', true);
  
        this.editor!.canvas!.selection = false;
      }
    });
    this.editor.on('canvas', 'mouse:move', (event) => {
      if (!target) return;

      if (this.setting.mode !== Mode.ADD) {
        target?.set({ lockMovementX: false, lockMovementY: false });
        target = undefined;
        this.editor!.canvas!.selection = true;
        return;
      }

      // 如果鼠标还在点上不触发控制曲线作用，当移出后才触发，避免触发敏感
      if (target.containsPoint(event.pointer)) return;

      const currentNode = this.objectNodeMap.get(target)!;

      this.focus(target);
      this.upgrade(target, 'both');

      const curveDot =
        this.curveDots.find((i) => i.pathNode === currentNode && i.type === 'next') ??
        this.curveDots.find((i) => i.pathNode === currentNode);

      if (curveDot) {
        this.focus(curveDot.point);
        fireMouseUpAndSelect(curveDot.point);
      }
    });
    this.editor.on('canvas', 'mouse:up', () => {
      target?.set({ lockMovementX: false, lockMovementY: false });
      target = undefined;
      this.editor!.canvas!.selection = true;
    });
  }

  /**
   * 删除节点或变换点
   *
   * @note
   *
   * 只有以下两种情况是有效删除操作：
   *
   * 1） 删除1~n个路径节点:
   *
   * ① 删除单一点时，删除节点，并将存在前后邻近节点的前提下连接前后节点。
   *
   * ② 删除多点时，删除点与点间的连线实现拆分路径效果。
   *
   * ③ 删除的点包含路径上所有点时，直接删除整个路径
   *
   * 2）删除1个变换点，实现曲线路径降级为直线路径
   *
   * @param objects 点对象(路径节点、变换点)列表
   */
  remove(...objects: fabric.Object[]) {
    if (!this.vizPath) return;

    const canvas = this.editor?.canvas;
    if (!canvas) return;

    const nodeObjects = objects.filter((i) => i[VizPath.symbol] === VizPathSymbalType.NODE);
    const pointObjects = objects.filter((i) => i[VizPath.symbol] === VizPathSymbalType.CURVE_DOT);

    if (nodeObjects.length) {
      const removeNodes: ResponsiveCrood[] = [];
      nodeObjects.forEach((object) => {
        if (object[VizPath.symbol] !== VizPathSymbalType.NODE) return;

        const { node } = this.objectNodeMap.get(object)!;
        if (!node) return;

        removeNodes.push(node);
      });
      this.vizPath.remove(...removeNodes);
    } else if (pointObjects.length === 1) {
      const { type, node } = this.curveDots.find((i) => i.point === pointObjects[0])!;
      this.degrade(node, type);
    }
  }

  /**
   * 路径升级
   *
   * @note
   *
   * 直线先升级到二阶，再从二阶曲线升级到三阶曲线；
   */
  upgrade(object: fabric.Object, direction: 'pre' | 'next' | 'both' = 'both') {
    if (!this.vizPath) return;

    const pathNode = this.objectNodeMap.get(object);
    if (!pathNode) return;

    const { instruction, node } = pathNode;

    const { pre, next } = this.vizPath.getNeighboringInstructions(pathNode, true);

    const directionNodeMap = {
      pre: instruction[0] === InstructionType.START ? pre : pathNode,
      next,
    };

    const targets: [direction: 'pre' | 'next', pathNode: PathNode<ResponsiveCrood>][] = [];

    if ((direction === 'both' || direction === 'pre') && directionNodeMap.pre) {
      targets.push(['pre', directionNodeMap.pre]);
    }

    if ((direction === 'both' || direction === 'next') && directionNodeMap.next) {
      targets.push(['next', directionNodeMap.next]);
    }

    targets.forEach(([direction, pathNode]) => {
      const oldInstruction = pathNode.instruction;
      if (oldInstruction[0] === InstructionType.BEZIER_CURVE) return;

      const newInstruction = [...oldInstruction] as Instruction;
      newInstruction[0] = {
        [InstructionType.LINE]: InstructionType.QUADRATIC_CURCE,
        [InstructionType.QUADRATIC_CURCE]: InstructionType.BEZIER_CURVE,
      }[newInstruction[0]];
      newInstruction.splice({ pre: -2, next: 1 }[direction], 0, node!.x, node!.y);

      this.vizPath!.replace(pathNode, newInstruction);
    });
  }

  /**
   * 路径降级
   *
   * @note
   *
   * 二阶贝塞尔曲线会降级为直线；三阶贝塞尔曲线会先降级为二阶贝塞尔曲线，再降级才会转化为直线。
   *
   * @param object 节点
   * @param [direction='both'] 降级范围
   * @param [lowest=false] 是否直接降到直线级别
   */
  degrade(object: fabric.Object, direction: 'pre' | 'next' | 'both' = 'both', lowest = false) {
    if (!this.vizPath) return;

    const pathNode = this.objectNodeMap.get(object);
    if (!pathNode) return;

    const { pre, next } = this.vizPath.getNeighboringInstructions(pathNode, true);

    const directionNodeMap = {
      pre: pathNode.instruction[0] === InstructionType.START ? pre : pathNode,
      next,
    };

    const targets: [direction: 'pre' | 'next', pathNode: PathNode<ResponsiveCrood>][] = [];

    if ((direction === 'both' || direction === 'pre') && directionNodeMap.pre) {
      targets.push(['pre', directionNodeMap.pre]);
    }

    if ((direction === 'both' || direction === 'next') && directionNodeMap.next) {
      targets.push(['next', directionNodeMap.next]);
    }

    targets.forEach(([direction, pathNode]) => {
      const oldInstruction = pathNode.instruction;
      if ([InstructionType.START, InstructionType.LINE].includes(oldInstruction[0])) return;

      const newInstruction = [...oldInstruction] as Instruction;

      if (lowest) {
        newInstruction[0] = InstructionType.LINE;
        newInstruction.splice(1, newInstruction.length - 3);
      } else {
        newInstruction[0] = {
          [InstructionType.QUADRATIC_CURCE]: InstructionType.LINE,
          [InstructionType.BEZIER_CURVE]: InstructionType.QUADRATIC_CURCE,
        }[newInstruction[0]];
        newInstruction.splice({ pre: -4, next: 1 }[direction], 2);
      }

      this.vizPath!.replace(pathNode, newInstruction);
    });
  }

  move(
    object: fabric.Object,
    position: {
      left: number;
      top: number;
    },
    followCurveDots: ResponsiveCrood[] = [],
  ) {
    const pathNode = this.objectNodeMap.get(object);
    if (!pathNode) return;

    const { node } = pathNode;

    const editorPath = this.vizPath?.context.find(EditorPath);
    if (!editorPath) return;

    const selectionGroup = object.group;

    const { scaleX: preScaleX = 1, scaleY: preScaleY = 1, angle: preAngle = 0 } = object;
    const {
      scaleX: newScaleX,
      scaleY: newScaleY,
      angle: newAngle,
    } = selectionGroup
      ? {
          scaleX: 1 / selectionGroup.scaleX!,
          scaleY: 1 / selectionGroup.scaleY!,
          angle: -selectionGroup.angle!,
        }
      : { scaleX: 1, scaleY: 1, angle: 0 };

    object
      .set({
        scaleX: newScaleX,
        scaleY: newScaleY,
        angle: newAngle,
      })
      .setCoords();

    const newCrood = editorPath.calcRelativeCrood(
      position,
      editorPath.nodePathMap.get(node!)!.pathObject,
    );

    // 需要跟随变化的曲线曲线变换点
    followCurveDots.forEach((curveDot) => {
      if (!curveDot) return;
      const relativeDiff = transform(
        {
          x: curveDot.x - newCrood.x,
          y: curveDot.y - newCrood.y,
        },
        [
          {
            translate: {
              x: newCrood.x - node!.x,
              y: newCrood.y - node!.y,
            },
          },
          {
            scale: {
              x: preScaleX / newScaleX,
              y: preScaleY / newScaleY,
            },
          },
          {
            rotate: preAngle - newAngle,
          },
        ],
      );
      curveDot.x = newCrood.x + relativeDiff.x;
      curveDot.y = newCrood.y + relativeDiff.y;
    });

    // 节点位置更新
    node!.setCrood(newCrood, [object!.name]);

    object.canvas?.requestRenderAll();
  }

  /**
   * 添加新的路径节点
   *
   * @note
   *
   * 1）在选中单一路径节点后，将在该点后添加新的路径节点
   *
   * 2）在未选中节点/选中多个节点时，将直接以该参数位置创建新的起始点以开启一段新的路径
   *
   * @param position 新节点的画布绝对位置
   */
  add(position: { left: number; top: number }) {
    const vizPath = this.vizPath;
    if (!vizPath) return;

    if (this.activeNodes.length === 1) {
      const editorPath = vizPath.context.find(EditorPath);
      if (!editorPath) return;

      const node = this.activeNodes[0];

      const pathNode = this.objectNodeMap.get(node);
      if (!pathNode) return;

      const newCrood = editorPath.calcRelativeCrood(
        position,
        editorPath.nodePathMap.get(pathNode.node!)!.pathObject,
      );

      const addPathNode = vizPath.insert(pathNode.node!, newCrood);
      if (!addPathNode) return;

      return this.nodeObjectMap.get(addPathNode);
    } else {
      const path = VizPathCreator.parseFabricPath(new fabric.Path('M 0 0', position));
      const responsivePath = vizPath.draw(path);
      return this.nodeObjectMap.get(responsivePath[0].segment[0]);
    }
  }

  /**
   * 连接两个节点，可以实现路径闭合和路径拼接，仅在两点都是路径端点（即首尾点）时生效。
   *
   * @param source 当前点
   * @param target 目标点
   */
  link(source: PathNode<ResponsiveCrood>, target: PathNode<ResponsiveCrood>) {
    const vizPath = this.vizPath;
    if (!vizPath) return;

    const editorPath = vizPath.context.find(EditorPath);
    if (!editorPath) return;

    if (source === target) return;
    if (!vizPath.isTerminalNode(source) || !vizPath.isTerminalNode(target)) return;

    // 自身合并，直接加'z'闭合指令即可
    if (source.segment === target.segment) {
      vizPath.close(source);
      return;
    }

    // 不同路径需要进行合并
    let sourcePath = source.segment.map((i) => i.instruction);
    let targetPath = target.segment.map((i) => i.instruction);

    if (source.instruction === sourcePath[0]) {
      sourcePath = reversePath(sourcePath);
    }
    if (target.instruction === targetPath[targetPath.length - 1]) {
      targetPath = reversePath(targetPath);
    }
    targetPath.splice(0, 1, [InstructionType.LINE, targetPath[0][1], targetPath[0][2]]);
    targetPath.map((item) => {
      const instruction = item;
      for (let i = 0; i < instruction.length - 1; i += 2) {
        const position = editorPath.calcAbsolutePosition(
          new fabric.Point(instruction[i + 1] as number, instruction[i + 2] as number),
          vizPath.getPath(target.segment)!.pathObject,
        );
        const crood = editorPath.calcRelativeCrood(
          position,
          vizPath.getPath(source.segment)!.pathObject,
        );
        instruction[i + 1] = crood.x;
        instruction[i + 2] = crood.y;
      }
    });
    const mergePath = sourcePath.concat(targetPath);

    // 合并后添加回路径段集合
    vizPath.onceRerenderOriginPath(() => {
      vizPath.clear(target.segment);
      vizPath.replacePathSegments(vizPath.getPath(source.segment)!, [mergePath] as Instruction[][]);
    });
  }

  focus(...selectedObjects: fabric.Object[]) {
    const canvas = this.editor?.canvas;
    if (!canvas) return;

    const editorPath = this.vizPath?.context.find(EditorPath);
    if (!editorPath) return;

    // 提取有效活跃元素
    const focusNodes: fabric.Object[] = [];
    const focusCurveDotPoints: fabric.Object[] = [];
    selectedObjects.forEach((object) => {
      switch (object[VizPath.symbol]) {
        case VizPathSymbalType.NODE:
          focusNodes.push(object);
          break;
        case VizPathSymbalType.CURVE_DOT:
          focusCurveDotPoints.push(object);
          break;
        default:
          break;
      }
    });

    // 只要包含路径节点则只处理聚焦路径节点逻辑
    if (focusNodes.length) {
      this._deactivateSelectListeners = true;
      // 取消画布选中重新构造只包含路径节点的选中框对象
      canvas.discardActiveObject();
      this.activeNodes = focusNodes;
      this.activePoint = null;
      // 是否只选中单一路径节点
      if (focusNodes.length === 1) {
        const focusNode = focusNodes[0];
        this._addActivePointObserve(focusNode);
        this._addActivePointCurveDots(focusNode);
        canvas.setActiveObject(focusNode);
      }
      // 多选则成组选择
      else if (focusNodes.length > 1) {
        const activeSelection = new fabric.ActiveSelection(focusNodes, {
          canvas,
          lockScalingFlip: true,
          // TODO: 暂不允许旋转，后续计算会出现精度问题导致多次变换后无法正确呈现位置
          lockRotation: true,
          originX: 'center',
          originY: 'center',
        });
        if (activeSelection.lockRotation) {
          activeSelection.setControlVisible('mtr', false);
        }
        this._addActiveSelectionObserve(activeSelection);
        this._removeCurrentCurveDots();
        canvas.setActiveObject(activeSelection);
      }
      this._deactivateSelectListeners = false;
    }
    // 考虑是否只有一个曲线变换点聚焦情况，不允许多曲线变换点同时聚焦
    else if (focusCurveDotPoints.length === 1) {
      this.activePoint = focusCurveDotPoints[0];
      canvas.setActiveObject(focusCurveDotPoints[0]);
    }
    // 如都不符合上面情况则是所有节点都失去焦点
    else {
      this.activeNodes = [];
      this.activePoint = null;
      this._removeCurrentCurveDots();
      canvas.discardActiveObject();
    }
  }

  blur() {
    this.focus();
  }

  load(vizPath: VizPath) {
    const editor = vizPath.context.find(Editor);
    if (!editor) return;

    this.vizPath = vizPath;
    this.editor = editor;

    this._initSelectEvents();
    this._initDrawEvents();
    this._initClearEvents();
    this._initAddEvents();
    this._initConvertEvents();
  }
}

export default EditorNode;
