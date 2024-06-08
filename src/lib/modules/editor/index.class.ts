import { fabric } from 'fabric';
import { v4 as uuid } from 'uuid';
import EditorModule from '../base.class';
import type { ResponsiveCrood, ResponsivePath } from '../../vizpath.class';
import {
  calcCanvasCrood,
  calcCroodsAngle,
  calcCroodsDistance,
  deepIterateGroup,
  fireFabricMouseUp,
  fireMouseUpAndSelect,
  observe,
  repairPath,
  reversePath,
  transform,
} from '@utils';
import EditorUI, { DEFAULT_THEME, type ThemeDecorator } from '../editor-ui/index.class';
import VizPath from '../../vizpath.class';
import VizPathCreator, { InstructionType, type Instruction, type PathNode } from 'src/lib';

export enum EditorSymbolType {
  PATH = 'path',
  NODE = 'node',
  CURVE_DOT = 'curve-dot',
  LINE = 'line',
  OTHER = 'other',
}

export enum Mode {
  MOVE = 'move',
  ADD = 'add',
  DELETE = 'delete',
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

class Editor extends EditorModule<{
  selected: (activeNodes: fabric.Object[], activePoint: fabric.Object | null) => void;
  deselected: (activeNodes: fabric.Object[], activePoint: fabric.Object | null) => void;
}> {
  static ID = 'editor';

  static symbol = Symbol('editor');

  /* ---------------------------- 画布相关配置 ---------------------------- */

  /** 挂载的画布 */
  mountCanvas: fabric.Canvas | null = null;

  /** 交互所在fabric画布 */
  canvas: fabric.Canvas | null = null;

  /** 当前编辑器是否使用隔离画布（模拟克隆的新画布对象） */
  isolation = false;

  /** 监听事件 */
  listeners: {
    type: 'global' | 'canvas';
    eventName: string;
    handler: (e: any) => void;
  }[] = [];

  /** 功能禁用请求凭证 */
  disabledFunctionTokens: Partial<
    Record<'add' | 'remove' | 'upgrade' | 'degrade' | 'convert' | 'link', string[]>
  > = {};

  /* ---------------------------- 路径相关配置 ---------------------------- */

  /** 路径汇总 */
  paths: ResponsivePath[] = [];

  /** 节点路径映射 */
  nodePathMap = new Map<ResponsiveCrood, ResponsivePath>([]);

  /* ---------------------------- 节点相关配置 ---------------------------- */

  /**
   * 内置配置，配置的更改会影响编辑器的交互效果
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

  /** 路径节点对象 */
  nodes: fabric.Object[] = [];

  /** 路径曲线变换点列表 */
  curveDots: EditorCurveDot[] = [];

  /** 元素画布对象 与 路径节点对象 映射 */
  objectNodeMap: Map<fabric.Object, PathNode<ResponsiveCrood>> = new Map([]);

  /** 路径节点对象 与 元素画布对象 映射 */
  nodeObjectMap: Map<PathNode<ResponsiveCrood>, fabric.Object> = new Map([]);

  /** 当前活跃的路径节点画布对象列表 */
  activeNodes: fabric.Object[] = [];

  /** 当前活跃的曲线变换点画布对象 */
  activePoint: fabric.Object | null = null;

  /**  临时停用选择监听处理 */
  private _deactivateSelectListeners = false;

  /** 废弃的画布对象池，可用于复用减少创建消耗 */
  private _abandonedPool: {
    nodes: fabric.Object[];
    points: fabric.Object[];
    lines: fabric.Line[];
  } = {
    nodes: [],
    points: [],
    lines: [],
  };

  /**
   * 构造函数
   * @param options 更多配置
   */
  constructor(mountCanvas: fabric.Canvas, isolation = false) {
    super();
    this.mountCanvas = mountCanvas;
    this.isolation = isolation;
  }

  /**
   * 将画布坐标转化为特定路径的相对指令坐标位置
   */
  calcAbsolutePosition(crood: Crood, object: fabric.Object): Position {
    const matrix = [...object.calcOwnMatrix()];

    // 路径如果带有偏移则需要移除偏移带来的影响
    if (object.type === 'path') {
      const offset = fabric.util.transformPoint((object as fabric.Path).pathOffset, [
        ...matrix.slice(0, 4),
        0,
        0,
      ]);

      matrix[4] -= offset.x;
      matrix[5] -= offset.y;
    }

    const point = fabric.util.transformPoint(new fabric.Point(crood.x, crood.y), matrix);

    return { left: point.x, top: point.y };
  }

  /**
   * 将路径内的相对指令坐标位置转为所在画布的坐标位置
   */
  calcRelativeCrood(position: Position, object: fabric.Object): Crood {
    const matrix = [...object.calcOwnMatrix()];

    if (object.type === 'path') {
      const offset = fabric.util.transformPoint((object as fabric.Path).pathOffset, [
        ...matrix.slice(0, 4),
        0,
        0,
      ]);

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
   * 重新修正路径的尺寸和位置
   *
   * @param path 路径对象
   *
   * @note
   *
   * fabric.Path对象直接改内部路径指令，只能更新其路径渲染师正确的，但对象本身的尺寸和偏移信息都是错误的，
   * 需要使用initialize重新初始化路径，获取正确的尺寸，但是偏移是错的，该方法同时修正偏移。
   */
  updatePathStatus(path: fabric.Path) {
    repairPath(path);

    path.canvas?.requestRenderAll();
  }

  /**
   * 基于挂载画布构建编辑器画布
   */
  private _createEditorCanvas(canvas: fabric.Canvas) {
    const container = canvas.getElement().parentNode as HTMLDivElement;
    if (!container) {
      throw new TypeError('Please use fabric.Canvas which is mounted into the document.');
    }

    // 如果使用隔离画布则会参考配置构造新画布使与原画布隔离
    if (this.isolation) {
      const editorCanvas = document.createElement('canvas');
      container.appendChild(editorCanvas);

      const editorFabricCanvas = new fabric.Canvas(editorCanvas, {
        // 跟随尺寸
        width: container.clientWidth,
        height: container.clientHeight,
        // 允许画布多选
        selection: true,
        // 画布渲染不跳过离屏元素
        skipOffscreen: false,
        // 保持选中元素的层级关系
        preserveObjectStacking: true,
      });

      // 保留画布变换
      editorFabricCanvas.setViewportTransform(canvas.viewportTransform ?? [1, 0, 0, 1, 0, 0]);

      // 更多画布配置需要使用者外部配置

      return editorFabricCanvas;
    }

    return canvas;
  }

  /**
   * 添加元素事件监听
   */
  addGlobalEvent(eventName: string, handler: (...args: any[]) => void) {
    window.addEventListener(eventName, handler);

    this.listeners.push({ type: 'global', eventName, handler });
  }

  addCanvasEvent(eventName: string, handler: (...args: any[]) => void) {
    if (!this.canvas) return;

    this.canvas.on(eventName, handler);

    this.listeners.push({ type: 'canvas', eventName, handler });
  }

  /**
   * 移除事件监听
   */
  removeGlobalEvent(eventName: string, handler?: (...args: any[]) => void) {
    this.listeners = this.listeners.filter((listener) => {
      if (handler && handler !== listener.handler) return true;
      if (eventName === listener.eventName) {
        window.removeEventListener(listener.eventName, listener.handler);
        return false;
      }
      return true;
    });
  }

  removeCanvasEvent(eventName: string, handler?: (...args: any[]) => void) {
    const canvas = this.canvas;
    if (!canvas) return;

    this.listeners = this.listeners.filter((listener) => {
      if (handler && handler !== listener.handler) return true;
      if (eventName === listener.eventName) {
        canvas.off(listener.eventName, listener.handler);
        return false;
      }
      return true;
    });
  }

  /**
   * 初始化路径绘制监听
   */
  private _initDrawPathListener(vizpath: VizPath) {
    const canvas = this.canvas;
    if (!canvas) return;

    const handler = (paths: ResponsivePath[]) => {
      const ui = vizpath.context.find(EditorUI);
      const theme = ui?.theme ?? DEFAULT_THEME;

      paths.forEach((item) => {
        const { pathObject } = item;

        // 如果已经带有标志则是已经添加进画布的路径
        if (pathObject[Editor.symbol]) return;

        const decorator: ThemeDecorator<fabric.Path> = (customPath, callback) => {
          customPath.set({
            name: uuid(),
            // 路径本身不可选中，后续通过操纵点和线条来更改路径
            selectable: false,
            // 不触发事件
            evented: false,
            // 防止因为缓存没有显示正确的路径
            objectCaching: false,
          });

          customPath[Editor.symbol] = EditorSymbolType.PATH;

          if (ui && callback) {
            ui.objectPreRenderCallbackMap.set(customPath, callback);
          }

          return customPath;
        };

        theme.path(decorator, pathObject);

        if (!pathObject[Editor.symbol]) decorator(pathObject);
      });

      // 添加新的路径对象
      canvas.renderOnAddRemove = true;
      paths.forEach(({ pathObject }) => {
        if (!canvas.contains(pathObject)) canvas.add(pathObject);
      });
      canvas.renderOnAddRemove = false;
      canvas.requestRenderAll();

      this.paths.push(...paths);

      // 建立映射关系，便于减少后续计算
      this.paths.forEach((item) => {
        item.segment.forEach(({ node }) => {
          if (node) this.nodePathMap.set(node, item);
        });
      });
    };
    vizpath.on('draw', handler);
  }

  /**
   * 初始化路径清除监听
   */
  private _initClearPathListener(vizpath: VizPath) {
    const canvas = this.canvas;
    if (!canvas) return;

    const handler = (paths: ResponsivePath[]) => {
      canvas.remove(...paths.map((i) => i.pathObject));

      this.paths = this.paths.filter((i) => paths.includes(i));

      // 清除映射
      paths.forEach((item) => {
        item.segment.forEach(({ node }) => {
          if (node) this.nodePathMap.delete(node);
        });
      });
    };
    vizpath.on('clear', handler);
    vizpath.on('clearAll', () => {
      canvas.remove(...this.paths.map((i) => i.pathObject));
      this.paths.forEach((item) => {
        item.segment.forEach(({ node }) => {
          if (node) this.nodePathMap.delete(node);
        });
      });
      this.paths = [];
    });
  }

  private _initPathNodes() {
    const objects: fabric.Object[] = [];
    const objectNodeMap: typeof this.objectNodeMap = new Map();
    const nodeObjectMap: typeof this.nodeObjectMap = new Map();

    const vizpath = this.vizpath;
    if (!vizpath) return { objects, objectNodeMap, nodeObjectMap };

    const ui = vizpath.context.find(EditorUI);
    const theme = ui?.theme ?? DEFAULT_THEME;

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

        customObject[Editor.symbol] = EditorSymbolType.NODE;

        if (ui && callback) {
          ui.objectPreRenderCallbackMap.set(customObject, callback);
        }

        return customObject;
      };

      let object = originObject ?? theme.node(decorator);

      if (!object[Editor.symbol]) object = decorator(object);

      // 加入画布时添加自动响应
      const onAddedNode = () => {
        node.observe(
          (x, y) => {
            const position = this.calcAbsolutePosition(
              { x, y },
              this.nodePathMap.get(node)!.pathObject,
            );
            if (object.group) {
              const relativePosition = this.calcRelativeCrood(position, object.group);
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
    vizpath.paths.forEach(({ segment }) => {
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
    vizpath.paths.forEach(({ segment }) => {
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
   * 初始路径节点绘制事件
   */
  private _initDrawNodeEvents(vizpath: VizPath) {
    const updateNodes = () => {
      const canvas = this.canvas;
      if (!canvas) return;

      const storeActiveObjects = this.activeNodes;

      // 失去当前选中状态
      if (storeActiveObjects.length) this.blur();

      // 由于需要多次添加路径节点和曲线变换点，如果不设置该配置，每次添加和移除都会渲染一次画布，设置为false后可以控制为1次渲染
      canvas.renderOnAddRemove = false;

      // 移除旧对象
      canvas.remove(...this.nodes);

      // 初始路径路径节点
      const { objects, objectNodeMap, nodeObjectMap } = this._initPathNodes();

      // 添加新对象并重新建立映射关系
      this.nodes = objects;
      canvas.add(...objects);

      this.objectNodeMap.clear();
      this.objectNodeMap = objectNodeMap;

      this.nodeObjectMap.clear();
      this.nodeObjectMap = nodeObjectMap;

      canvas.renderOnAddRemove = true;

      canvas.requestRenderAll();

      // 保留原聚焦状态
      if (storeActiveObjects.length) this.focus(...storeActiveObjects);
    };

    vizpath.on('draw', updateNodes);
  }

  /**
   * 初始路径节点清除事件
   */
  private _initClearNodeEvents(vizpath: VizPath) {
    const canvas = this.canvas;
    if (!canvas) return;

    vizpath.on('clear', (path) => {
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

    vizpath.on('clearAll', () => {
      this.blur();
      canvas.remove(...this.nodes);
      this.nodes = [];
      this.objectNodeMap.clear();
      this.nodeObjectMap.clear();
    });

    vizpath.on('destroy', () => {
      this._abandonedPool = {
        nodes: [],
        points: [],
        lines: [],
      };
    });
  }

  /**
   * 添加活跃组的响应式变化
   */
  private _addActiveSelectionObserve(group: fabric.ActiveSelection) {
    observe(group, ['left', 'top', 'angle', 'scaleX', 'scaleY'], (newValue, oldValue) => {
      this.vizpath?.onceRerenderOriginPath(() => {
        const hadFollowedCroods = new Set<ResponsiveCrood>([]);
        for (const object of group._objects as fabric.Object[]) {
          const followCurveDots: ResponsiveCrood[] = [];
          const pathNode = this.objectNodeMap.get(object)!;
          const curveDots = this.vizpath?.getNeighboringCurveDots(pathNode) ?? [];
          curveDots?.forEach(({ position, direction, from }) => {
            const crood = from.curveDots?.[direction];
            if (position !== 'cur' || !crood) return;
            // 避免重复的曲线变换点跟随更改
            if (hadFollowedCroods.has(crood)) return;
            followCurveDots.push(crood);
            hadFollowedCroods.add(crood);
          });

          object.set({
            scaleX: object.scaleX! / (newValue.scaleX! / oldValue.scaleX!),
            scaleY: object.scaleY! / (newValue.scaleY! / oldValue.scaleY!),
            angle: object.angle! - (newValue.angle! - oldValue.angle!),
          });

          const decomposeMatrix = fabric.util.qrDecompose(object.calcTransformMatrix(false));
          const left = decomposeMatrix.translateX;
          const top = decomposeMatrix.translateY;
          this._transform(
            object,
            {
              left: left!,
              top: top!,
              scaleX: newValue.scaleX! / oldValue.scaleX!,
              scaleY: newValue.scaleY! / oldValue.scaleY!,
              angle: newValue.angle! - oldValue.angle!,
            },
            followCurveDots,
          );
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
      const curveDots = this.vizpath?.getNeighboringCurveDots(pathNode) ?? [];
      curveDots?.forEach(({ position, direction, from }) => {
        const crood = from.curveDots?.[direction];
        if (position !== 'cur' || !crood) return;
        followCurveDots.push(crood);
      });

      this._transform(object, { left: left!, top: top! }, followCurveDots);
    });
  }

  /**
   * 初始画布节点选中事件
   */
  private _initSelectNodeEvents() {
    this.addCanvasEvent('selection:created', (e) => {
      if (this._deactivateSelectListeners) return;
      this.focus(...e.selected);
    });
    this.addCanvasEvent('selection:updated', (e) => {
      if (this._deactivateSelectListeners) return;
      this.focus(...e.selected);
    });
    this.addCanvasEvent('selection:cleared', () => {
      if (this._deactivateSelectListeners) return;
      this.focus();
    });
    // 选中路径段时自动选中路线段内的所有指令路径节点
    this.addCanvasEvent('mouse:dblclick', (e) => {
      if (e.target && e.target[Editor.symbol]) return;

      let focusPath: (typeof this.paths)[number] | undefined;
      for (let i = this.paths.length - 1; i >= 0; i--) {
        const path = this.paths[i];
        if (path.pathObject.containsPoint(e.pointer)) {
          focusPath = path;
          break;
        }
      }
      if (focusPath) {
        this.focus(
          ...this.nodes.filter(
            (node) => this.nodePathMap.get(this.objectNodeMap.get(node)!.node!) === focusPath,
          ),
        );
      }
    });
  }

  /**
   * 初始路径点添加事件
   */
  private _initAddNodeEvents() {
    const canvas = this.canvas;
    if (!canvas) return;

    let target: fabric.Object | undefined;
    this.addCanvasEvent('mouse:down:before', (event) => {
      if (this.disabledFunctionTokens.add?.length) return;
      if (this.setting.mode !== Mode.ADD) return;

      if (event.target && event.target[Editor.symbol]) {
        if (
          this.activeNodes.length === 1 &&
          event.target[Editor.symbol] === EditorSymbolType.NODE
        ) {
          const joinNode = this.link(
            this.objectNodeMap.get(this.activeNodes[0]!)!,
            this.objectNodeMap.get(event.target)!,
          );
          if (joinNode) target = this.nodeObjectMap.get(joinNode);
        }
      } else {
        // 新增节点
        const pointer = calcCanvasCrood(canvas, event.pointer);
        target = this.add({ left: pointer.x, top: pointer.y });
      }

      if (target) {
        target.set({ lockMovementX: true, lockMovementY: true });

        canvas.selection = false;
      }
    });
    this.addCanvasEvent('mouse:down', (event) => {
      if (target) this.focus(target);
    });
    this.addCanvasEvent('mouse:move', (event) => {
      if (!target) return;

      if (this.setting.mode !== Mode.ADD) {
        target?.set({ lockMovementX: false, lockMovementY: false });
        target = undefined;
        canvas.selection = true;
        return;
      }

      // 如果鼠标还在点上不触发控制曲线作用，当移出后才触发，避免触发敏感
      if (target.containsPoint(event.pointer)) return;

      const currentNode = this.objectNodeMap.get(target)!;

      // 先将两边的点都降到直线级，便于后续拖拽变换
      this.degrade(target!, 'both', true);
      this.upgrade(target, 'both');

      const curveDot =
        this.curveDots.find((i) => i.pathNode === currentNode && i.type === 'next') ??
        this.curveDots.find((i) => i.pathNode === currentNode);

      if (curveDot) {
        this.focus(curveDot.point);
        fireMouseUpAndSelect(curveDot.point);
      }
    });
    this.addCanvasEvent('mouse:up', () => {
      target?.set({ lockMovementX: false, lockMovementY: false });
      target = undefined;
      canvas.selection = true;
    });
  }

  /**
   * 添加活跃节点的周围曲线变换点
   */
  private _addActivePointCurveDots(nodeObject: fabric.Object) {
    const vizpath = this.vizpath;
    if (!vizpath) return;

    const canvas = nodeObject.canvas;
    if (!canvas) return;

    const curPathNode = this.objectNodeMap.get(nodeObject);
    if (!curPathNode) return;

    const ui = vizpath.context.find(EditorUI);
    const theme = ui?.theme ?? DEFAULT_THEME;

    // 创建新的路径曲线变换点
    const curveDots: EditorCurveDot[] = [];
    const curveDotSet = new WeakSet<ResponsiveCrood>([]);
    const neighboringCurveDots = vizpath.getNeighboringCurveDots(curPathNode);
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

        customObject[Editor.symbol] = EditorSymbolType.CURVE_DOT;

        if (ui && callback) {
          ui.objectPreRenderCallbackMap.set(customObject, callback);
        }

        return customObject;
      };

      let point = this._abandonedPool.points.pop() ?? theme.dot(pointDecorator);

      if (!point[Editor.symbol]) point = pointDecorator(point);

      // 建立相互响应，指令的数据和元素的位置更改会相互同步
      const onAddedPoint = () => {
        curveDot.observe(
          (x, y) => {
            if (point.canvas?.getActiveObject() === point) return;
            const position = this.calcAbsolutePosition(
              { x, y },
              this.nodePathMap.get(node)!.pathObject,
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
              const crood = this.calcRelativeCrood(
                {
                  left: left!,
                  top: top!,
                },
                this.nodePathMap.get(node)!.pathObject,
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

        customObject[Editor.symbol] = EditorSymbolType.LINE;

        if (ui && callback) {
          ui.objectPreRenderCallbackMap.set(customObject, callback);
        }

        return customObject;
      };

      let line = this._abandonedPool.lines.pop() ?? theme.line(lineDecorator);

      if (!line[Editor.symbol]) line = lineDecorator(line);

      // 建立响应式，让连线随时跟随指令的值进行变化
      const onAddedLine = () => {
        node.observe(
          (x, y) => {
            const position = this.calcAbsolutePosition(
              { x, y },
              this.nodePathMap.get(node)!.pathObject,
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
            const position = this.calcAbsolutePosition(
              { x, y },
              this.nodePathMap.get(node)!.pathObject,
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
    const baseIndex = canvas._objects.indexOf(this.paths[0].pathObject) + this.paths.length;
    curveDots.forEach((i, idx) => {
      canvas.insertAt(i.line, baseIndex + idx, false);
      canvas.add(i.point);
    });
    this.curveDots = curveDots;
    canvas.renderOnAddRemove = true;
    canvas.requestRenderAll();
  }

  /**
   * 移除当前曲线变换点
   */
  private _removeCurrentCurveDots() {
    const editor = this.vizpath?.context.find(Editor);
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
   * 获取路径节点进行转换的配置
   */
  private _getConvertibleNodes(node: PathNode<ResponsiveCrood>) {
    if (!this.vizpath) return [];

    const { instruction } = node;
    const { pre, next } = this.vizpath.getNeighboringInstructions(node);

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
  private _initConvertNodeEvents() {
    const canvas = this.canvas;
    if (!canvas) return;

    let target: fabric.Object | undefined;
    this.addCanvasEvent('mouse:down:before', (event) => {
      if (this.disabledFunctionTokens.convert?.length) return;
      if (this.setting.mode !== Mode.CONVERT) return;

      if (event.target?.[Editor.symbol] !== EditorSymbolType.NODE) return;

      if (this.activeNodes.length > 1) return;

      const activeObject = this.activeNodes[0];
      const object = event.target;

      const currentNode = this.objectNodeMap.get(object)!;

      // 判断指令升降级
      if (activeObject && object !== activeObject) {
        const activeNode = this.objectNodeMap.get(activeObject)!;
        const { pre, next } = this.vizpath!.getNeighboringNodes(activeNode);

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

    this.addCanvasEvent('mouse:move', (event) => {
      if (!target) return;

      // 如果鼠标还在点上不触发控制曲线作用，当移出后才触发，避免触发敏感
      if (target.containsPoint(event.pointer)) return;

      const pointer = calcCanvasCrood(canvas, event.pointer);

      const targetNode = this.objectNodeMap.get(target)!;

      const pathObject = this.nodePathMap.get(targetNode.node!)!.pathObject;
      const convertibleNodes = this._getConvertibleNodes(targetNode);
      const neighboringNodes = this.vizpath!.getNeighboringNodes(targetNode, true);

      const position = this.calcRelativeCrood({ left: pointer.x, top: pointer.y }, pathObject);
      const antiPosition = this.calcRelativeCrood(
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
        this.vizpath?.replace(item[1], newInstruction);
      });

      const targetCurveDot = this.curveDots.find((i) => {
        return i.pathNode === targetNode && i.type === convertibleNodes[0]?.[0];
      });

      if (targetCurveDot) {
        this.focus(targetCurveDot.point);
        fireMouseUpAndSelect(targetCurveDot.point);
      }
    });

    this.addCanvasEvent('mouse:up', () => {
      if (target) {
        target.set({ lockMovementX: false, lockMovementY: false });
        target = undefined;
      }
    });
  }

  /**
   * 初始路径节点删除事件
   */
  private _initDeleteNodeEvents() {
    this.addCanvasEvent('mouse:down', (event) => {
      if (this.disabledFunctionTokens.remove?.length) return;
      if (this.setting.mode !== Mode.DELETE) return;

      if (
        event.target?.[Editor.symbol] === EditorSymbolType.NODE ||
        event.target?.[Editor.symbol] === EditorSymbolType.CURVE_DOT
      ) {
        this.remove(event.target);
      }
    });
  }

  /**
   * 变换节点
   * @param object 路径节点
   * @param options 变换配置
   * @param followCurveDots 跟随变换的曲线变换点
   * @returns
   */
  private _transform(
    object: fabric.Object,
    options: {
      left: number;
      top: number;
      scaleX?: number;
      scaleY?: number;
      angle?: number;
    },
    followCurveDots: ResponsiveCrood[] = [],
  ) {
    const pathNode = this.objectNodeMap.get(object);
    if (!pathNode) return;

    const { node } = pathNode;

    const { left, top, scaleX = 1, scaleY = 1, angle = 0 } = options;

    const newCrood = this.calcRelativeCrood({ left, top }, this.nodePathMap.get(node!)!.pathObject);

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
          { scale: { x: scaleX, y: scaleY } },
          { rotate: angle },
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
   * 请求对特定功能禁用
   *
   * @param functionName 禁用功能名称
   *
   * @example
   *
   * // 持有凭证用于重新启用功能
   * const token = requestDisableFunction('add');
   *
   * // 重新启用功能
   * requestEnableFunction(token);
   */
  requestDisableFunction(
    functionName: 'add' | 'remove' | 'upgrade' | 'degrade' | 'convert' | 'link',
  ) {
    const token = `${functionName}-${uuid()}`;
    const tokens = this.disabledFunctionTokens[functionName] ?? [];
    tokens.push(token);
    this.disabledFunctionTokens[functionName] = tokens;
    return token;
  }

  /**
   * 请求启用特定功能
   */
  requestEnableFunction(token: string) {
    const functionName = token.split('-')[0];
    const tokens = this.disabledFunctionTokens[functionName];
    if (!tokens) return false;

    const index = tokens.indexOf(token);
    if (index === -1) return false;

    tokens.splice(index, 1);

    return true;
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
    if (this.disabledFunctionTokens.add?.length) return;

    const vizpath = this.vizpath;
    if (!vizpath) return;

    if (this.activeNodes.length === 1) {
      const node = this.activeNodes[0];

      const pathNode = this.objectNodeMap.get(node);
      if (!pathNode) return;

      const newCrood = this.calcRelativeCrood(
        position,
        this.nodePathMap.get(pathNode.node!)!.pathObject,
      );

      const addPathNode = vizpath.insert(pathNode, [InstructionType.LINE, newCrood.x, newCrood.y]);
      if (!addPathNode) return;

      return this.nodeObjectMap.get(addPathNode);
    } else {
      const path = VizPathCreator.parseFabricPath(new fabric.Path('M 0 0', position));
      const responsivePath = vizpath.draw(path);
      return this.nodeObjectMap.get(responsivePath[0].segment[0]);
    }
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
    if (this.disabledFunctionTokens.remove?.length) return;
    if (!this.vizpath) return;

    const canvas = this.canvas;
    if (!canvas) return;

    canvas.remove(...objects);
    const nodeObjects = objects.filter((i) => i[Editor.symbol] === EditorSymbolType.NODE);
    const pointObjects = objects.filter((i) => i[Editor.symbol] === EditorSymbolType.CURVE_DOT);

    // 更新路径信息

    if (nodeObjects.length) {
      const removeNodes: ResponsiveCrood[] = [];
      nodeObjects.forEach((object) => {
        const { node } = this.objectNodeMap.get(object)!;
        if (!node) return;

        removeNodes.push(node);
      });
      this.vizpath.remove(...removeNodes);
    }

    if (pointObjects.length) {
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
    if (this.disabledFunctionTokens.upgrade?.length) return;

    if (!this.vizpath) return;

    const pathNode = this.objectNodeMap.get(object);
    if (!pathNode) return;

    const { instruction, node } = pathNode;

    const { pre, next } = this.vizpath.getNeighboringInstructions(pathNode, true);

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

      this.vizpath!.replace(pathNode, newInstruction);
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
    if (this.disabledFunctionTokens.degrade?.length) return;

    if (!this.vizpath) return;

    const pathNode = this.objectNodeMap.get(object);
    if (!pathNode) return;

    const { pre, next } = this.vizpath.getNeighboringInstructions(pathNode, true);

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

      this.vizpath!.replace(pathNode, newInstruction);
    });
  }

  /**
   * 连接两个节点，可以实现路径闭合和路径拼接，仅在两点都是路径端点（即首尾点）时生效。
   *
   * @param source 当前点
   * @param target 目标点
   */
  link(source: PathNode<ResponsiveCrood>, target: PathNode<ResponsiveCrood>) {
    if (this.disabledFunctionTokens.link?.length) return;

    const vizpath = this.vizpath;
    if (!vizpath) return;

    if (source === target) return;
    if (!vizpath.isTerminalNode(source) || !vizpath.isTerminalNode(target)) return;

    // 自身合并，直接加'z'闭合指令即可
    if (source.segment === target.segment) {
      vizpath.close(source);
      return target;
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
        const position = this.calcAbsolutePosition(
          new fabric.Point(instruction[i + 1] as number, instruction[i + 2] as number),
          vizpath.getPath(target.segment)!.pathObject,
        );
        const crood = this.calcRelativeCrood(position, vizpath.getPath(source.segment)!.pathObject);
        instruction[i + 1] = crood.x;
        instruction[i + 2] = crood.y;
      }
    });
    const joinIndex = sourcePath.length;
    const mergePath = sourcePath.concat(targetPath);

    // 合并后添加回路径段集合
    const newPath = vizpath.onceRerenderOriginPath(() => {
      vizpath.clear(target.segment);
      return vizpath.replacePathSegments(vizpath.getPath(source.segment)!, [
        mergePath,
      ] as Instruction[][]);
    });

    return newPath[0].segment[joinIndex];
  }

  focus(...selectedObjects: fabric.Object[]) {
    const canvas = this.canvas;
    if (!canvas) return;

    // 提取有效活跃元素
    const focusNodes: fabric.Object[] = [];
    const focusCurveDotPoints: fabric.Object[] = [];
    selectedObjects.forEach((object) => {
      switch (object[Editor.symbol]) {
        case EditorSymbolType.NODE:
          focusNodes.push(object);
          break;
        case EditorSymbolType.CURVE_DOT:
          focusCurveDotPoints.push(object);
          break;
        default:
          break;
      }
    });

    // 触发内置失焦事件
    if (this.activePoint || this.activeNodes.length) {
      this.fire('deselected', this.activeNodes, this.activePoint);
    }

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
      this.fire('selected', focusNodes, null);
    }
    // 考虑是否只有一个曲线变换点聚焦情况，不允许多曲线变换点同时聚焦
    else if (focusCurveDotPoints.length === 1) {
      this.activePoint = focusCurveDotPoints[0];
      this.activeNodes = [this.curveDots.find((i) => i.point === this.activePoint)!.node];
      canvas.setActiveObject(focusCurveDotPoints[0]);
      this.fire('selected', this.activeNodes, this.activePoint);
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

  unload() {
    const canvas = this.canvas;
    if (!canvas) return;

    canvas.remove(
      ...this.paths.map((i) => i.pathObject),
      ...this.nodes,
      ...this.curveDots.map((i) => i.point),
      ...this.curveDots.map((i) => i.line),
    );

    // 节点相关配置
    this.nodes.length = 0;
    this.curveDots.length = 0;
    this.activeNodes.length = 0;
    this.activePoint = null;
    this.objectNodeMap.clear();
    this.nodeObjectMap.clear();

    this._deactivateSelectListeners = false;
    this._abandonedPool.nodes.length = 0;
    this._abandonedPool.points.length = 0;
    this._abandonedPool.lines.length = 0;

    // 路径相关配置
    this.paths.length = 0;
    this.nodePathMap.clear();

    // 画布相关配置
    this.listeners.forEach(({ type, eventName, handler }) => {
      if (type === 'global') this.removeGlobalEvent(eventName, handler);
      if (type === 'canvas') this.removeCanvasEvent(eventName, handler);
    });
    this.mountCanvas = null;
    this.canvas = null;
    this.isolation = false;
    this.listeners.length = 0;
    this.disabledFunctionTokens = {};

    // 如果是隔离画布要销毁克隆画布
    if (this.isolation) canvas.dispose();
    else canvas.requestRenderAll();
  }

  async load(vizpath: VizPath) {
    if (!this.mountCanvas) {
      throw new TypeError('Please use valid canvas object.');
    }

    if (!(this.mountCanvas instanceof fabric.Canvas)) {
      throw new TypeError('Please use fabric.Canvas instead of fabric.StaticCanvas.');
    }

    this.canvas = this._createEditorCanvas(this.mountCanvas);

    this._initDrawPathListener(vizpath);
    this._initClearPathListener(vizpath);

    this._initDrawNodeEvents(vizpath);
    this._initClearNodeEvents(vizpath);
    this._initSelectNodeEvents();
    this._initAddNodeEvents();
    this._initConvertNodeEvents();
    this._initDeleteNodeEvents();
  }
}

export default Editor;
