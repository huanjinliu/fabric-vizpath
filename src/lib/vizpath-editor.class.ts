import type { ThemeDecorator } from './modules/editor-theme/index.class';
import VizPathDOMEvent from './vizpath-dom-event.class';
import type VizPathModule from './vizpath-module.class';
import VizPathTheme from './vizpath-theme.class';
import { fabric } from 'fabric';
import { InstructionType, type Instruction, type PathNode, type RCoord } from './vizpath.class';
import type { VizPath } from './vizpath.class';
import {
  calcCoordsAngle,
  calcCoordsDistance,
  deepIterateGroup,
  fabricOnceRender,
  fireFabricMouseUp,
  observe,
  parsePathJSON,
  transform,
} from '@utils';

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
   * delete 删除模式 - 鼠标点击节点、变换点将直接删除
   *
   * convert 转换模式 - 鼠标点击节点无法移动，但可以通过拖拽实现节点转换
   *
   * @default 'move'
   */
  mode: `${Mode}`;
  /**
   * 是否开启强制曲线变换点对称
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

type EditorDeformer = {
  type: 'pre' | 'next';
  node: PathNode;
  dot: RCoord;
  nodeObject: fabric.Object;
  curveDot: fabric.Object;
  curveBar: fabric.Line;
};

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
      dotSymmetricMode: 'auto',
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
    added: (node: fabric.Object) => void;
    closed: (node: fabric.Object) => void;
    removed: (nodes: fabric.Object[]) => void;
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

  /** 路径曲线变换点列表 */
  deformers: EditorDeformer[] = [];

  /** 元素画布对象 与 路径节点对象 映射 */
  objectNodeMap: Map<fabric.Object, PathNode> = new Map([]);

  /** 路径节点对象 与 元素画布对象 映射 */
  nodeObjectMap: Map<PathNode, fabric.Object> = new Map([]);

  /** 当前活跃的路径节点画布对象列表 */
  activeNodes: fabric.Object[] = [];

  /** 当前活跃的曲线变换点画布对象 */
  activePoint: fabric.Object | null = null;

  /** dotSymmetricMode为auto的情况下，会采用以下变换模式 */
  dotSymmetricAutoMode: 'none' | 'angle' | 'entire' = 'none';

  /** 当前转换的路径节点 */
  currentConvertNodeObject: fabric.Object | null = null;

  /** 记录原路径对象配置，在退出编辑时重置路径对象配置 */
  private _originPathOptions: fabric.IPathOptions | null = null;

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

  /* ---------------------------- 其他内部属性 ---------------------------- */

  /** 记录当前活跃对象观察者 */
  private _observer: { target: fabric.Object; unobserve: () => void } | null = null;

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
  async enterEditing(vizpath: VizPath) {
    // 如果未挂载且路径对象未添加到任何画布，抛出错误
    if (!this.canvas && !vizpath.path.canvas) {
      throw Error(
        '(VizPath Error) You must mount the canvas or add a path to fabric.canvas before continuing!',
      );
    }
    // fabric.canvas画布不匹配，抛出错误
    else if (this.canvas && vizpath.path.canvas && this.canvas !== vizpath.path.canvas) {
      throw Error(
        '(VizPath Error) The fabric.canvas editor must be mounted in an identical manner to the canvas where the path was added!',
      );
    }
    // 如果编辑器未挂载画布则先挂载到路径对象中的画布中
    else if (!this.canvas) await this.mount(vizpath.path.canvas!);
    // 如果路径对象未加入画布则先加入当前编辑器挂载画布
    else if (!vizpath.path.canvas) this.canvas.add(vizpath.path);

    await this.leaveEditing();

    this.vizpath = vizpath;

    // 初始路径对象事件
    this._initVizpathEvents();

    // 绘制路径
    this._renderVizPath();

    // 绘制节点操作对象
    this._renderPathNodes();
  }

  /**
   * 退出路径编辑
   */
  async leaveEditing() {
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

    this.dotSymmetricAutoMode = 'none';
    this.currentConvertNodeObject = null;
    this._abandonedPool = {
      nodes: [],
      points: [],
      lines: [],
    };

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
  private _initVizpathEvents() {
    const vizPath = this.vizpath;
    if (!vizPath) return;

    let storeActiveNodes: fabric.Object[] = [];
    let storeActivePoint: fabric.Object | null = null;
    vizPath.events.on('before:update', () => {
      storeActiveNodes = this.activeNodes;
      storeActivePoint = this.activePoint;
      this.blur();
    });

    vizPath.events.on('after:update', () => {
      this._renderPathNodes();
      this._renderDeformers();
      const activeObjects: fabric.Object[] = [];
      storeActiveNodes.forEach((object) => {
        if (this.objectNodeMap.has(object)) {
          activeObjects.push(object);
        }
      });
      if (storeActivePoint) activeObjects.push(storeActivePoint);
      if (activeObjects.length) this.focus(...activeObjects);
      storeActiveNodes.length = 0;
      storeActivePoint = null;
    });
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

    // 加入画布时添加自动响应
    // const onAddedNode = () => {
    //   const position = vizpath.calcAbsolutePosition(node, vizpath.coordNodeMap.get(node)!.path);
    //   if (object.group) {
    //     const relativePosition = vizpath.calcRelativeCoord(position, object.group);
    //     object
    //       .set({
    //         left: relativePosition.x,
    //         top: relativePosition.y,
    //       })
    //       .setCoords();
    //     object.group.addWithUpdate();
    //   } else {
    //     object.set(position).setCoords();
    //   }
    // };

    // // 移除时结束自动响应
    // const onRemovedNode = () => {
    //   object.off('added', onAddedNode);
    //   object.off('removed', onRemovedNode);
    //   this._abandonedPool.nodes.push(object);
    // };

    // object.on('added', onAddedNode);
    // object.on('removed', onRemovedNode);

    return object;
  }

  /**
   * 创建指令曲线变换点
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
   * 创建控制杆连线对象
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
   * 更新控制杆及其变化点的坐标和位置
   * @param deformer 控制点配置
   * @param skipSelfDot 跳过控制点自身的配置，响应式更改中需设置为true，避免死循环
   */
  private _setDeformerObjectsCoords(deformer: EditorDeformer, skipSelfDot = false) {
    const vizpath = this.vizpath;
    if (!vizpath) return;

    const { dot, nodeObject, curveDot, curveBar } = deformer;

    // 设置变换点位置
    if (!skipSelfDot) curveDot.set(vizpath.calcAbsolutePosition(dot)).setCoords();

    // 变换点与中心点相对角度固定
    const nodeCenter = nodeObject.getCenterPoint();
    const pointCenter = curveDot.getCenterPoint();
    curveDot.set({
      angle:
        90 +
        (Math.atan2(pointCenter.y - nodeCenter.y, pointCenter.x - nodeCenter.x) * 180) / Math.PI,
    });

    // 更新控制杆连线位置
    curveBar.set({ x1: nodeObject.left, y1: nodeObject.top });
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
   * 绘制曲线变换点及其控制杆（连线）
   */
  private _renderDeformers() {
    const vizpath = this.vizpath;
    if (!vizpath) return;

    const canvas = this.canvas;
    if (!canvas) return;

    // 创建新的路径曲线变换点
    const deformers: EditorDeformer[] = [];
    const deformerSet = new WeakSet<RCoord>([]);

    // 当前的活跃节点
    const curPathNode =
      this.activeNodes.length === 1 ? this.objectNodeMap.get(this.activeNodes[0]) : undefined;
    if (curPathNode) {
      const neighboringCurveDots = vizpath
        .getNeighboringCurveDots(curPathNode)
        .filter(({ direction, from }) => {
          const node = from.node;
          const point = from.deformers?.[direction];
          if (!node || !point || deformerSet.has(point)) return false;
          deformerSet.add(point);
          return true;
        })
        .map((curveDot) => {
          const { direction, from } = curveDot;
          const nodeObject = this.nodeObjectMap.get(from)!;
          const reuseDeformer = this.deformers.find(
            (i) => i.type === direction && i.node === from && i.nodeObject === nodeObject,
          );
          return {
            ...curveDot,
            nodeObject,
            reuseDeformer,
          };
        });

      // 有复用元素的必须优先处理，避免新的变换点在废弃池中提前使用了复用元素
      neighboringCurveDots.sort((a) => (a.reuseDeformer ? -1 : 1));
      neighboringCurveDots.forEach(({ direction, from, nodeObject, reuseDeformer }) => {
        const curveDot = from.deformers![direction]!;
        const _curveDot = {
          type: direction,
          dot: curveDot,
          node: from,
          nodeObject,
          curveDot: this._createCurveDotObject(reuseDeformer?.curveDot),
          curveBar: this._createCurveBarLine(reuseDeformer?.curveBar),
        };
        this._setDeformerObjectsCoords(_curveDot);
        deformers.push(_curveDot);
      });
    }

    fabricOnceRender(canvas, () => {
      const oldObjectSet = new Set<fabric.Object | fabric.Line>(
        this.deformers.map((i) => [i.curveDot, i.curveBar]).flat(1),
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
   * 初始节点选择事件
   */
  private _initSelectEvents() {
    const canvas = this.canvas;
    if (!canvas) return;

    // 由于focus方法内部也有对元素聚焦失焦的操作，锁定避免循环执行事件监听造成死循环
    let focusing = false;
    const handler = () => {
      if (focusing) return;
      focusing = true;
      this.focus(...canvas.getActiveObjects());
      focusing = false;
    };

    this.events.canvas.on('selection:created', handler);
    this.events.canvas.on('selection:updated', handler);
    this.events.canvas.on('selection:cleared', handler);

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

    // 曲线变换点跟随变化
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
              x: newCoord.x - oldCoord.x,
              y: newCoord.y - oldCoord.y,
            },
          },
          { scale: { x: scaleX, y: scaleY } },
          { rotate: angle },
        ],
      );
      curveDot.set(newCoord.x + relativeDiff.x, newCoord.y + relativeDiff.y);

      // 更新画布对象
      const deformer = this.deformers.find((i) => i.dot === curveDot);
      if (!deformer) return;

      // 创建指令曲线变换点并设置位置
      deformer.curveDot.set(vizpath.calcAbsolutePosition(curveDot)).setCoords();

      // 创建控制杆连线并设置位置
      const startPosition = vizpath.calcAbsolutePosition(node);
      deformer.curveBar.set({ x1: startPosition.left, y1: startPosition.top });
      const endPosition = vizpath.calcAbsolutePosition(curveDot);
      deformer.curveBar.set({ x2: endPosition.left, y2: endPosition.top });
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
        const deformers = this.vizpath?.getNeighboringCurveDots(pathNode) ?? [];
        deformers?.forEach(({ position, direction, from }) => {
          const coord = from.deformers?.[direction];
          if (position !== 'cur' || !coord) return;
          followCurveDots.push(coord);
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
              // 避免重复的曲线变换点跟随更改
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

        // 对向变换点同步操作
        const symmetricMode =
          this.get('dotSymmetricMode') === 'auto'
            ? this.dotSymmetricAutoMode
            : this.get('dotSymmetricMode');
        if (symmetricMode !== 'none') {
          const opositeDeformer = this.getOppositeDeformer(object);
          if (opositeDeformer) {
            const nodeCoord = deformer.node.node!;
            // 旧镜像曲线变换点到路径节点的距离
            const d = calcCoordsDistance(opositeDeformer.dot, nodeCoord);
            // 新镜像曲线变换点到路径节点的距离
            const new_d = calcCoordsDistance(
              {
                x: nodeCoord.x - (coord.x - nodeCoord.x),
                y: nodeCoord.y - (coord.y - nodeCoord.y),
              },
              nodeCoord,
            );
            const scale = symmetricMode === 'entire' ? 1 : d / new_d;
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
    // 重置旧的观察者
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
   * 选中路径节点或变换点对象
   * @param selectedObjects 目标对象列表
   */
  focus(...selectedObjects: fabric.Object[]) {
    const canvas = this.canvas;
    if (!canvas) return;

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

    // 先触发失焦事件
    if (this.activePoint || this.activeNodes.length) {
      this.events.fire('deselected', this.activeNodes, this.activePoint);
    }

    // 只要包含路径节点则只处理聚焦路径节点逻辑
    if (focusNodes.length) {
      // 取消画布选中重新构造只包含路径节点的选中框对象
      canvas.discardActiveObject();
      this.activeNodes = focusNodes;
      this.activePoint = null;
      // 是否只选中单一路径节点
      if (focusNodes.length === 1) {
        const focusNode = focusNodes[0];
        canvas.setActiveObject(focusNode);
        // this._addActivePointObserve(focusNode);
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
        // this._addActiveSelectionObserve(activeSelection);
      }
    }
    // 考虑是否只有一个曲线变换点聚焦情况，不允许多曲线变换点同时聚焦
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
      canvas.discardActiveObject();
    }

    // 绘制曲线变换点及其控制杆
    this._renderDeformers();

    // 注册活跃对象观测者
    this._registerActiveObjectsObserver();

    this.events.fire('selected', this.activeNodes, this.activePoint);

    // 如果当前选中的是变换点需要确定其自动变换的模式
    if (this.activePoint) {
      const deformer = this.deformers.find((i) => i.curveDot === this.activePoint)!;
      const relativeDot = this.getOppositeDeformer(this.activePoint)!;
      if (
        relativeDot &&
        180 - calcCoordsAngle(deformer.dot, deformer.node.node!, relativeDot.dot) <= this.deviation
      ) {
        this.dotSymmetricAutoMode = 'angle';
        if (
          Math.abs(
            calcCoordsDistance(deformer.dot, deformer.node.node!) -
              calcCoordsDistance(deformer.node.node!, relativeDot.dot),
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

  /**
   * 取消选中当前活跃路径节点或变换点对象
   */
  blur() {
    this.focus();
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
    const canvas = this.canvas;
    if (!canvas) return;

    const vizPath = this.vizpath;
    if (!vizPath) return;

    // 触发鼠标举起事件，避免后续拖动操作生效
    fireFabricMouseUp(canvas);

    const removeQueue: { node: PathNode; object: fabric.Object }[] = [];
    const degradeQueue: { node: PathNode; direction?: 'pre' | 'next' }[] = [];

    const collect = (object: fabric.Object) => {
      if (object[VizPathEditor.symbol] === EditorObjectID.NODE) {
        const node = this.objectNodeMap.get(object)!;
        if (node) removeQueue.push({ node, object });
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

    if (removeQueue.length) {
      vizPath.remove(...removeQueue.map((i) => i.node));
    }

    if (degradeQueue.length) {
      degradeQueue.forEach(({ node, direction }) => {
        const object = this.nodeObjectMap.get(node);
        if (object) this.degrade(object, direction);
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
  upgrade(object: fabric.Object, direction: 'pre' | 'next' | 'both' = 'both') {
    const vizpath = this.vizpath;
    if (!vizpath) return;

    const pathNode = this.objectNodeMap.get(object);
    if (!pathNode) return;

    const { instruction, node } = pathNode;

    const { pre, next } = vizpath.getNeighboringInstructions(pathNode, true);

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

      vizpath.replace(pathNode, newInstruction);
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

    const { pre, next } = vizpath.getNeighboringInstructions(pathNode, true);

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

      vizpath.replace(pathNode, instruction);
    });
  }

  /**
   * 移动操作对象节点(路径节点/多选后的节点组/变换点)
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

    // 初始事件
    this._initSelectEvents();

    // this._initClearNodeEvents();
    // this._initAddNodeEvents();
    // this._initConvertNodeEvents();
    // this._initDeleteNodeEvents();

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
