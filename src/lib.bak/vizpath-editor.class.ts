import { fabric } from 'fabric';
import type { ThemeDecorator } from './modules/editor-theme/index.class';
import calcCanvasCoord from './utils/calc-canvas-coord';
import calcCoordsAngle from './utils/calc-coords-angle';
import calcCoordsDistance from './utils/calc-coords-distance';
import deepIterateGroup from './utils/deep-iterate-group';
import fireMouseUpAndSelect from './utils/fire-mouse-up-and-select';
import transform from './utils/transform';
import observe from './utils/observe';
import repairPath from './utils/repair-path';
import reversePath from './utils/reverse-path';
import VizPathDOMEvent from './vizpath-dom-event.class';
import VizPathModule from './vizpath-module.class';
import VizPathTheme from './vizpath-theme.class';
import VizPath from './vizpath.class';
import Path, { InstructionType } from './path.class';
import type { PathNode, Instruction, RCoord } from './path.class';
import uniqueId from 'lodash-es/uniqueId';

export enum EditorObjectID {
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

type EditorSetting = {
  /**
   * 节点模式，不同模式下会影响节点的交互逻辑
   *
   * move 移动模式 - 节点鼠标选中为移动操作
   *
   * add 添加模式 - 鼠标点击外部区域会在区域位置上添加一个新的节点
   *
   * delete 删除模式 - 鼠标点击节点、变换器将直接删除
   *
   * convert 转换模式 - 鼠标点击节点无法移动，但可以通过拖拽实现节点转换
   *
   * @default 'move'
   */
  mode: `${Mode}`;
  /**
   * 是否开启强制曲线变换器对称
   *
   * none - 单杆变换，不对称变换
   *
   * auto - 自动变换，操作前若角度恰好对称则保持角度对称状态，如完全对称则完全对称，反之则不对称变换
   *
   * angle - 角度对称变换
   *
   * entire - 角度与位置保存完全对称变换
   *
   * @default 'auto'
   */
  dotSymmetricMode: 'none' | 'auto' | 'angle' | 'entire';
};

type EditorCurveDot = {
  type: 'pre' | 'next';
  pathNode: PathNode;
  curveDot: RCoord;
  node: fabric.Object;
  point: fabric.Object;
  line: fabric.Line;
};

/**
 * 可视路径编辑器（内置模块）
 */
class VizPathEditor extends VizPathModule {
  static ID = 'editor';

  static symbol = Symbol('editor');

  static defaultTheme: {
    path: (decorator: ThemeDecorator<fabric.Path>, pathObject: fabric.Path) => void;
    node: (decorator: ThemeDecorator<fabric.Object>) => fabric.Object;
    dot: (decorator: ThemeDecorator<fabric.Object>) => fabric.Object;
    line: (decorator: ThemeDecorator<fabric.Line>) => fabric.Line;
  } = {
    path: (decorator, pathObject) => {},
    node: () => {
      const circle = new fabric.Circle({
        radius: 3,
        fill: '#ffffff',
        stroke: '#4b4b4b',
        strokeWidth: 1,
      });

      return circle;
    },
    dot: () => {
      const circle = new fabric.Circle({
        radius: 3,
        fill: '#ffffff',
        stroke: '#4b4b4bcc',
        strokeWidth: 1,
        strokeDashArray: [1, 1],
      });

      return circle;
    },
    line: () => {
      const line = new fabric.Line([0, 0, 0, 0], {
        stroke: '#bebebe',
        strokeWidth: 1,
      });

      return line;
    },
  };

  events = new VizPathDOMEvent<{
    set: (setting: Partial<EditorSetting>) => void;
    added: (node: fabric.Object) => void;
    closed: (node: fabric.Object) => void;
    removed: (nodes: fabric.Object[]) => void;
    selected: (activeNodes: fabric.Object[], activePoint: fabric.Object | null) => void;
    deselected: (activeNodes: fabric.Object[], activePoint: fabric.Object | null) => void;
  }>();

  themes = new VizPathTheme(VizPathEditor.defaultTheme);

  /**
   * 内置配置，配置的更改会影响编辑器的交互效果，配置以栈的形式储存，每次拿配置会从后往前拿
   *
   * @note 通过 set 方法更改会触发 set 钩子，避免直接修改该字段以导致 set 钩子未执行
   */
  private _settings: Partial<EditorSetting>[] = [
    {
      mode: Mode.MOVE,
      dotSymmetricMode: 'auto',
    },
  ];

  /** 内部用于比较值的误差值 */
  deviation = 0.1 ** 8;

  /* ---------------------------- 画布相关配置 ---------------------------- */

  /** 挂载的画布 */
  canvas: fabric.Canvas | null = null;

  /** 功能禁用请求凭证 */
  disabledFunctionTokens: Partial<
    Record<'add' | 'remove' | 'upgrade' | 'degrade' | 'convert' | 'link', string[]>
  > = {};

  /* ---------------------------- 节点相关配置 ---------------------------- */

  /** 路径节点对象 */
  nodes: fabric.Object[] = [];

  /** 路径曲线变换器列表 */
  curveDots: EditorCurveDot[] = [];

  /** 元素画布对象 与 路径节点对象 映射 */
  objectNodeMap: Map<fabric.Object, PathNode> = new Map([]);

  /** 路径节点对象 与 元素画布对象 映射 */
  nodeObjectMap: Map<PathNode, fabric.Object> = new Map([]);

  /** 当前活跃的路径节点画布对象列表 */
  activeNodes: fabric.Object[] = [];

  /** 当前活跃的曲线变换器画布对象 */
  activePoint: fabric.Object | null = null;

  /** dotSymmetricMode为auto的情况下，会采用以下变换模式 */
  dotSymmetricAutoMode: 'none' | 'angle' | 'entire' = 'none';

  /** 当前转换的路径节点 */
  currentConvertNodeObject: fabric.Object | null = null;

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
  constructor(canvas: fabric.Canvas) {
    super();

    if (!canvas) {
      throw new TypeError('Please use valid canvas object.');
    }

    this.canvas = canvas;
    this.events.mount(this.canvas);
  }

  /**
   * 获取编辑器配置
   * @param key
   * @returns
   */
  get(key: keyof EditorSetting) {
    for (let i = this._settings.length - 1; i >= 0; i--) {
      if (key in this._settings[i]) return this._settings[i][key];
    }
    // 一定存在一个默认配置
    return this._settings[0][key] as EditorSetting[typeof key];
  }

  /**
   * 调整编辑器配置
   */
  set(key: Partial<EditorSetting>, value?: any): () => void;
  set<K extends keyof EditorSetting>(key: K, value: EditorSetting[K]): () => void;
  set(key: any, value: any) {
    let setting: Partial<EditorSetting> = {};

    if (typeof key === 'string') {
      setting = { [key]: value };
    }

    if (typeof key === 'object') {
      setting = key;
    }

    if (Object.keys(setting).length === 0) {
      throw Error(`(VizPath Error) Please set valid editor's setting.`);
    }

    this._settings.push(setting);
    this.events.fire('set', setting);
    const reset = () => {
      const index = this._settings.indexOf(setting);
      if (index > 0) {
        this._settings.splice(index, 1);
        this.events.fire(
          'set',
          Object.keys(setting).reduce((result, key) => {
            result[key] = this.get(key as keyof EditorSetting);
            return result;
          }, {}),
        );
      }
    };

    return reset;
  }

  /**
   * 将画布坐标转化为特定路径的相对指令坐标位置
   */
  calcAbsolutePosition(coord: Coord, object: fabric.Object): Position {
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
  calcRelativeCoord(position: Position, object: fabric.Object): Coord {
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
   * 初始化路径绘制监听
   */
  private _initDrawPathListener(vizpath: VizPath) {
    const canvas = this.canvas;
    if (!canvas) return;

    const handler = (path: Path) => {
      // 如果已经带有标志则是已经添加进画布的路径
      if (path[VizPathEditor.symbol]) return;

      const centerPoint = path.getCenterPoint();

      const decorator: ThemeDecorator<fabric.Path> = (customPath, callback) => {
        customPath.set({
          name: uniqueId(),
          // 路径本身不可选中，后续通过操纵点和线条来更改路径
          selectable: false,
          // 不触发事件
          evented: false,
          // 防止因为缓存没有显示正确的路径
          objectCaching: false,
        });

        // 避免路径轮廓宽度影响到路径偏移
        customPath.setPositionByOrigin(centerPoint, 'center', 'center');

        customPath[VizPathEditor.symbol] = EditorObjectID.PATH;

        return customPath;
      };

      this.themes.create('path')(decorator, path);

      if (!path[VizPathEditor.symbol]) decorator(path);

      // 添加新的路径对象
      canvas.renderOnAddRemove = true;
      if (!canvas.contains(path)) canvas.add(path);
      canvas.renderOnAddRemove = false;
      canvas.requestRenderAll();
    };
    vizpath.events.on('draw', handler);
  }

  /**
   * 初始化路径清除监听
   */
  private _initClearPathListener(vizpath: VizPath) {
    const canvas = this.canvas;
    if (!canvas) return;

    const handler = (path: Path) => {
      canvas.remove(path);
    };
    vizpath.events.on('clear', handler);
    vizpath.events.on('clearAll', () => {
      canvas.remove(...vizpath.paths.map((i) => i));
    });
  }

  private _initPathNodes() {
    const objects: fabric.Object[] = [];
    const objectNodeMap: typeof this.objectNodeMap = new Map();
    const nodeObjectMap: typeof this.nodeObjectMap = new Map();

    const vizpath = this.vizpath;
    if (!vizpath) return { objects, objectNodeMap, nodeObjectMap };

    /**
     * 创建路径节点对应的fabric对象
     * @param node 路径节点
     * @param originObject 来源对象
     */
    const createNodeObject = (node: RCoord, originObject?: fabric.Object) => {
      const decorator: ThemeDecorator<fabric.Object> = (customObject, callback) => {
        customObject.set({
          name: uniqueId(),
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

        customObject[VizPathEditor.symbol] = EditorObjectID.NODE;

        return customObject;
      };

      let object = originObject ?? this.themes.create('node')(decorator);

      if (!object[VizPathEditor.symbol]) object = decorator(object);

      // 加入画布时添加自动响应
      const onAddedNode = () => {
        node.observe(
          (x, y) => {
            const position = this.calcAbsolutePosition(
              { x, y },
              vizpath.coordNodeMap.get(node)!.path,
            );
            if (object.group) {
              const relativePosition = this.calcRelativeCoord(position, object.group);
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
    vizpath.paths.forEach((path) => {
      path.segments.forEach((segment) => {
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
    });

    // 第二轮遍历则是为了创建新对象
    vizpath.paths.forEach((path) => {
      path.segments.forEach((segment) => {
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

      // 由于需要多次添加路径节点和曲线变换器，如果不设置该配置，每次添加和移除都会渲染一次画布，设置为false后可以控制为1次渲染
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

    vizpath.events.on('draw', updateNodes);
  }

  /**
   * 初始路径节点清除事件
   */
  private _initClearNodeEvents(vizpath: VizPath) {
    const canvas = this.canvas;
    if (!canvas) return;

    vizpath.events.on('clear', (path) => {
      const removeObjects: fabric.Object[] = [];
      path.segments.forEach((segment) => {
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

    vizpath.events.on('clearAll', () => {
      this.blur();
      canvas.remove(...this.nodes);
      this.nodes = [];
      this.objectNodeMap.clear();
      this.nodeObjectMap.clear();
    });

    vizpath.events.on('destroy', () => {
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
    const initialObjectCount = group._objects.length;
    group._objects.forEach((object) => observe(object, ['left', 'top'], () => {}));
    observe(group, ['left', 'top', 'angle', 'scaleX', 'scaleY'], (newValue, oldValue) => {
      if (!group.canvas) return;
      if (group._objects.length !== initialObjectCount) return;
      this.vizpath?.onceRerenderOriginPath(() => {
        const hadFollowedCoords = new Set<RCoord>([]);
        for (const object of group._objects as fabric.Object[]) {
          const followCurveDots: RCoord[] = [];
          const pathNode = this.objectNodeMap.get(object)!;
          const curveDots = this.vizpath?.getNeighboringCurveDots(pathNode) ?? [];
          curveDots?.forEach(({ position, direction, from }) => {
            const coord = from.curveDots?.[direction];
            if (position !== 'cur' || !coord) return;
            // 避免重复的曲线变换器跟随更改
            if (hadFollowedCoords.has(coord)) return;
            followCurveDots.push(coord);
            hadFollowedCoords.add(coord);
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
        hadFollowedCoords.clear();
      });
    });
  }

  /**
   * 添加单个活跃对象的响应式变化
   */
  private _addActivePointObserve(object: fabric.Object) {
    observe(object, ['left', 'top'], ({ left, top }) => {
      if (object.group) return;

      const followCurveDots: RCoord[] = [];
      const pathNode = this.objectNodeMap.get(object)!;
      const curveDots = this.vizpath?.getNeighboringCurveDots(pathNode) ?? [];
      curveDots?.forEach(({ position, direction, from }) => {
        const coord = from.curveDots?.[direction];
        if (position !== 'cur' || !coord) return;
        followCurveDots.push(coord);
      });

      this._transform(object, { left: left!, top: top! }, followCurveDots);
    });
  }

  /**
   * 初始画布节点选中事件
   */
  private _initSelectNodeEvents() {
    this.events.canvas.on('selection:created', (e) => {
      if (this._deactivateSelectListeners) return;
      this.focus(...this.canvas!.getActiveObjects());
    });
    this.events.canvas.on('selection:updated', (e) => {
      if (this._deactivateSelectListeners) return;
      this.focus(...this.canvas!.getActiveObjects());
    });
    this.events.canvas.on('selection:cleared', () => {
      if (this._deactivateSelectListeners) return;
      this.focus();
    });
    // 选中路径段时自动选中路线段内的所有指令路径节点
    this.events.canvas.on('mouse:dblclick', (e) => {
      if (e.target && e.target[VizPathEditor.symbol]) return;

      const paths = this.vizpath?.paths ?? [];
      let focusPath: Path | undefined;
      for (let i = paths.length - 1; i >= 0; i--) {
        const path = paths[i];
        if (path.containsPoint(e.pointer)) {
          focusPath = path;
          break;
        }
      }
      if (focusPath) {
        this.focus(
          ...this.nodes.filter((node) => this.objectNodeMap.get(node)!.path === focusPath),
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

    this.events.canvas.on('mouse:down:before', (event) => {
      if (this.disabledFunctionTokens.add?.length) return;
      if (this.get('mode') !== Mode.ADD) return;

      let target: fabric.Object | undefined;
      // 路径闭合
      if (event.target && event.target[VizPathEditor.symbol]) {
        if (
          this.activeNodes.length === 1 &&
          event.target[VizPathEditor.symbol] === EditorObjectID.NODE
        ) {
          const joinNode = this.link(this.activeNodes[0]!, event.target);
          if (joinNode) target = this.nodeObjectMap.get(joinNode);
          if (target) {
            this.currentConvertNodeObject = target;
            this.events.fire('closed', target);
          }
        }
      }
      // 新增节点
      else {
        const pointer = calcCanvasCoord(canvas, event.pointer);
        target = this.add({ left: pointer.x, top: pointer.y });
        if (target) {
          this.currentConvertNodeObject = target;
          this.events.fire('added', target);
        }
      }
    });
  }

  /**
   * 获取相对变换器
   */
  getRelativeCurveDot(object: fabric.Object) {
    const curveDot = this.curveDots.find((dot) => dot.point === object);
    if (!curveDot) return;

    return this.curveDots.find((dot) => {
      const antiDirection = { pre: 'next', next: 'pre' }[curveDot.type];
      if (dot.type !== antiDirection) return false;
      if (dot.node !== curveDot.node) return false;
      return dot;
    });
  }

  /**
   * 添加活跃节点的周围曲线变换器
   */
  private _updateCurveDots() {
    const vizpath = this.vizpath;
    if (!vizpath) return;

    const canvas = this.canvas;
    if (!canvas) return;

    // 移除旧对象
    canvas.renderOnAddRemove = false;
    canvas.remove(...this.curveDots.map((i) => [i.point, i.line]).flat(1));

    // 当前的活跃节点
    const curPathNode =
      this.activeNodes.length === 1 ? this.objectNodeMap.get(this.activeNodes[0]) : undefined;
    if (!curPathNode) {
      canvas.renderOnAddRemove = true;
      canvas.requestRenderAll();
      this.curveDots = [];
      return;
    }

    // 创建新的路径曲线变换器
    const curveDots: EditorCurveDot[] = [];
    const curveDotSet = new WeakSet<RCoord>([]);
    const neighboringCurveDots = vizpath
      .getNeighboringCurveDots(curPathNode)
      .filter(({ direction, from }) => {
        const node = from.node;
        const point = from.curveDots?.[direction];
        if (!node || !point || curveDotSet.has(point)) return false;
        curveDotSet.add(point);

        return true;
      })
      .map((curveDot) => {
        const { direction, from } = curveDot;
        const nodeObject = this.nodeObjectMap.get(from)!;
        const reuseCurveDot = this.curveDots.find(
          (i) => i.type === direction && i.pathNode === from && i.node === nodeObject,
        );
        return {
          ...curveDot,
          nodeObject,
          reuseCurveDot,
        };
      });
    // 有复用元素的必须优先处理，避免新的变换器在废弃池中提前使用了复用元素
    neighboringCurveDots.sort((a, b) => (a.reuseCurveDot ? -1 : 1));
    neighboringCurveDots.forEach(({ direction, from, nodeObject, reuseCurveDot }) => {
      const node = from.node!;
      const curveDot = from.curveDots![direction]!;

      /**
       * 创建指令曲线变换器
       */
      let point = reuseCurveDot?.point as fabric.Object;
      if (!point) {
        const pointDecorator: ThemeDecorator<fabric.Object> = (customObject, callback) => {
          customObject.set({
            name: uniqueId(),
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

          customObject[VizPathEditor.symbol] = EditorObjectID.CURVE_DOT;

          return customObject;
        };
        point = this._abandonedPool.points.pop() ?? this.themes.create('dot')(pointDecorator);
        if (!point[VizPathEditor.symbol]) point = pointDecorator(point);
      } else {
        const index = this._abandonedPool.points.indexOf(point);
        this._abandonedPool.points.splice(index, 1);
      }

      // 建立相互响应，指令的数据和元素的位置更改会相互同步
      const onAddedPoint = () => {
        curveDot.observe(
          (x, y) => {
            if (point.canvas?.getActiveObject() === point) return;
            const position = this.calcAbsolutePosition(
              { x, y },
              vizpath.coordNodeMap.get(node)!.path,
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
            if (point.group) return;

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
              const coord = this.calcRelativeCoord(
                {
                  left: left!,
                  top: top!,
                },
                vizpath.coordNodeMap.get(node)!.path,
              );
              // 曲线变换器对称操作
              const symmetricMode =
                this.get('dotSymmetricMode') === 'auto'
                  ? this.dotSymmetricAutoMode
                  : this.get('dotSymmetricMode');
              if (symmetricMode !== 'none') {
                const symmetricCurveDot = this.getRelativeCurveDot(point);
                if (symmetricCurveDot) {
                  const { curveDot: _curveDot } = symmetricCurveDot;
                  // 旧镜像曲线变换器到路径节点的距离
                  const d = calcCoordsDistance(_curveDot, node);
                  // 新镜像曲线变换器到路径节点的距离
                  const new_d = calcCoordsDistance(
                    {
                      x: node.x - (coord.x - node.x),
                      y: node.y - (coord.y - node.y),
                    },
                    node,
                  );
                  const scale = symmetricMode === 'entire' ? 1 : d / new_d;
                  _curveDot.set(
                    node.x - (coord.x - node.x) * scale,
                    node.y - (coord.y - node.y) * scale,
                  );
                }
              }
              curveDot.set(coord.x, coord.y, [point.name]);
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
       * 创建曲线变换器和节点的连线
       */

      let line = reuseCurveDot?.line as fabric.Line;
      if (!line) {
        const lineDecorator: ThemeDecorator<fabric.Line> = (customObject, callback) => {
          customObject.set({
            name: uniqueId(),
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

          customObject[VizPathEditor.symbol] = EditorObjectID.LINE;

          return customObject;
        };
        line = this._abandonedPool.lines.pop() ?? this.themes.create('line')(lineDecorator);
        if (!line[VizPathEditor.symbol]) line = lineDecorator(line);
      } else {
        const index = this._abandonedPool.lines.indexOf(line);
        this._abandonedPool.lines.splice(index, 1);
      }

      // 建立响应式，让连线随时跟随指令的值进行变化
      const onAddedLine = () => {
        node.observe(
          (x, y) => {
            const position = this.calcAbsolutePosition(
              { x, y },
              vizpath.coordNodeMap.get(node)!.path,
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
              vizpath.coordNodeMap.get(node)!.path,
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

    // 添加新的画布元素
    const baseIndex = canvas._objects.indexOf(vizpath.paths[0]) + vizpath.paths.length;
    curveDots.forEach((i, idx) => {
      canvas.insertAt(i.line, baseIndex + idx, false);
      canvas.add(i.point);
    });
    this.curveDots = curveDots;
    canvas.renderOnAddRemove = true;
    canvas.requestRenderAll();
  }

  /**
   * 获取路径节点进行转换的配置
   */
  private _getConvertibleNodes(node: PathNode) {
    if (!this.vizpath) return [];

    const { instruction } = node;
    const { pre, next } = this.vizpath.getNeighboringInstructions(node);

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
   * 初始路径指令转换事件
   */
  private _initConvertNodeEvents() {
    const canvas = this.canvas;
    if (!canvas) return;

    this.events.canvas.on('mouse:down', (event) => {
      if (this.disabledFunctionTokens.convert?.length) return;

      if (!this.currentConvertNodeObject) {
        if (this.get('mode') !== Mode.CONVERT) return;
        if (event.target?.[VizPathEditor.symbol] !== EditorObjectID.NODE) return;
        this.currentConvertNodeObject = event.target as fabric.Object;
      }

      if (this.currentConvertNodeObject) {
        fireMouseUpAndSelect(this.currentConvertNodeObject);
        this.currentConvertNodeObject.set({ lockMovementX: true, lockMovementY: true });
        canvas.selection = false;
      }
    });

    this.events.canvas.on('mouse:move', (event) => {
      const target = this.currentConvertNodeObject;
      if (!target) return;

      // 如果鼠标还在点上不触发控制曲线作用，当移出后才触发，避免触发敏感
      if (target.containsPoint(event.pointer)) return;

      const pointer = calcCanvasCoord(canvas, event.pointer);

      const targetNode = this.objectNodeMap.get(target)!;
      const pathObject = targetNode.path;
      const neighboringNodes = this.vizpath!.getNeighboringNodes(targetNode, true);

      // 获取可转换点，如果无法转换了则先转变为直线再提取转换点
      let convertibleNodes = this._getConvertibleNodes(targetNode);
      if (convertibleNodes.length === 0) {
        this.degrade(target, 'both', true);
        convertibleNodes = this._getConvertibleNodes(targetNode);
      }

      const position = this.calcRelativeCoord({ left: pointer.x, top: pointer.y }, pathObject);
      const antiPosition = this.calcRelativeCoord(
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
            calcCoordsAngle(position, targetNode.node!, neighboringNodes[a[0]]!.node!) -
            calcCoordsAngle(position, targetNode.node!, neighboringNodes[b[0]]!.node!)
          );
        });
      }

      convertibleNodes.forEach((item, index) => {
        const newCoord = [position, antiPosition][index];
        const newInstruction = [...item[1].instruction] as Instruction;
        newInstruction[0] = {
          [InstructionType.LINE]: InstructionType.QUADRATIC_CURCE,
          [InstructionType.QUADRATIC_CURCE]: InstructionType.BEZIER_CURVE,
        }[newInstruction[0]];
        newInstruction.splice(item[0] === 'pre' ? -2 : 1, 0, newCoord.x, newCoord.y);
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

    this.events.canvas.on('mouse:up', () => {
      if (this.currentConvertNodeObject) {
        this.currentConvertNodeObject.set({ lockMovementX: false, lockMovementY: false });
        this.currentConvertNodeObject = null;
        canvas.selection = true;
      }
    });
  }

  /**
   * 初始路径节点删除事件
   */
  private _initDeleteNodeEvents() {
    this.events.canvas.on('mouse:down', (event) => {
      if (this.disabledFunctionTokens.remove?.length) return;
      if (this.get('mode') !== Mode.DELETE) return;

      if (
        event.target?.[VizPathEditor.symbol] === EditorObjectID.NODE ||
        event.target?.[VizPathEditor.symbol] === EditorObjectID.CURVE_DOT
      ) {
        this.remove(event.target);
      }
    });
  }

  /**
   * 变换节点
   * @param object 路径节点
   * @param options 变换配置
   * @param followCurveDots 跟随变换的曲线变换器
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
    followCurveDots: RCoord[] = [],
  ) {
    const pathNode = this.objectNodeMap.get(object);
    if (!pathNode) return;

    const { node } = pathNode;

    const { left, top, scaleX = 1, scaleY = 1, angle = 0 } = options;

    const newCoord = this.calcRelativeCoord(
      { left, top },
      this.vizpath!.coordNodeMap.get(node!)!.path,
    );

    // 需要跟随变化的曲线曲线变换器
    followCurveDots.forEach((curveDot) => {
      if (!curveDot) return;
      const relativeDiff = transform(
        {
          x: curveDot.x - newCoord.x,
          y: curveDot.y - newCoord.y,
        },
        [
          {
            translate: {
              x: newCoord.x - node!.x,
              y: newCoord.y - node!.y,
            },
          },
          { scale: { x: scaleX, y: scaleY } },
          { rotate: angle },
        ],
      );
      curveDot.x = newCoord.x + relativeDiff.x;
      curveDot.y = newCoord.y + relativeDiff.y;
    });

    // 节点位置更新
    node!.set(newCoord.x, newCoord.y, [object!.name]);

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
    const token = `${functionName}-${uniqueId()}`;
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

      const { segment } = pathNode;

      // 如果当前节点已闭合或非端点，无法实现节点添加
      if (vizpath.isClosedSegment(segment)) return;

      const newCoord = this.calcRelativeCoord(position, pathNode.path);

      // 如果是起始点
      if (pathNode === segment[0]) {
        // 添加新的起始
        const addPathNode = vizpath.insertBeforeNode(pathNode, [
          InstructionType.START,
          newCoord.x,
          newCoord.y,
        ]);
        if (!addPathNode) return;

        return this.nodeObjectMap.get(addPathNode);
      }
      // 如果是末尾端点
      else if (pathNode === segment[segment.length - 1]) {
        const addPathNode = vizpath.insertAfterNode(pathNode, [
          InstructionType.LINE,
          newCoord.x,
          newCoord.y,
        ]);
        if (!addPathNode) return;

        return this.nodeObjectMap.get(addPathNode);
      }
    } else {
      const paths = vizpath.draw('M 0 0', position);
      return this.nodeObjectMap.get(paths[0].segments[0][0]);
    }
  }

  /**
   * 删除节点或变换器
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
   * 2）删除1个变换器，实现曲线路径降级为直线路径
   *
   * @param objects 点对象(路径节点、变换器)列表
   */
  remove(...objects: fabric.Object[]) {
    if (this.disabledFunctionTokens.remove?.length) return;
    if (!this.vizpath) return;

    const canvas = this.canvas;
    if (!canvas) return;

    const nodeObjects = objects.filter((i) => i[VizPathEditor.symbol] === EditorObjectID.NODE);
    const pointObjects = objects.filter(
      (i) => i[VizPathEditor.symbol] === EditorObjectID.CURVE_DOT,
    );

    if (nodeObjects.length) {
      const removeNodes: RCoord[] = [];
      nodeObjects.forEach((object) => {
        const { node } = this.objectNodeMap.get(object)!;
        if (!node) return;

        removeNodes.push(node);
      });
      this.blur();
      // 触发鼠标举起事件，避免后续拖动操作生效
      (this.canvas as any)._onMouseUp(new MouseEvent('mouseup'));
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

    const targets: [direction: 'pre' | 'next', pathNode: PathNode][] = [];

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

    const targets: [direction: 'pre' | 'next', pathNode: PathNode][] = [];

    if ((direction === 'both' || direction === 'pre') && directionNodeMap.pre) {
      targets.push(['pre', directionNodeMap.pre]);
    }

    if ((direction === 'both' || direction === 'next') && directionNodeMap.next) {
      targets.push(['next', directionNodeMap.next]);
    }

    targets.forEach(([direction, pathNode]) => {
      const oldInstruction = pathNode.instruction;
      if (['M', 'L'].includes(oldInstruction[0])) return;

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
   * 判断两点是否可以相连
   */
  checkLinkable(sourceObject: fabric.Object, targetObject: fabric.Object) {
    const vizpath = this.vizpath;
    if (!vizpath) return false;

    if (sourceObject === targetObject) return false;

    if (this.disabledFunctionTokens.link?.length) return false;

    const sourceNode = this.objectNodeMap.get(sourceObject);
    const targetNode = this.objectNodeMap.get(targetObject);

    if (!sourceNode || !targetNode) return false;
    if (!vizpath.isTerminalNode(sourceNode) || !vizpath.isTerminalNode(targetNode)) return false;

    return true;
  }

  /**
   * 连接两个节点，可以实现路径闭合和路径拼接，仅在两点都是路径端点（即首尾点）时生效。
   *
   * @param source 当前点
   * @param target 目标点
   * @returns 合并点
   */
  link(sourceObject: fabric.Object, targetObject: fabric.Object) {
    if (!this.checkLinkable(sourceObject, targetObject)) return;

    const vizpath = this.vizpath;
    if (!vizpath) return;

    const source = this.objectNodeMap.get(sourceObject)!;
    const target = this.objectNodeMap.get(targetObject)!;

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
          target.path,
        );
        const coord = this.calcRelativeCoord(position, target.path);
        instruction[i + 1] = coord.x;
        instruction[i + 2] = coord.y;
      }
    });
    const joinIndex = sourcePath.length;
    const mergePath = sourcePath.concat(targetPath);

    // 合并后添加回路径段集合
    const newPath = vizpath.onceRerenderOriginPath(() => {
      vizpath.clearPathSegment(target.path, target.segment);
      return vizpath.redraw(source.path, mergePath as Instruction[]);
    });

    return newPath[0].segments[0][joinIndex];
  }

  focus(...selectedObjects: fabric.Object[]) {
    const canvas = this.canvas;
    if (!canvas) return;

    // 提取有效活跃元素
    const focusNodes: fabric.Object[] = [];
    const focusCurveDotPoints: fabric.Object[] = [];
    selectedObjects.forEach((object) => {
      switch (object[VizPathEditor.symbol]) {
        case EditorObjectID.NODE:
          focusNodes.push(object);
          break;
        case EditorObjectID.CURVE_DOT:
          focusCurveDotPoints.push(object);
          break;
        default:
          break;
      }
    });

    // 触发内置失焦事件
    if (this.activePoint || this.activeNodes.length) {
      this.events.fire('deselected', this.activeNodes, this.activePoint);
    }

    this._deactivateSelectListeners = true;

    // 只要包含路径节点则只处理聚焦路径节点逻辑
    if (focusNodes.length) {
      // 取消画布选中重新构造只包含路径节点的选中框对象
      canvas.discardActiveObject();
      this.activeNodes = focusNodes;
      this.activePoint = null;
      // 是否只选中单一路径节点
      if (focusNodes.length === 1) {
        const focusNode = focusNodes[0];
        this._addActivePointObserve(focusNode);
        this._updateCurveDots();
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
        this._updateCurveDots();
        canvas.setActiveObject(activeSelection);
      }
      this.events.fire('selected', focusNodes, null);
    }
    // 考虑是否只有一个曲线变换器聚焦情况，不允许多曲线变换器同时聚焦
    else if (focusCurveDotPoints.length === 1) {
      const { node, type } = this.curveDots.find((i) => i.point === focusCurveDotPoints[0])!;
      this.activeNodes = [node];
      this._updateCurveDots();

      const activePoint = this.curveDots.find((i) => i.node === node && i.type === type)!;
      this.activePoint = activePoint.point;
      canvas.setActiveObject(activePoint.point);
      this.events.fire('selected', this.activeNodes, this.activePoint);
    }
    // 如都不符合上面情况则是所有节点都失去焦点
    else {
      this.activeNodes = [];
      this.activePoint = null;
      this._updateCurveDots();
      canvas.discardActiveObject();
    }

    this._deactivateSelectListeners = false;

    // 如果当前选中的是变换器需要确定其自动变换的模式
    if (this.activePoint) {
      const dot = this.curveDots.find((i) => i.point === this.activePoint)!;
      const relativeDot = this.getRelativeCurveDot(this.activePoint)!;
      if (
        relativeDot &&
        180 - calcCoordsAngle(dot.curveDot, dot.pathNode.node!, relativeDot.curveDot) <=
          this.deviation
      ) {
        this.dotSymmetricAutoMode = 'angle';
        if (
          Math.abs(
            calcCoordsDistance(dot.curveDot, dot.pathNode.node!) -
              calcCoordsDistance(dot.pathNode.node!, relativeDot.curveDot),
          ) <= this.deviation
        ) {
          this.dotSymmetricAutoMode = 'entire';
        }
      } else {
        this.dotSymmetricAutoMode = 'none';
      }
    } else {
      this.dotSymmetricAutoMode = 'none';
    }
  }

  blur() {
    this.focus();
  }

  unload(vizpath: VizPath) {
    const canvas = this.canvas;
    if (!canvas) return;

    canvas.remove(
      ...vizpath.paths.map((i) => i),
      ...this.nodes,
      ...this.curveDots.map((i) => i.point),
      ...this.curveDots.map((i) => i.line),
    );

    // 节点相关配置
    this.nodes.length = 0;
    this.curveDots.length = 0;
    this.activeNodes.length = 0;
    this.activePoint = null;
    this.currentConvertNodeObject = null;
    this.objectNodeMap.clear();
    this.nodeObjectMap.clear();

    this._deactivateSelectListeners = false;
    this._abandonedPool.nodes.length = 0;
    this._abandonedPool.points.length = 0;
    this._abandonedPool.lines.length = 0;

    // 画布相关配置
    this.events.clear();
    this.canvas = null;
    this.canvas = null;
    this.disabledFunctionTokens = {};
    canvas.requestRenderAll();
  }

  async load(vizpath: VizPath) {
    // 路径处理
    this._initDrawPathListener(vizpath);
    this._initClearPathListener(vizpath);
    // 节点处理
    this._initDrawNodeEvents(vizpath);
    this._initClearNodeEvents(vizpath);
    this._initSelectNodeEvents();
    this._initAddNodeEvents();
    this._initConvertNodeEvents();
    this._initDeleteNodeEvents();
  }
}

export default VizPathEditor;
