import type { ThemeDecorator } from './modules/editor-theme/index.class';
import VizPathDOMEvent from './vizpath-dom-event.class';
import type VizPathModule from './vizpath-module.class';
import VizPathTheme from './vizpath-theme.class';
import { fabric } from 'fabric';
import Path, { InstructionType, type VizPath, type PathNode, type RCoord } from './vizpath.class';
import {
  calcCanvasCoord,
  calcCoordsAngle,
  calcCoordsDistance,
  deepIterateGroup,
  fabricOnceRender,
  fireFabricMouseUp,
  fireMouseUpAndSelect,
  observe,
  parsePathJSON,
  transform,
} from '@utils';
import uniqueId from 'lodash-es/uniqueId';

export enum EditorObjectID {
  PATH = 'path',
  NODE = 'node',
  CURVE_DOT = 'curve-dot',
  CURVE_BAR = 'curve-bar',
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
};

type EditorDeformer = {
  type: 'pre' | 'next';
  node: PathNode;
  dot: RCoord;
  nodeObject: fabric.Object;
  curveDot: fabric.Object;
  curveBar: fabric.Line;
  /**
   * 是否开启强制曲线变换器对称
   *
   * none - 单杆变换，不对称变换
   *
   * angle - 角度对称变换
   *
   * entire - 角度与位置保存完全对称变换
   *
   * @default 'none'
   */
  symmetric: 'none' | 'angle' | 'entire';
};

type EditorDeformerCache = Pick<EditorDeformer, 'type' | 'node' | 'symmetric' | 'dot'>;

/**
 * 可视路径编辑器
 */
class VizPathEditor {
  static symbol = Symbol('vizpath-editor');

  /**
   * 内置配置，配置的更改会影响编辑器的交互效果，配置以栈的形式储存，每次拿配置会从后往前拿
   *
   * @note 通过 set 方法更改会触发 set 钩子，避免直接修改该字段以导致 set 钩子未执行
   */
  private _settings: Partial<EditorSetting>[] = [
    {
      mode: Mode.MOVE,
    },
  ];

  /** 内部用于比较值的误差值 */
  deviation = 0.1 ** 8;

  /** 挂载的画布 */
  canvas: fabric.Canvas | null = null;

  /**
   * 增强模块列表
   */
  modules: VizPathModule[] = [];

  events = new VizPathDOMEvent<{
    set: (setting: Partial<EditorSetting>) => void;
    selected: (activeNodes: fabric.Object[], activePoint: fabric.Object | null) => void;
    deselected: (activeNodes: fabric.Object[], activePoint: fabric.Object | null) => void;
  }>();

  themes = new VizPathTheme(VizPathEditor.defaultTheme);

  static defaultTheme: {
    path: (decorator: ThemeDecorator<fabric.Path>, pathObject: fabric.Path) => void;
    node: (decorator: ThemeDecorator<fabric.Object>) => fabric.Object;
    dot: (decorator: ThemeDecorator<fabric.Object>) => fabric.Object;
    line: (decorator: ThemeDecorator<fabric.Line>) => fabric.Line;
  } = {
    path: () => {},
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

  /* ---------------------------- 操作对象相关 ---------------------------- */

  /** 当前编辑路径 */
  vizpath: VizPath | null = null;

  /** 路径节点对象 */
  nodes: fabric.Object[] = [];

  /** 路径曲线变换器列表 */
  deformers: EditorDeformer[] = [];

  /** 变换器缓存 */
  deformerCaches: EditorDeformerCache[] = [];

  /** 元素画布对象 与 路径节点对象 映射 */
  objectNodeMap: Map<fabric.Object, PathNode> = new Map([]);

  /** 路径节点对象 与 元素画布对象 映射 */
  nodeObjectMap: Map<PathNode, fabric.Object> = new Map([]);

  /** 当前活跃的路径节点画布对象列表 */
  activeNodes: fabric.Object[] = [];

  /** 当前活跃的曲线变换器画布对象 */
  activePoint: fabric.Object | null = null;

  /** 当前转换的路径节点 */
  currentConvertNodeObject: fabric.Object | null = null;

  /** 记录原路径对象配置，在退出编辑时重置路径对象配置 */
  private _originPathOptions: fabric.IPathOptions | null = null;

  /* ---------------------------- 其他内部属性 ---------------------------- */

  /** 由于focus方法内部也有对元素聚焦失焦的操作，锁定避免循环执行事件监听造成死循环 */
  private _lockFocus = false;

  /** 记录当前活跃对象观察者 */
  private _observer: { target: fabric.Object; unobserve: () => void } | null = null;

  /** 功能禁用请求凭证 */
  disabledFunctionTokens: Partial<Record<'add' | 'delete' | 'convert', string[]>> = {};

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
   * 进入路径编辑
   */
  enterEditing(path: Path) {
    // 如果编辑器未挂载画布，抛出错误
    if (!this.canvas) {
      throw Error('(VizPath Error) You must mount the canvas before editing!');
    }
    // fabric.canvas画布不匹配，抛出错误
    else if (path.canvas && this.canvas !== path.canvas) {
      throw Error(
        '(VizPath Error) The fabric.canvas editor must be mounted in an identical manner to the canvas where the path was added!',
      );
    }
    // 如果路径对象未加入画布则先加入当前编辑器挂载画布
    if (!path.canvas) this.canvas.add(path);

    this.leaveEditing();

    this.vizpath = path.visualize();

    // 初始路径对象事件
    // this._initVizpathEvents();

    // 绘制路径
    this._renderVizPath();

    // 绘制节点操作对象
    this._renderPathNodes();

    // 绘制全部变换器
    this._renderAllDeformers();
  }

  /**
   * 退出路径编辑
   */
  leaveEditing() {
    if (!this.vizpath) return;

    const canvas = this.canvas;
    if (!canvas) return;

    fabricOnceRender(canvas, () => {
      this.nodes.forEach((node) => {
        delete node[VizPathEditor.symbol];
        canvas.remove(node);
      });
      this.deformers.forEach((deformer) => {
        delete deformer.curveDot[VizPathEditor.symbol];
        delete deformer.curveBar[VizPathEditor.symbol];
        canvas.remove(deformer.curveDot, deformer.curveBar);
      });
    });

    this.nodes.length = 0;
    this.deformers.length = 0;

    this.activeNodes.length = 0;
    this.activePoint = null;

    this.nodeObjectMap.clear();
    this.objectNodeMap.clear();

    this.currentConvertNodeObject = null;
    this._lockFocus = false;

    const path = this.vizpath.path;
    delete path[VizPathEditor.symbol];
    const centerPoint = path.getCenterPoint();
    path.set(this._originPathOptions ?? {});
    path.setPositionByOrigin(centerPoint, 'center', 'center');
    path.setCoords();
    this._originPathOptions = null;

    this.vizpath = null;
  }

  /**
   * 初始路径对象事件
   */
  rerender<T>(callback: (activeNodes: fabric.Object[], activePoint: fabric.Object | null) => T) {
    const storeActiveNodes = this.activeNodes;
    const storeActivePoint = this.activePoint;
    this.blur();

    const result = callback(storeActiveNodes, storeActivePoint);

    this._renderPathNodes();
    this._renderAllDeformers();

    if (storeActivePoint?.canvas === this.canvas) this.focus(storeActivePoint);
    else if (storeActiveNodes.every((object) => object.canvas === this.canvas)) {
      this.focus(...storeActiveNodes);
    }

    return result;
  }

  /**
   * 初始路径
   */
  private _renderVizPath() {
    const canvas = this.canvas;
    if (!canvas) return;

    const vizpath = this.vizpath;
    if (!vizpath) return;

    // 如果已经带有标志则是已经添加进画布的路径
    if (vizpath[VizPathEditor.symbol]) return;

    // 记录原始配置便于结束后恢复配置
    const { styles } = parsePathJSON(vizpath.path);
    this._originPathOptions = {
      ...styles,
      selectable: vizpath.path.selectable,
      evented: vizpath.path.evented,
      objectCaching: vizpath.path.objectCaching,
    };

    const originCenterPoint = vizpath.path.getCenterPoint();

    const decorator: ThemeDecorator<fabric.Path> = (customPath) => {
      customPath.set({
        // 路径本身不允许选中，后续通过操纵点和线条来更改路径
        selectable: false,
        // 不触发事件
        evented: false,
        // 防止因为缓存没有显示正确的路径
        objectCaching: false,
      });

      // 重置回原路径中心，避免轮廓宽度使路径发生偏移
      customPath.setPositionByOrigin(originCenterPoint, 'center', 'center');

      // 添加标志
      customPath[VizPathEditor.symbol] = EditorObjectID.PATH;

      return customPath;
    };

    this.themes.create('path')(decorator, vizpath.path);

    if (!vizpath.path[VizPathEditor.symbol]) decorator(vizpath.path);

    canvas.requestRenderAll();
  }

  /**
   * 创建路径节点对应的fabric对象
   * @param reuseObject 重用对象
   */
  private _createNodeObject(reuseObject?: fabric.Object) {
    const decorator: ThemeDecorator<fabric.Object> = (customObject) => {
      customObject.set({
        // 选中时不出现选中框
        hasBorders: false,
        hasControls: false,
        // 保持居中
        originX: 'center',
        originY: 'center',
      });

      // 内部元素都不做另外的画布缓存
      deepIterateGroup(customObject, (object) => {
        object.set({
          objectCaching: false,
        });
      });

      customObject[VizPathEditor.symbol] = EditorObjectID.NODE;

      return customObject;
    };

    let object = reuseObject ?? this.themes.create('node')(decorator);
    if (!object[VizPathEditor.symbol]) object = decorator(object);

    return object;
  }

  /**
   * 创建变换器变换点对象
   */
  private _createCurveDotObject(reuseObject?: fabric.Object) {
    const decorator: ThemeDecorator<fabric.Object> = (customObject) => {
      customObject.set({
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

    let object = reuseObject ?? this.themes.create('dot')(decorator);
    if (!object[VizPathEditor.symbol]) object = decorator(object);

    return object;
  }

  /**
   * 创建变换器连接线对象
   */
  private _createCurveBarLine(reuseLine?: fabric.Line) {
    const lineDecorator: ThemeDecorator<fabric.Line> = (customObject) => {
      customObject.set({
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

      customObject[VizPathEditor.symbol] = EditorObjectID.CURVE_BAR;

      return customObject;
    };

    let line = reuseLine ?? this.themes.create('line')(lineDecorator);
    if (!line[VizPathEditor.symbol]) line = lineDecorator(line);

    return line;
  }

  /**
   * 更新变换器连接线及其控制点的坐标和位置
   * @param deformer 控制点配置
   * @param skipSelfDot 跳过控制点自身的配置，响应式更改中需设置为true，避免死循环
   */
  private _setDeformerObjectsCoords(deformer: EditorDeformer, skipSelfDot = false) {
    const vizpath = this.vizpath;
    if (!vizpath) return;

    const { dot, nodeObject, curveDot, curveBar } = deformer;

    // 设置变换器位置
    if (!skipSelfDot) curveDot.set(vizpath.calcAbsolutePosition(dot)).setCoords();

    // 变换器与中心点相对角度固定
    const groupMatrix = nodeObject.group?.calcOwnMatrix() ?? [1, 0, 0, 1, 0, 0];
    const nodeCenter = fabric.util.transformPoint(nodeObject.getCenterPoint(), groupMatrix);
    const pointCenter = curveDot.getCenterPoint();

    // 角度保持和路径节点相向
    curveDot.set({
      angle:
        90 +
        (Math.atan2(pointCenter.y - nodeCenter.y, pointCenter.x - nodeCenter.x) * 180) / Math.PI,
    });

    // 更新连接线连线位置
    curveBar.set({ x1: nodeCenter.x, y1: nodeCenter.y });
    curveBar.set({ x2: curveDot.left, y2: curveDot.top });
    curveBar.setCoords();
  }

  /**
   * 初始路径节点
   */
  private _renderPathNodes() {
    const canvas = this.canvas;
    if (!canvas) return;

    const path = this.vizpath;
    if (!path) return;

    // 初始路径路径节点
    const objects: fabric.Object[] = [];
    const objectNodeMap: typeof this.objectNodeMap = new Map();
    const nodeObjectMap: typeof this.nodeObjectMap = new Map();

    const vizpath = this.vizpath;
    if (!vizpath) return { objects, objectNodeMap, nodeObjectMap };

    vizpath.segments.forEach((segment) => {
      segment.forEach((item) => {
        const { node } = item;
        if (!node) return;
        if (nodeObjectMap.has(item)) return;

        const reuseObject = this.nodeObjectMap.get(item);
        const object = this._createNodeObject(reuseObject);
        object.set(vizpath.calcAbsolutePosition(node)).setCoords();
        objects.push(object);
        objectNodeMap.set(object, item);
        nodeObjectMap.set(item, object);
      });
    });

    fabricOnceRender(canvas, () => {
      const oldObjectSet = new Set<fabric.Object>(this.nodes);
      const baseIndex = canvas._objects.indexOf(vizpath.path) + 1;
      // 添加新对象并重新建立映射关系
      objects.forEach((object, idx) => {
        if (canvas.contains(object)) {
          canvas.moveTo(object, baseIndex + idx);
          oldObjectSet.delete(object);
        } else {
          canvas.insertAt(object, baseIndex + idx, false);
        }
      });
      // 移除旧的无用对象
      canvas.remove(...oldObjectSet.values());

      this.nodes = objects;

      this.objectNodeMap.clear();
      this.objectNodeMap = objectNodeMap;

      this.nodeObjectMap.clear();
      this.nodeObjectMap = nodeObjectMap;
    });
  }

  /**
   * 生成当前路径变换器缓存
   */
  private _getLastestPathDeformerCache() {
    const caches: EditorDeformerCache[] = [];

    const vizpath = this.vizpath;
    if (!vizpath) return caches;

    vizpath.segments.forEach((segment) => {
      segment.forEach((node) => {
        Object.entries(node.deformers ?? {}).forEach(([direction, dot]) => {
          // 贝塞尔二阶曲线的变换点需要做特殊处理
          const isQuadraticCurve =
            node.instruction[0] === 'Q' ||
            (node.instruction[0] === 'M' && node.previousSibling?.instruction[0] === 'Q');
          if (node.previousSiblingNode && isQuadraticCurve) {
            const preDeformer = caches[caches.length - 1];
            if (
              preDeformer &&
              preDeformer.node === node.previousSiblingNode &&
              preDeformer.type === 'pre'
            ) {
              caches.push({
                type: 'next' as const,
                dot,
                node: node.previousSiblingNode!,
                symmetric: 'entire' as const,
              });
              return;
            }
          }

          caches.push({
            type: direction as 'pre' | 'next',
            dot,
            node,
            symmetric: 'entire' as const,
          });
        });
      });
    });

    return caches;
  }

  /**
   * 合并新路径变换器缓存以获取正确的缓存数据
   */
  private _mergeDeformCaches(caches: EditorDeformerCache[]) {
    this.deformerCaches.forEach((cache) => {
      if (!this.nodeObjectMap.has(cache.node)) return;
      const newCache = caches.find((item) => item.node === cache.node && item.dot === cache.dot);
      if (newCache) {
        newCache.type = cache.type;
        newCache.symmetric = cache.symmetric;
      }
    });
    this.deformerCaches = caches;
    return this.deformerCaches;
  }

  /**
   * 渲染变换器列表
   */
  private _renderAllDeformers() {
    const vizpath = this.vizpath;
    if (!vizpath) return;

    const canvas = this.canvas;
    if (!canvas) return;

    // 创建新的路径曲线变换器
    const deformers: EditorDeformer[] = [];

    this.deformerCaches = this._mergeDeformCaches(this._getLastestPathDeformerCache());
    this.deformerCaches.forEach(({ node, dot, type, symmetric }) => {
      const reuseDeformer = this.deformers.find((i) => i.type === type && i.node === node);
      const deformer = {
        type,
        dot,
        node,
        nodeObject: this.nodeObjectMap.get(node)!,
        curveDot: this._createCurveDotObject(reuseDeformer?.curveDot),
        curveBar: this._createCurveBarLine(reuseDeformer?.curveBar),
        symmetric,
      };
      this._setDeformerObjectsCoords(deformer);
      deformers.push(deformer);
    });

    fabricOnceRender(canvas, () => {
      const oldObjectSet = new Set<fabric.Object | fabric.Line>(
        this.deformers.map((i) => [i.curveDot, i.curveBar]).flat(2),
      );
      // 添加新的画布元素
      const baseIndex = canvas._objects.indexOf(vizpath.path) + 1;
      deformers.forEach((i, idx) => {
        if (canvas.contains(i.curveBar)) {
          canvas.moveTo(i.curveBar, baseIndex + idx);
          oldObjectSet.delete(i.curveBar);
        } else {
          canvas.insertAt(i.curveBar, baseIndex + idx, false);
        }
      });
      deformers.forEach((i, idx) => {
        if (canvas.contains(i.curveDot)) {
          canvas.moveTo(i.curveDot, baseIndex + deformers.length + idx);
          oldObjectSet.delete(i.curveDot);
        } else {
          canvas.insertAt(i.curveDot, baseIndex + deformers.length + idx, false);
        }
      });
      // 移除旧的无用对象
      canvas.remove(...oldObjectSet.values());
      oldObjectSet.clear();
    });

    this.deformers = deformers;
  }

  /**
   * 申请创建变换器，会缓存配置，并在每一次渲染变换器的时候优先考虑配置来生成新的变换器列表
   */
  requestCreateDeformers(...cache: EditorDeformerCache[]) {
    this._mergeDeformCaches([...this.deformerCaches, ...cache]);
  }

  /**
   * 初始节点选择事件
   */
  private _initSelectEvents() {
    const canvas = this.canvas;
    if (!canvas) return;
    const handler = () => () => {
      this.focus(...canvas.getActiveObjects());
    };

    this.events.canvas.on('selection:created', handler());
    this.events.canvas.on('selection:updated', handler());
    this.events.canvas.on('selection:cleared', handler());

    // 选中路径段时自动选中路线段内的所有指令路径节点
    // this.events.canvas.on('mouse:dblclick', (e) => {
    //   if (e.target && e.target[VizPathEditor.symbol]) return;

    //   const paths = this.vizpath?.paths ?? [];
    //   let focusPath: Path | undefined;
    //   for (let i = paths.length - 1; i >= 0; i--) {
    //     const path = paths[i];
    //     if (path.containsPoint(e.pointer)) {
    //       focusPath = path;
    //       break;
    //     }
    //   }
    //   if (focusPath) {
    //     this.focus(
    //       ...this.nodes.filter((node) => this.objectNodeMap.get(node)!.path === focusPath),
    //     );
    //   }
    // });
  }

  /**
   * 初始路径点添加事件
   */
  private _initAddEvents() {
    const canvas = this.canvas;
    if (!canvas) return;

    this.events.canvas.on('mouse:down:before', (event) => {
      if (!this.isEnable('add')) return;

      const vizpath = this.vizpath;
      if (!vizpath) return;

      const { pointer } = event;
      if (!pointer) return;

      let newNodeObject: fabric.Object | undefined;

      // 路径拼接
      if (event.target && event.target[VizPathEditor.symbol]) {
        const isSingleNodeActived = this.activeNodes.length === 1;
        if (isSingleNodeActived && event.target[VizPathEditor.symbol] === EditorObjectID.NODE) {
          newNodeObject = this.link(this.activeNodes[0], event.target);
        }
      }
      // 新增节点
      else {
        const coord = calcCanvasCoord(canvas, pointer);
        newNodeObject = this.add({ left: coord.x, top: coord.y });
      }

      // 新增成功，设置当前点为变换中
      if (newNodeObject) {
        this.currentConvertNodeObject = newNodeObject;
      }
    });
  }

  /**
   * 初始路径节点删除事件
   */
  private _initDeleteEvents() {
    this.events.canvas.on('mouse:down', (event) => {
      if (!this.isEnable('delete')) return;

      if (
        event.target?.[VizPathEditor.symbol] === EditorObjectID.NODE ||
        event.target?.[VizPathEditor.symbol] === EditorObjectID.CURVE_DOT
      ) {
        this.remove(event.target);
      }
    });
  }

  /**
   * 初始路径指令转换事件
   */
  private _initConvertEvents() {
    const canvas = this.canvas;
    if (!canvas) return;

    this.events.canvas.on('mouse:down', (event) => {
      const vizpath = this.vizpath;
      if (!vizpath) return;

      if (!this.currentConvertNodeObject) {
        if (!this.isEnable('convert')) return;
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
      const vizpath = this.vizpath;
      if (!vizpath) return;

      const target = this.currentConvertNodeObject;
      if (!target) return;

      const { pointer } = event;
      if (!pointer) return;

      // 如果鼠标还在点上不触发控制曲线作用，当移出后才触发，避免触发敏感
      if (target.containsPoint(pointer)) return;

      const coord = calcCanvasCoord(canvas, pointer);

      const targetNode = this.objectNodeMap.get(target)!;
      const neighboringNodes = vizpath.getNeighboringNodes(targetNode);

      // 获取可转换点，如果无法转换了则先转变为直线再提取转换点
      let convertibleNodes = Object.entries(vizpath.getConvertibleNodes(targetNode));
      if (convertibleNodes.length === 0) {
        vizpath.degrade(targetNode, 'both');
        convertibleNodes = Object.entries(vizpath.getConvertibleNodes(targetNode));
      }

      const position = vizpath.calcRelativeCoord({ left: coord.x, top: coord.y });
      const oppositePosition = vizpath.calcRelativeCoord({
        left: target.left! - (coord.x - target.left!),
        top: target.top! - (coord.y - target.top!),
      });

      // 根据夹角大小排序，夹角越小意味鼠标越接近
      if (convertibleNodes.length > 1) {
        convertibleNodes.sort((a, b) => {
          return (
            calcCoordsAngle(position, targetNode.node!, neighboringNodes[a[0]]!.node!) -
            calcCoordsAngle(position, targetNode.node!, neighboringNodes[b[0]]!.node!)
          );
        });
      }

      this.rerender(() => {
        vizpath.upgrade(targetNode, 'both');

        const coords =
          convertibleNodes.length === 1
            ? [oppositePosition, position]
            : [position, oppositePosition];

        const list = vizpath.getNeighboringCurveDots(targetNode);

        // this.requestCreateDeformers(
        //   {
        //     type: 'pre',
        //     dot:
        //       list.find((i) => i.position === 'cur' && i.direction === 'pre') ??
        //       list.find((i) => i.position === 'pre' && i.direction === 'next') ??
        //       vizpath.toRCoord({ x: 0, y: 0 }),
        //     node: targetNode,
        //     symmetric: 'entire',
        //   },
        //   {
        //     type: 'next',
        //     node: targetNode,
        //     symmetric: 'entire',
        //   },
        // );
        // // 非闭合路径给端点添加虚拟变换器
        // if (!vizpath.isClosedSegment(targetNode.segment) && targetNode.deformers) {
        //   if (
        //     targetNode === targetNode.segment[0] &&
        //     !targetNode.deformers.pre &&
        //     targetNode.deformers.next
        //   ) {
        //     vizpath.addNodeDeformer(targetNode, 'pre', {
        //       x: targetNode.node!.x - (targetNode.deformers.next.x - targetNode.node!.x),
        //       y: targetNode.node!.y - (targetNode.deformers.next.y - targetNode.node!.y),
        //     });
        //   }

        //   if (
        //     targetNode === targetNode.segment[targetNode.segment.length - 1] &&
        //     !targetNode.deformers.next &&
        //     targetNode.deformers.pre
        //   ) {
        //     vizpath.addNodeDeformer(targetNode, 'next', {
        //       x: targetNode.node!.x - (targetNode.deformers.pre.x - targetNode.node!.x),
        //       y: targetNode.node!.y - (targetNode.deformers.pre.y - targetNode.node!.y),
        //     });
        //   }
        // }

        // 设置控制点的位置
        // if (targetNode.deformers) {
        //   Object.keys(targetNode.deformers).forEach((direction, index) => {
        //     const coord = (
        //       convertibleNodes.length === 1
        //         ? [oppositePosition, position]
        //         : [position, oppositePosition]
        //     )[index];
        //     targetNode.deformers![direction].set(coord.x, coord.y);
        //   });
        // }
      });

      const targetCurveDot = this.deformers.find((i) => {
        return i.node === targetNode && i.type !== convertibleNodes[0]?.[0];
      });
      if (targetCurveDot) {
        fireMouseUpAndSelect(targetCurveDot.curveDot);
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
    const vizpath = this.vizpath;
    if (!vizpath) return;

    const pathNode = this.objectNodeMap.get(object);
    if (!pathNode) return;

    const { node } = pathNode;
    if (!node) return;

    const { left, top, scaleX = 1, scaleY = 1, angle = 0 } = options;

    // 节点位置更新
    const oldCoord = { x: node.x, y: node.y };
    const newCoord = vizpath.calcRelativeCoord({ left, top });
    node.set(newCoord.x, newCoord.y);

    // 曲线变换器跟随变化
    followCurveDots.forEach((curveDot) => {
      if (!curveDot) return;

      const relativeDiff = transform(
        {
          x: curveDot.x - newCoord.x,
          y: curveDot.y - newCoord.y,
        },
        [
          { scale: { x: scaleX, y: scaleY } },
          { rotate: angle },
          {
            translate: {
              x: newCoord.x - oldCoord.x,
              y: newCoord.y - oldCoord.y,
            },
          },
        ],
      );
      curveDot.set(newCoord.x + relativeDiff.x, newCoord.y + relativeDiff.y);

      // 更新画布对象
      const deformer = this.deformers.find((i) => i.dot === curveDot);
      if (!deformer) return;

      this._setDeformerObjectsCoords(deformer);
    });

    object.canvas?.requestRenderAll();
  }

  /**
   * 注册单个路径节点的响应变化监听
   */
  private _registerNodeObjectObserver(object: fabric.Object) {
    this._observer = {
      target: object,
      unobserve: observe(object, ['left', 'top'], ({ left, top }) => {
        const followCurveDots: RCoord[] = [];
        const pathNode = this.objectNodeMap.get(object)!;

        this.deformers?.forEach(({ node, dot }) => {
          if (node === pathNode) {
            followCurveDots.push(dot);
          }
        });

        this._transform(object, { left: left!, top: top! }, followCurveDots);
      }),
    };
  }

  /**
   * 注册多个路径节点形成的组的响应变化监听
   */
  private _registerNodeSelectionObserver(group: fabric.ActiveSelection) {
    const initialObjectCount = group._objects.length;
    this._observer = {
      target: group,
      unobserve: observe(
        group,
        ['left', 'top', 'angle', 'scaleX', 'scaleY'],
        (newValue, oldValue = newValue) => {
          if (!group.canvas) return;
          if (group._objects.length !== initialObjectCount) return;
          const hadFollowedCoords = new Set<RCoord>([]);
          for (const object of group._objects as fabric.Object[]) {
            const followCurveDots: RCoord[] = [];
            const pathNode = this.objectNodeMap.get(object)!;
            const deformers = this.vizpath?.getNeighboringCurveDots(pathNode) ?? [];
            deformers?.forEach(({ position, direction, from }) => {
              const coord = from.deformers?.[direction];
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
        },
      ),
    };
  }

  /**
   * 注册单个变化点的响应变化监听
   */
  private _registerCurveDotObjectObserver(object: fabric.Object) {
    const deformer = this.deformers.find((item) => item.curveDot === object);
    if (!deformer) return;

    const vizpath = this.vizpath;
    if (!vizpath) return;

    this._observer = {
      target: object,
      unobserve: observe(object, ['left', 'top'], ({ left, top }) => {
        const coord = vizpath.calcRelativeCoord({ left: left!, top: top! });
        deformer.dot.set(coord.x, coord.y);

        this._setDeformerObjectsCoords(deformer, /* skipSelfDot */ true);

        // 对向变换器同步操作
        if (deformer.symmetric !== 'none') {
          const opositeDeformer = this.getOppositeDeformer(object);
          if (opositeDeformer) {
            const nodeCoord = deformer.node.node!;
            // 旧镜像曲线变换器到路径节点的距离
            const d = calcCoordsDistance(opositeDeformer.dot, nodeCoord);
            // 新镜像曲线变换器到路径节点的距离
            const new_d = calcCoordsDistance(
              {
                x: nodeCoord.x - (coord.x - nodeCoord.x),
                y: nodeCoord.y - (coord.y - nodeCoord.y),
              },
              nodeCoord,
            );
            const scale = deformer.symmetric === 'entire' ? 1 : d / new_d;
            opositeDeformer.dot.set(
              nodeCoord.x - (coord.x - nodeCoord.x) * scale,
              nodeCoord.y - (coord.y - nodeCoord.y) * scale,
            );
            this._setDeformerObjectsCoords(opositeDeformer);
          }
        }
      }),
    };
  }

  /**
   * 初始活跃对象变换观测者，当元素变换时同步响应路径变化
   */
  private _registerActiveObjectsObserver() {
    // 清除旧的观察者
    this._observer?.unobserve();
    this._observer = null;

    const activeObject = this.canvas?.getActiveObject();
    if (!activeObject) return;

    if (activeObject.type === 'activeSelection') {
      this._registerNodeSelectionObserver(activeObject as fabric.ActiveSelection);
    } else if (activeObject[VizPathEditor.symbol] === EditorObjectID.NODE) {
      this._registerNodeObjectObserver(activeObject);
    } else if (activeObject[VizPathEditor.symbol] === EditorObjectID.CURVE_DOT) {
      this._registerCurveDotObjectObserver(activeObject);
    }
  }

  /**
   * 获取相对控制
   */
  getOppositeDeformer(object: fabric.Object) {
    const deformer = this.deformers.find((dot) => dot.curveDot === object);
    if (!deformer) return;

    return this.deformers.find((dot) => {
      const opposite = { pre: 'next', next: 'pre' }[deformer.type];
      return dot.type === opposite && dot.node === deformer.node;
    });
  }

  /**
   * 选中路径节点或变换器对象
   * @param selectedObjects 目标对象列表
   */
  focus(...selectedObjects: fabric.Object[]) {
    const canvas = this.canvas;
    if (!canvas) return;

    if (this._lockFocus) return;
    this._lockFocus = true;

    // 提取有效活跃元素
    const focusNodes: fabric.Object[] = [];
    const focusCurveDotPoints: fabric.Object[] = [];
    selectedObjects.forEach((object) => {
      switch (object[VizPathEditor.symbol]) {
        case EditorObjectID.NODE:
          if (this.objectNodeMap.has(object)) focusNodes.push(object);
          break;
        case EditorObjectID.CURVE_DOT:
          if (this.deformers.find((i) => i.curveDot === object)) {
            focusCurveDotPoints.push(object);
          }
          break;
        default:
          break;
      }
    });

    // 取消当前元素选中态
    canvas.discardActiveObject();
    if (this.activePoint || this.activeNodes.length) {
      this.events.fire('deselected', this.activeNodes, this.activePoint);
    }

    // 只要包含路径节点则只处理聚焦路径节点逻辑
    if (focusNodes.length) {
      this.activeNodes = focusNodes;
      this.activePoint = null;
      // 是否只选中单一路径节点
      if (focusNodes.length === 1) {
        const focusNode = focusNodes[0];
        canvas.setActiveObject(focusNode);
      }
      // 多选则成组选择
      else if (focusNodes.length > 1) {
        const activeSelection = new fabric.ActiveSelection(focusNodes, {
          canvas,
          lockScalingFlip: true,
          originX: 'center',
          originY: 'center',
        });
        if (activeSelection.lockRotation) {
          activeSelection.setControlVisible('mtr', false);
        }
        canvas.setActiveObject(activeSelection);
      }
    }
    // 考虑是否只有一个曲线变换器聚焦情况，不允许多曲线变换器同时聚焦
    else if (focusCurveDotPoints.length === 1) {
      const { nodeObject } = this.deformers.find((i) => i.curveDot === focusCurveDotPoints[0])!;
      this.activeNodes = [nodeObject];
      this.activePoint = focusCurveDotPoints[0];
      canvas.setActiveObject(this.activePoint);
    }
    // 如果都没选中
    else {
      this.activeNodes = [];
      this.activePoint = null;
    }

    // 绘制曲线变换器及其连接线
    this._renderAllDeformers();

    // 注册活跃对象观测者
    this._registerActiveObjectsObserver();

    this.events.fire('selected', this.activeNodes, this.activePoint);

    this._lockFocus = false;
  }

  /**
   * 取消选中当前活跃路径节点或变换器对象
   */
  blur() {
    this.focus();
  }

  /**
   * 在当前路径基础上绘制全新的路径片段
   * @param data 路径片段数据
   *
   * @example
   *
   * draw('M 100 100 L 200 200 Z');
   *
   * @note
   *
   * 注意：绘制的路径数据会受到路径当前的变换影响
   */
  draw(data: string) {
    const vizpath = this.vizpath;
    if (vizpath)
      this.rerender(() => {
        vizpath.addSegment(data);
      });
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
   * @param autoLink 是否自动与活跃元素连接，注意：仅当活跃元素只有1个且为端点节点有效
   */
  add(position: { left: number; top: number }, autoLink = true) {
    const vizpath = this.vizpath;
    if (!vizpath) return;

    const coord = vizpath.calcRelativeCoord(position);
    const node = this.rerender((activeNodes) => {
      if (autoLink && activeNodes.length === 1) {
        const node = activeNodes[0];

        const pathNode = this.objectNodeMap.get(node);
        if (!pathNode) return;

        const { segment } = pathNode;

        // 如果当前节点已闭合或非端点，无法实现节点添加
        if (vizpath.isClosedSegment(segment)) return;

        // 如果是起始点
        if (pathNode === segment[0]) {
          const preDeformer = pathNode.deformers?.pre;
          const newNode = vizpath.insertBefore(pathNode, [InstructionType.START, coord.x, coord.y]);
          if (preDeformer) {
            vizpath.replace(pathNode, [
              InstructionType.QUADRATIC_CURCE,
              preDeformer.x,
              preDeformer.y,
              pathNode.node!.x,
              pathNode.node!.y,
            ]);
          }
          return newNode;
        }
        // 如果是末尾端点
        else if (pathNode === segment[segment.length - 1]) {
          const nextDeformer = pathNode.deformers?.next;
          if (nextDeformer) {
            return vizpath.insertAfter(pathNode, [
              InstructionType.QUADRATIC_CURCE,
              nextDeformer.x,
              nextDeformer.y,
              coord.x,
              coord.y,
            ]);
          } else {
            return vizpath.insertAfter(pathNode, [InstructionType.LINE, coord.x, coord.y]);
          }
        }
      } else {
        return vizpath.addSegment(`M ${coord.x} ${coord.y}`)[0];
      }
    });
    if (!node) return;

    const object = this.nodeObjectMap.get(node);
    if (!object) return;

    return object;
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
    const canvas = this.canvas;
    if (!canvas) return;

    const vizpath = this.vizpath;
    if (!vizpath) return;

    // 触发鼠标举起事件，避免后续拖动操作生效
    fireFabricMouseUp(canvas);

    const removeQueue: PathNode[] = [];
    const degradeQueue: { node: PathNode; direction?: 'pre' | 'next' }[] = [];

    const collect = (object: fabric.Object) => {
      if (object[VizPathEditor.symbol] === EditorObjectID.NODE) {
        const node = this.objectNodeMap.get(object)!;
        if (node) removeQueue.push(node);
      } else if (object[VizPathEditor.symbol] === EditorObjectID.CURVE_DOT) {
        const deformer = this.deformers.find((i) => i.curveDot === object)!;
        if (deformer) degradeQueue.push({ node: deformer.node, direction: deformer.type });
      }
    };

    objects.forEach((object) => {
      if (!object) return;
      if (object.type === 'activeSelection') {
        (object as fabric.ActiveSelection).forEachObject(collect);
      } else collect(object);
    });

    if (degradeQueue.length) {
      this.rerender(() => {
        degradeQueue.forEach(({ node, direction }) => {
          vizpath.degrade(node, direction);
        });
      });
    }

    if (removeQueue.length) {
      this.rerender(() => {
        vizpath.remove(...removeQueue);
      });
    }
  }

  /**
   * 路径升级
   *
   * @note
   *
   * 直线先升级到二阶，再从二阶曲线升级到三阶曲线；
   */
  upgrade(object: fabric.Object, direction: 'pre' | 'next' | 'both' = 'both', highest = false) {
    const vizpath = this.vizpath;
    if (!vizpath) return;

    const pathNode = this.objectNodeMap.get(object);
    if (!pathNode) return;

    this.rerender(() => {
      vizpath.upgrade(pathNode, direction, highest);
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
    const vizpath = this.vizpath;
    if (!vizpath) return;

    const pathNode = this.objectNodeMap.get(object);
    if (!pathNode) return;

    this.rerender(() => {
      vizpath.degrade(pathNode, direction, lowest);
    });
  }

  /**
   * 节点连线
   * @param object1 起点
   * @param object2 终点
   * @param curvable 连线是否可弯曲的，如是则会根据起点的控制器自动计算
   * @returns 拼接点
   */
  link(object1: fabric.Object, object2: fabric.Object, curvable = true) {
    const vizpath = this.vizpath;
    if (!vizpath) return;

    const startNode = this.objectNodeMap.get(object1);
    const endNode = this.objectNodeMap.get(object2);
    if (!startNode || !endNode) return;

    const curvePoints = curvable
      ? ([
          startNode === startNode.segment[0] ? startNode.deformers?.pre : startNode.deformers?.next,
        ].filter(Boolean) as Coord[])
      : [];
    const { action, node } = this.rerender(() =>
      vizpath.joinSegment(startNode, endNode, curvePoints),
    );
    if (!node) return;

    const object = this.nodeObjectMap.get(node);
    if (!object) return;

    this.events.fire({ close: 'closed', join: 'joined' }[action], object);
    return object;
  }

  /**
   * 移动操作对象节点(路径节点/多选后的节点组/变换器)
   * @param left 左偏移
   * @param top 上偏移
   * @param relative 基于当前对象的偏移值进行增量变换，默认为false
   * @param target 操作对象，默认为选中对象，其他对象设置后将成为选中对象
   */
  move(
    left: number,
    top: number,
    relative = false,
    target: fabric.Object | undefined = this._observer?.target,
  ) {
    if (target && target !== this._observer?.target) this.focus(target);
    else if (!target) this.focus(...this.nodes);

    const observerTarget = this._observer?.target;
    if (!observerTarget) return;

    if (relative) {
      observerTarget.set({ left: observerTarget.left! + left, top: observerTarget.top! + top });
    } else {
      observerTarget.set({ left, top });
    }
  }

  /**
   * 旋转操作对象(仅对多选后的节点组有效)
   * @param angle 旋转角度
   * @param relative 基于当前对象的角度进行增量变换，默认为false
   * @param target 操作对象，默认为选中对象，其他对象设置后将成为选中对象
   */
  rotate(
    angle: number,
    relative = false,
    target: fabric.Object | undefined = this._observer?.target,
  ) {
    if (target && target !== this._observer?.target) this.focus(target);
    else if (!target) this.focus(...this.nodes);

    const observerTarget = this._observer?.target;
    if (!observerTarget || observerTarget.type !== 'activeSelection') return;

    if (relative) {
      observerTarget.set({ angle: observerTarget.angle! + angle });
    } else {
      observerTarget.set({ angle });
    }
  }

  /**
   * 缩放操作对象(仅对多选后的节点组有效)
   * @param scaleX 水平方向缩放
   * @param scaleY 垂直方向缩放
   * @param relative 基于当前对象的缩放进行增量变换，默认为false
   * @param target 操作对象，默认为选中对象，其他对象设置后将成为选中对象
   */
  scale(
    scaleX: number,
    scaleY: number,
    relative = false,
    target: fabric.Object | undefined = this._observer?.target,
  ) {
    if (target && target !== this._observer?.target) this.focus(target);
    else if (!target) this.focus(...this.nodes);

    const observerTarget = this._observer?.target;
    if (!observerTarget || observerTarget.type !== 'activeSelection') return;

    if (relative) {
      observerTarget.set({
        scaleX: observerTarget.scaleX! * scaleX,
        scaleY: observerTarget.scaleY! * scaleY,
      });
    } else {
      observerTarget.set({ scaleX, scaleY });
    }
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
  requestDisableFunction(functionName: 'add' | 'delete' | 'convert') {
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
   * 判断功能是否生效
   */
  isEnable(functionName: 'add' | 'delete' | 'convert') {
    if (this.get('mode') !== functionName) return false;
    if (this.disabledFunctionTokens[functionName]?.length) return false;
    return true;
  }

  /**
   * 添加功能增强模块
   * @this
   */
  use(module: VizPathModule) {
    if (this.canvas) {
      console.warn('(VizPath Warning) Make sure to use the module before the canvas is mounted.');
      return this;
    }

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
   * 挂载编辑器实现路径可视化，会一并加载增强模块
   * @param canvas fabric.Canvas对象
   * @this
   */
  async mount(canvas: fabric.Canvas) {
    // 在画布中建立编辑器关联，让内部vizpath对象可直接找到编辑器对象并进入编辑，避免编辑器对象层层传递
    canvas[VizPathEditor.symbol] = this;
    // 加载默认内置模块 —— 路径编辑器
    this.canvas = canvas;
    this.events.mount(this.canvas);

    // 初始节点选择事件
    this._initSelectEvents();

    // 初始节点添加事件
    this._initAddEvents();

    // 初始节点删除事件
    this._initDeleteEvents();

    // 初始节点变换事件
    this._initConvertEvents();

    // 加载其他增强模块
    await new Promise<void>((resolve) => {
      let next = 0;

      const loadModule = async () => {
        const module = this.modules[next];
        if (!module) {
          resolve();
          return;
        }

        // 模块加载失败不能影响正常流程进行
        await module.__load(this).catch((err) => {
          console.error(
            `(VizPath Error): An error occurred while loading the module named '${module.name}'!`,
          );
          console.error(err);
        });

        next++;
        loadModule();
      };

      loadModule();
    });

    return this;
  }

  /**
   * 取消画布挂载，但不会清空已添加的模块，可以直接保留模块重新挂载在另一画布上
   */
  async unmounted() {
    if (this.vizpath) this.leaveEditing();

    // 卸载全部增强模块
    await Promise.all(
      this.modules.map((module) => {
        // 模块卸载失败不能影响正常流程进
        module.__unload(this).catch((err) => {
          console.error(
            `(VizPath Error): An error occurred while unloading the module named '${module.name}'!`,
          );
          console.error(err);
        });
      }),
    );
    // 不清空模块，取消挂载仅销毁和画布关联，以便于挂载到另一画布，销毁（destroy）才会完全释放模块数据
    // this.modules = [];

    // 释放事件监听
    this.events.clear();

    // 释放画布
    delete this.canvas?.[VizPathEditor.symbol];
    this.canvas = null;
  }

  /**
   * 销毁编辑器，取消挂载并释放内存
   */
  async destroy() {
    await this.unmounted();
    this.modules = [];
  }
}

export default VizPathEditor;
