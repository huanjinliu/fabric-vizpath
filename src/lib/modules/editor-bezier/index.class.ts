import { fabric } from 'fabric';
import { v4 as uuid } from 'uuid';
import { Bezier } from 'bezier-js';
import type Vizpath from '../../vizpath.class';
import EditorModule from '../base.class';
import Editor, { EditorSymbolType, Mode } from '../editor/index.class';
import { InstructionType, type Instruction, type PathNode } from 'src/lib';
import {
  calcCanvasCrood,
  curveFromLine,
  curveFromPoint,
  deepIterateGroup,
  splitInstruction,
} from '@utils';
import type { ResponsiveCrood } from '../../vizpath.class';
import EditorUI, { DEFAULT_THEME, type ThemeDecorator } from '../editor-ui/index.class';
import defaultsDeep from 'lodash-es/defaultsDeep';

type EditorBezierOptions = {
  /**
   * 拆分点的UI key值配置
   * @default 'splitDot'
   */
  splitDotKey: string;
  /**
   * 虚拟点的样式key配置
   * @default 'virtualNode'
   */
  virtualNodeKey: string;
  /**
   * 参考线的样式key配置
   * @default 'virtualPath'
   */
  virtualPathKey: string;
  /**
   * 是否禁用路径拆分
   * @default false
   */
  disabledSplit: boolean;
  /**
   * 是否禁用路径拆分点
   * @default false
   */
  disabledSplitDot: boolean;
  /**
   * 是否禁用双击转变路径
   * @default false
   */
  disabledDbclickConvert: boolean;
};

const DEFAULT_OPTIONS: EditorBezierOptions = {
  virtualNodeKey: 'virtualNode',
  virtualPathKey: 'virtualPath',
  splitDotKey: 'splitDot',
  disabledSplit: false,
  disabledSplitDot: false,
  disabledDbclickConvert: false,
};

/**
 * 编辑器曲线化操作模块：1.双击实现指令升降级 2.实现路径选点拆分
 *
 * @note 注意：拆分点的样式需要在UI模块中配置，没配置默认使用UI模块中路径节点的样式
 *
 * @example
 *
 * vizpath
 * .use(new Editor(fabricCanvas))
 * .use(new EditorBezier())
 * .use(new EditorUI<EditorBezierThemeConfigurators>({
 *
 * }))
 */
class EditorBezier extends EditorModule {
  static ID = 'editor-bezier';

  splitDot: fabric.Object | null = null;

  options: EditorBezierOptions;

  constructor(options: Partial<EditorBezierOptions> = {}) {
    super();

    this.options = defaultsDeep(options, DEFAULT_OPTIONS);
  }

  /**
   * 自动降级到直线
   */
  degrade(object: fabric.Object) {
    const editor = this.vizpath?.context.find(Editor);
    if (!editor) return;

    editor.degrade(object, 'both', true);
  }

  /**
   * 自动升级到曲线
   */
  upgrade(object: fabric.Object) {
    const vizpath = this.vizpath;
    if (!vizpath) return;

    const editor = this.vizpath?.context.find(Editor);
    if (!editor) return;

    const pathNode = editor.objectNodeMap.get(object)!;
    const { pre, next } = vizpath.getNeighboringNodes(pathNode);

    if (pre && next) {
      const centerPoint = {
        x: (pre.node!.x + next.node!.x) / 2,
        y: (pre.node!.y + next.node!.y) / 2,
      };
      const preCurvePoint = {
        x: pathNode.node!.x + (pre.node!.x - centerPoint.x),
        y: pathNode.node!.y + (pre.node!.y - centerPoint.y),
      };
      const nextCurvePoint = {
        x: pathNode.node!.x + (next.node!.x - centerPoint.x),
        y: pathNode.node!.y + (next.node!.y - centerPoint.y),
      };
      vizpath.replace(pathNode, [
        InstructionType.QUADRATIC_CURCE,
        preCurvePoint.x,
        preCurvePoint.y,
        pathNode.node!.x,
        pathNode.node!.y,
      ] as Instruction);
      vizpath.replace(next, [
        InstructionType.QUADRATIC_CURCE,
        nextCurvePoint.x,
        nextCurvePoint.y,
        next.node!.x,
        next.node!.y,
      ] as Instruction);
      // const points = [pre, pathNode, next].map((item) => item.node!);
      // // 这里使用quadraticFromPoints，是使三个点组合成曲线路径（点都在曲线上）
      // const splitCurves = this._splitInstruction(
      //   (Bezier.quadraticFromPoints as any)(...points, 0.5).points,
      //   points[1],
      // );
      // const neighboringInstructions = vizpath.getNeighboringInstructions(pathNode);
      // vizpath.replace(
      //   pathNode.instruction[0] === InstructionType.START
      //     ? neighboringInstructions.pre!
      //     : pathNode,
      //   splitCurves.pre,
      // );
      // vizpath.replace(neighboringInstructions.next!, splitCurves.next);
    } else if (pre) {
      const { pre: ppre } = vizpath.getNeighboringNodes(pre);
      if (ppre) {
        const point = curveFromLine(
          pre.curveDots?.pre ? [pre.curveDots.pre, pre.node!] : [ppre!.node!, pre.node!],
          pathNode.node!,
          0.71,
        );
        vizpath.replace(pathNode, [
          InstructionType.QUADRATIC_CURCE,
          point.x,
          point.y,
          pathNode.node!.x,
          pathNode.node!.y,
        ] as Instruction);
      } else {
        const midPoint = curveFromPoint(pre.node!, pathNode.node!);
        vizpath.replace(pathNode, [
          InstructionType.QUADRATIC_CURCE,
          midPoint.x,
          midPoint.y,
          pathNode.node!.x,
          pathNode.node!.y,
        ] as Instruction);
      }
    } else if (next) {
      const { next: nnext } = vizpath.getNeighboringNodes(next);
      if (nnext) {
        const point = curveFromLine(
          next.curveDots?.next ? [next.curveDots.next, next.node!] : [nnext!.node!, next.node!],
          pathNode.node!,
          0.71,
        );
        vizpath.replace(next, [
          InstructionType.QUADRATIC_CURCE,
          point.x,
          point.y,
          next.node!.x,
          next.node!.y,
        ] as Instruction);
      } else {
        const midPoint = curveFromPoint(next.node!, pathNode.node!);
        vizpath.replace(next, [
          InstructionType.QUADRATIC_CURCE,
          midPoint.x,
          midPoint.y,
          next.node!.x,
          next.node!.y,
        ] as Instruction);
      }
    }
  }

  // 创建拆分点
  private _initSpiltDot(vizpath: Vizpath) {
    const ui = vizpath.context.find(EditorUI);
    const splitDotTheme =
      ui?.theme?.[this.options.splitDotKey] ?? ui?.theme?.node ?? DEFAULT_THEME.node;

    let decorated = false;

    const decorator: ThemeDecorator<fabric.Object> = (customObject, callback) => {
      customObject.set({
        name: uuid(),
        // 选中时不出现选中框
        hasBorders: false,
        hasControls: false,
        // 不给选中
        evented: false,
        selectable: false,
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

      if (ui && callback) {
        ui.objectPreRenderCallbackMap.set(customObject, callback);
      }

      decorated = true;

      return customObject;
    };

    let object = splitDotTheme(decorator);
    if (!decorated) object = decorator(object);

    return object;
  }

  // 清除拆分点
  private _destorySplitDot(vizpath: Vizpath) {
    if (!this.splitDot) return;
    const ui = vizpath.context.find(EditorUI);
    ui?.objectPreRenderCallbackMap.delete(this.splitDot);

    this.splitDot.canvas?.remove(this.splitDot);
    this.splitDot = null;
  }

  // 注册双击节点变换事件
  private _initDbclickChangeEvent(vizpath: Vizpath) {
    const editor = vizpath.context.find(Editor);
    if (!editor) return;

    editor.canvas?.on('mouse:dblclick', (event) => {
      const { target } = event;

      if (!target || !editor.nodes.includes(target)) return;

      const curveDots = editor.curveDots.filter((i) => i.node === target);

      if (curveDots.length) this.degrade(target);
      else this.upgrade(target);
    });
  }

  // 注册指令拆分事件
  private _initSplitEvent(vizpath: Vizpath) {
    const editor = vizpath.context.find(Editor);
    if (!editor) return;

    const canvas = editor.canvas;
    if (!canvas) return;

    let touchPath: fabric.Path | undefined;
    let pathNode: PathNode<ResponsiveCrood> | undefined;
    let splitCrood: Crood | undefined;
    let disableAddToken: string | undefined;

    const clean = () => {
      if (pathNode) {
        if (this.splitDot) canvas.remove(this.splitDot);
        pathNode = undefined;
        splitCrood = undefined;
      }

      if (disableAddToken) {
        editor.requestEnableFunction(disableAddToken);
        disableAddToken = undefined;
      }
    };

    editor.addCanvasEvent('mouse:move', (e) => {
      clean();

      if (editor.get('mode') !== Mode.ADD) return;

      if (e.target && e.target[Editor.symbol]) return;

      if (e.target && e.target.type === 'activeSelection') return;

      const pointer = calcCanvasCrood(canvas, e.pointer);

      let minDistance = Infinity;

      editor.paths.forEach(({ segment, pathObject }) => {
        if (!pathObject.containsPoint(e.pointer)) return;

        const { x, y } = editor.calcRelativeCrood(
          {
            left: pointer.x,
            top: pointer.y,
          },
          pathObject,
        );

        const validDistance = Math.max((pathObject.strokeWidth ?? 0) / 2 || 1, 1);

        for (const item of segment) {
          let points: Crood[] = [];

          if ([InstructionType.START, InstructionType.CLOSE].includes(item.instruction[0]))
            continue;
          if (item.instruction[0] === InstructionType.LINE) {
            const { pre } = vizpath.getNeighboringNodes(item, true);
            points = [
              pre!.node!,
              { x: item.instruction[1], y: item.instruction[2] },
              { x: item.instruction[1], y: item.instruction[2] },
            ];
          } else if (item.instruction[0] === InstructionType.QUADRATIC_CURCE) {
            const { pre } = vizpath.getNeighboringNodes(item, true);
            points = [
              pre!.node!,
              { x: item.instruction[1], y: item.instruction[2] },
              { x: item.instruction[3], y: item.instruction[4] },
            ];
          } else if (item.instruction[0] === InstructionType.BEZIER_CURVE) {
            const { pre } = vizpath.getNeighboringNodes(item, true);
            points = [
              pre!.node!,
              { x: item.instruction[1], y: item.instruction[2] },
              { x: item.instruction[3], y: item.instruction[4] },
              { x: item.instruction[5], y: item.instruction[6] },
            ];
          }
          const bezier = new Bezier(points);
          const p = bezier.project({ x, y });

          if (p.d && p.d < validDistance && p.d < minDistance) {
            minDistance = p.d;
            touchPath = pathObject;
            pathNode = item;
            splitCrood = p;
          }
        }
      });

      if (touchPath && pathNode && splitCrood) {
        const { x, y } = splitCrood;
        const { left, top } = editor.calcAbsolutePosition({ x, y }, touchPath);

        if (!this.splitDot && !this.options.disabledSplitDot) {
          this.splitDot = this._initSpiltDot(vizpath);
        }
        const splitDot = this.splitDot;
        if (splitDot) {
          splitDot.set({ left, top });
          canvas.add(splitDot);
          canvas.requestRenderAll();
        }

        disableAddToken = editor.requestDisableFunction('add');
      }
    });

    editor.addCanvasEvent('mouse:down:before', (e) => {
      if (!pathNode || !splitCrood) return;

      const { pre } = vizpath.getNeighboringInstructions(pathNode, true);
      if (!pre || !pre.node) return;

      const splitCurves = splitInstruction(
        [
          pre.node,
          ...pathNode.instruction.slice(1).reduce((list, _, i, arr) => {
            if (i % 2 === 0) {
              list.push({
                x: arr[i] as number,
                y: arr[i + 1] as number,
              });
            }
            return list;
          }, [] as Crood[]),
        ],
        splitCrood,
      );

      const node = vizpath.replace(pathNode, splitCurves.pre);
      if (node) {
        const object = editor.nodeObjectMap.get(node);
        if (object) editor.focus(object);
        vizpath.insertAfterNode(node, splitCurves.next);

        const insertObject = editor.nodeObjectMap.get(node);
        editor.currentConvertNodeObject = insertObject ?? null;
      }

      clean();
    });
  }

  // 创建虚拟节点
  private _createVirtualNode(): fabric.Object {
    const ui = this.vizpath?.context.find(EditorUI);
    const theme = ui?.theme?.[this.options.virtualNodeKey] ?? ui?.theme?.node ?? DEFAULT_THEME.node;

    let decorated = false;

    const decorator: ThemeDecorator<fabric.Object> = (customObject, callback) => {
      customObject.set({
        name: uuid(),
        // 选中时不出现选中框
        hasBorders: false,
        hasControls: false,
        // 不给选中
        evented: false,
        selectable: false,
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

      if (ui && callback) {
        ui.objectPreRenderCallbackMap.set(customObject, callback);
      }

      decorated = true;

      return customObject;
    };

    let object = theme(decorator);
    if (!decorated) object = decorator(object);

    return object;
  }

  // 创建虚拟参考路径线
  private _createVirtualPath(): fabric.Path {
    const ui = this.vizpath?.context.find(EditorUI);
    const theme =
      ui?.theme?.[this.options.virtualPathKey] ??
      (() => {
        const path = new fabric.Path('M 0 0', {
          fill: 'transparent',
          stroke: '#bebebe',
          strokeWidth: 1,
        });

        return path;
      });

    let decorated = false;

    const decorator: ThemeDecorator<fabric.Line> = (customPath, callback) => {
      customPath.set({
        name: uuid(),
        // 选中时不出现选中框
        hasBorders: false,
        hasControls: false,
        // 不给选中
        evented: false,
        selectable: false,
        // 保持居中
        originX: 'center',
        originY: 'center',
        // 不做另外的画布缓存
        objectCaching: false,
      });

      if (ui && callback) {
        ui.objectPreRenderCallbackMap.set(customPath, callback);
      }

      decorated = true;

      return customPath;
    };

    let path = theme(decorator);
    if (!decorated) path = decorator(path);

    return path;
  }

  /**
   * 寻找新添加的节点是否与原路径节点构成曲线路径
   * @param originNode 原路径节点
   * @param newNodePoint 新添加的节点
   * @returns 构成曲线路径的变换点
   */
  private _findQuadraticCurvePoint(
    originNode: PathNode<ResponsiveCrood>,
    newNodePoint: Crood,
  ): Crood | undefined {
    const editor = this.vizpath?.context.find(Editor);
    if (!editor) return;

    if (!originNode.node) return;

    let curveDotPoint: Crood | undefined;

    if (originNode === originNode.segment[0]) {
      curveDotPoint = originNode.curveDots?.next;
    }

    if (originNode === originNode.segment[originNode.segment.length - 1]) {
      curveDotPoint = originNode.curveDots?.pre;
    }

    if (!curveDotPoint) return;

    return curveFromLine([curveDotPoint, originNode.node], newNodePoint);
  }

  // 增强编辑器添加节点交互
  private _strengthenAddEvent(vizpath: Vizpath) {
    const editor = vizpath.context.find(Editor);
    if (!editor) return;

    const canvas = editor.canvas;
    if (!canvas) return;

    let virtualPath: fabric.Path | undefined;
    let virtualNode: fabric.Object | undefined;
    let curvePoint: Crood | undefined;

    const cleanVirtualObjects = () => {
      canvas.renderOnAddRemove = false;
      if (virtualPath && canvas.contains(virtualPath)) canvas.remove(virtualPath);
      if (virtualNode && canvas.contains(virtualNode)) canvas.remove(virtualNode);
      canvas.renderOnAddRemove = true;
      canvas.requestRenderAll();

      curvePoint = undefined;
    };

    const renderVirtualObjects = (
      activeNode: fabric.Object,
      position: Position,
      hideNode = false,
    ) => {
      const node = editor.objectNodeMap.get(activeNode);
      if (!node) return false;

      if (vizpath.isClosePath(node.segment)) return false;
      if (node !== node.segment[0] && node !== node.segment[node.segment.length - 1]) return false;

      if (this.splitDot && canvas.contains(this.splitDot)) return false;

      const path = editor.nodePathMap.get(node.node!)!.pathObject;

      curvePoint = this._findQuadraticCurvePoint(node, editor.calcRelativeCrood(position, path));

      virtualNode = virtualNode ?? this._createVirtualNode();
      virtualPath = virtualPath ?? this._createVirtualPath();

      virtualNode.set(position);
      if (curvePoint) {
        const { left, top } = editor.calcAbsolutePosition(curvePoint, path);
        virtualPath.initialize([
          [InstructionType.START, activeNode.left, activeNode.top],
          [InstructionType.QUADRATIC_CURCE, left, top, position.left, position.top],
        ] as any);
      } else {
        virtualPath.initialize([
          [InstructionType.START, activeNode.left, activeNode.top],
          [InstructionType.LINE, position.left, position.top],
        ] as any);
      }

      canvas.renderOnAddRemove = false;
      if (!editor.canvas!.contains(virtualPath) && !hideNode) editor.canvas!.add(virtualPath);
      if (!editor.canvas!.contains(virtualNode)) editor.canvas!.add(virtualNode);
      canvas.renderOnAddRemove = true;
      editor.canvas?.requestRenderAll();
      return true;
    };

    editor.addCanvasEvent('mouse:move', (e) => {
      const render = () => {
        if (editor.get('mode') !== 'add') return false;

        const activeNode = editor.activeNodes.length === 1 ? editor.activeNodes[0] : undefined;
        if (!activeNode) return false;

        if (e.target) {
          if (
            e.target[Editor.symbol] === EditorSymbolType.NODE &&
            editor.checkLinkable(activeNode, e.target)
          ) {
            return renderVirtualObjects(
              activeNode,
              { left: e.target.left, top: e.target.top },
              false,
            );
          }
        } else {
          const pointer = calcCanvasCrood(editor.canvas!, e.pointer);
          return renderVirtualObjects(activeNode, { left: pointer.x, top: pointer.y });
        }

        return false;
      };
      if (!render()) cleanVirtualObjects();
    });

    editor.on('added', (object: fabric.Object) => {
      if (curvePoint) {
        const node = editor.objectNodeMap.get(object);
        if (!node) return;

        let _node: PathNode<ResponsiveCrood> | undefined;
        if (node.instruction[0] === InstructionType.START) {
          _node = node.segment[1];
        } else {
          _node = node;
        }

        vizpath.replace(_node, [
          InstructionType.QUADRATIC_CURCE,
          curvePoint.x,
          curvePoint.y,
          _node.node!.x,
          _node.node!.y,
        ]);
      }

      cleanVirtualObjects();
    });

    editor.on('closed', (object: fabric.Object) => {
      if (curvePoint) {
        const node = editor.objectNodeMap.get(object);
        if (!node) return;

        const startNode = node.segment[0];

        vizpath.replace(startNode, [
          InstructionType.QUADRATIC_CURCE,
          curvePoint.x,
          curvePoint.y,
          startNode.node!.x,
          startNode.node!.y,
        ]);
      }

      cleanVirtualObjects();
    });

    editor.on('set', () => {
      if (editor.get('mode') !== 'add') {
        cleanVirtualObjects();
      }
    });
  }

  unload(vizpath: Vizpath) {
    this._destorySplitDot(vizpath);
  }

  load(vizpath: Vizpath) {
    const { disabledSplit, disabledSplitDot } = this.options;
    if (!disabledSplit) this._initSplitEvent(vizpath);
    if (!disabledSplitDot) this._initDbclickChangeEvent(vizpath);

    this._strengthenAddEvent(vizpath);
  }
}

export default EditorBezier;
