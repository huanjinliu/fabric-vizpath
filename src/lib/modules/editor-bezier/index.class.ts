import { fabric } from 'fabric';
import { Bezier } from 'bezier-js';
import VizPathModule from '../../vizpath-module.class';
import {
  calcCanvasCoord,
  curveFromLine,
  curveFromPoint,
  deepIterateGroup,
  fabricOnceRender,
  splitInstruction,
} from '@utils';
import defaultsDeep from 'lodash-es/defaultsDeep';
import VizPathTheme from '../../vizpath-theme.class';
import type { ThemeDecorator } from '../editor-theme/index.class';
import VizPathEditor, { EditorObjectID, Mode } from '../../vizpath-editor.class';
import { InstructionType, type Instruction, type PathNode } from '../../vizpath.class';

type EditorBezierOptions = {
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
  disabledSplit: false,
  disabledSplitDot: false,
  disabledDbclickConvert: false,
};

/**
 * 编辑器曲线化操作模块：1.双击实现指令升降级 2.实现路径选点拆分
 */
class EditorBezier extends VizPathModule {
  static ID = 'editor-bezier';

  splitDot: fabric.Object | null = null;

  options: EditorBezierOptions;

  themes = new VizPathTheme({
    splitDot: (decorator: ThemeDecorator<fabric.Object>) => {
      const circle = new fabric.Circle({
        radius: 3,
        fill: '#ffffff',
        stroke: '#4b4b4b',
        strokeWidth: 1,
      });

      return circle;
    },
    virtualNode: (decorator: ThemeDecorator<fabric.Object>) => {
      const circle = new fabric.Circle({
        radius: 3,
        fill: '#ffffff',
        stroke: '#4b4b4b',
        strokeWidth: 1,
      });

      return circle;
    },
    virtualPath: (decorator: ThemeDecorator<fabric.Path>) => {
      const path = new fabric.Path('M 0 0', {
        fill: 'transparent',
        stroke: '#bebebe',
        strokeWidth: 1,
      });

      return path;
    },
  });

  constructor(options: Partial<EditorBezierOptions> = {}) {
    super();

    this.options = defaultsDeep(options, DEFAULT_OPTIONS);
  }

  /**
   * 自动降级到直线
   */
  degrade(object: fabric.Object) {
    const editor = this.editor;
    if (!editor) return;

    editor.degrade(object, 'both', true);
  }

  /**
   * 自动升级到曲线
   */
  upgrade(object: fabric.Object) {
    const editor = this.editor;
    if (!editor) return;

    const vizpath = editor.vizpath;
    if (!vizpath) return;

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
          pre.deformers?.pre ? [pre.deformers.pre, pre.node!] : [ppre!.node!, pre.node!],
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
          next.deformers?.next ? [next.deformers.next, next.node!] : [nnext!.node!, next.node!],
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
  // private _initSpiltDot(vizpath: VizPathEditor) {
  //   let decorated = false;

  //   const decorator: ThemeDecorator<fabric.Object> = (customObject, callback) => {
  //     customObject.set({
  //       // 选中时不出现选中框
  //       hasBorders: false,
  //       hasControls: false,
  //       // 不给选中
  //       evented: false,
  //       selectable: false,
  //       // 保持居中
  //       originX: 'center',
  //       originY: 'center',
  //     });

  //     // 不做另外的画布缓存
  //     deepIterateGroup(customObject, (object) => {
  //       object.set({
  //         objectCaching: false,
  //       });
  //     });

  //     decorated = true;

  //     return customObject;
  //   };

  //   let object: fabric.Object = this.themes.create('splitDot')(decorator);
  //   if (!decorated) object = decorator(object);

  //   return object;
  // }

  // 清除拆分点
  private _destroySplitDot(editor: VizPathEditor) {
    if (!this.splitDot) return;
    this.splitDot.canvas?.remove(this.splitDot);
    this.splitDot = null;
  }

  // 注册双击节点变换事件
  // private _initDbclickChangeEvent(editor: VizPathEditor) {
  //   editor.canvas?.on('mouse:dblclick', (event) => {
  //     const { target } = event;

  //     if (!target || !editor.nodes.includes(target)) return;

  //     const deformers = editor.deformers.filter((i) => i.nodeObject === target);

  //     if (deformers.length) this.degrade(target);
  //     else this.upgrade(target);
  //   });
  // }

  // 注册指令拆分事件
  // private _initSplitEvent(editor: VizPathEditor) {
  //   const canvas = editor.canvas;
  //   if (!canvas) return;

  //   let touchPath: fabric.Path | undefined;
  //   let pathNode: PathNode | undefined;
  //   let splitCoord: Coord | undefined;
  //   let disableAddToken: string | undefined;

  //   const clear = () => {
  //     if (pathNode) {
  //       if (this.splitDot) canvas.remove(this.splitDot);
  //       pathNode = undefined;
  //       splitCoord = undefined;
  //     }

  //     if (disableAddToken) {
  //       // editor.requestEnableFunction(disableAddToken);
  //       disableAddToken = undefined;
  //     }
  //   };

  //   editor.events.canvas.on('mouse:move', (e) => {
  //     clear();

  //     if (editor.get('mode') !== Mode.ADD) return;

  //     if (target && target[VizPathEditor.symbol]) return;

  //     if (target && target.type === 'activeSelection') return;

  //     const pointer = calcCanvasCoord(canvas, e.pointer);

  //     let minDistance = Infinity;

  //     vizpath.paths.forEach((path) => {
  //       if (!path.containsPoint(e.pointer)) return;

  //       const { x, y } = editor.calcRelativeCoord(
  //         {
  //           left: pointer.x,
  //           top: pointer.y,
  //         },
  //         path,
  //       );

  //       const validDistance = Math.max((path.strokeWidth ?? 0) / 2 || 1, 1);

  //       path.segments.forEach((segment) => {
  //         for (const item of segment) {
  //           let points: Coord[] = [];

  //           if (['M', 'Z'].includes(item.instruction[0])) continue;
  //           if (item.instruction[0] === InstructionType.LINE) {
  //             const { pre } = vizpath.getNeighboringNodes(item, true);
  //             points = [
  //               pre!.node!,
  //               { x: item.instruction[1], y: item.instruction[2] },
  //               { x: item.instruction[1], y: item.instruction[2] },
  //             ];
  //           } else if (item.instruction[0] === InstructionType.QUADRATIC_CURCE) {
  //             const { pre } = vizpath.getNeighboringNodes(item, true);
  //             points = [
  //               pre!.node!,
  //               { x: item.instruction[1], y: item.instruction[2] },
  //               { x: item.instruction[3], y: item.instruction[4] },
  //             ];
  //           } else if (item.instruction[0] === InstructionType.BEZIER_CURVE) {
  //             const { pre } = vizpath.getNeighboringNodes(item, true);
  //             points = [
  //               pre!.node!,
  //               { x: item.instruction[1], y: item.instruction[2] },
  //               { x: item.instruction[3], y: item.instruction[4] },
  //               { x: item.instruction[5], y: item.instruction[6] },
  //             ];
  //           }
  //           const bezier = new Bezier(points);
  //           const p = bezier.project({ x, y });

  //           if (p.d && p.d < validDistance && p.d < minDistance) {
  //             minDistance = p.d;
  //             touchPath = path;
  //             pathNode = item;
  //             splitCoord = p;
  //           }
  //         }
  //       });
  //     });

  //     if (touchPath && pathNode && splitCoord) {
  //       const { x, y } = splitCoord;
  //       const { left, top } = editor.calcAbsolutePosition({ x, y }, touchPath);

  //       if (!this.splitDot && !this.options.disabledSplitDot) {
  //         this.splitDot = this._initSpiltDot(vizpath);
  //       }
  //       const splitDot = this.splitDot;
  //       if (splitDot) {
  //         splitDot.set({ left, top });
  //         canvas.add(splitDot);
  //         canvas.requestRenderAll();
  //       }

  //       disableAddToken = editor.requestDisableFunction('add');
  //     }
  //   });

  //   editor.events.canvas.on('mouse:down:before', (e) => {
  //     if (!pathNode || !splitCoord) return;

  //     const { pre } = vizpath.getNeighboringInstructions(pathNode, true);
  //     if (!pre || !pre.node) return;

  //     const splitCurves = splitInstruction(
  //       [
  //         pre.node,
  //         ...pathNode.instruction.slice(1).reduce((list, _, i, arr) => {
  //           if (i % 2 === 0) {
  //             list.push({
  //               x: arr[i] as number,
  //               y: arr[i + 1] as number,
  //             });
  //           }
  //           return list;
  //         }, [] as Coord[]),
  //       ],
  //       splitCoord,
  //     );

  //     const node = vizpath.replace(pathNode, splitCurves.pre);
  //     if (node) {
  //       const object = editor.nodeObjectMap.get(node);
  //       if (object) editor.focus(object);
  //       vizpath.insertAfterNode(node, splitCurves.next);

  //       const insertObject = editor.nodeObjectMap.get(node);
  //       editor.currentConvertNodeObject = insertObject ?? null;
  //     }

  //     clear();
  //   });
  // }

  // 创建虚拟节点
  private _createVirtualNode(): fabric.Object {
    let decorated = false;

    const decorator: ThemeDecorator<fabric.Object> = (customObject, callback) => {
      customObject.set({
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

      decorated = true;

      return customObject;
    };

    let object: fabric.Object = this.themes.create('virtualNode')(decorator);
    if (!decorated) object = decorator(object);

    return object;
  }

  // 创建虚拟参考路径线
  private _createVirtualPath(): fabric.Path {
    let decorated = false;

    const decorator: ThemeDecorator<fabric.Path> = (customPath, callback) => {
      customPath.set({
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

      decorated = true;

      return customPath;
    };

    let path = this.themes.create('virtualPath')(decorator);
    if (!decorated) path = decorator(path);

    return path;
  }

  // 增强编辑器添加节点交互
  private _strengthenAddEvent(editor: VizPathEditor) {
    const canvas = editor.canvas;
    if (!canvas) return;

    let virtualPath: fabric.Path | undefined;
    let virtualNode: fabric.Object | undefined;
    let curvePoint: Coord | undefined;

    const clearVirtualObjects = () => {
      fabricOnceRender(canvas, () => {
        if (virtualPath && canvas.contains(virtualPath)) canvas.remove(virtualPath);
        if (virtualNode && canvas.contains(virtualNode)) canvas.remove(virtualNode);
        curvePoint = undefined;
      });
    };

    const renderVirtualObjects = (
      activeNode: fabric.Object,
      position: Position,
      hideNode = false,
    ) => {
      const vizpath = editor.vizpath;
      if (!vizpath) return false;

      const node = editor.objectNodeMap.get(activeNode);
      if (!node) return false;

      if (!vizpath.isTerminalNode(node)) return false;

      if (this.splitDot && canvas.contains(this.splitDot)) return false;

      return fabricOnceRender(canvas, () => {
        virtualNode = virtualNode ?? this._createVirtualNode();
        virtualPath = virtualPath ?? this._createVirtualPath();
        virtualNode.set(position);

        curvePoint = node === node.segment[0] ? node.deformers?.pre : node.deformers?.next;
        if (curvePoint) {
          const { left, top } = vizpath.calcAbsolutePosition(curvePoint);
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

        if (!canvas.contains(virtualPath) && !hideNode) canvas.add(virtualPath);
        if (!canvas.contains(virtualNode)) canvas.add(virtualNode);

        return true;
      });
    };

    editor.events.canvas.on('mouse:move', (e) => {
      const render = () => {
        const vizpath = editor.vizpath;
        if (!vizpath) return false;

        const { target, pointer } = e;
        if (!pointer) return false;

        if (editor.get('mode') !== 'add') return false;

        const activeNode = editor.activeNodes.length === 1 ? editor.activeNodes[0] : undefined;
        if (!activeNode) return false;

        if (target) {
          if (
            target[VizPathEditor.symbol] === EditorObjectID.NODE &&
            vizpath.isLinkableNodes(
              editor.objectNodeMap.get(activeNode)!,
              editor.objectNodeMap.get(target)!,
            )
          ) {
            return renderVirtualObjects(activeNode, { left: target.left!, top: target.top! });
          }
        } else {
          const coord = calcCanvasCoord(editor.canvas!, pointer);
          return renderVirtualObjects(activeNode, { left: coord.x, top: coord.y });
        }

        return false;
      };
      if (!render()) clearVirtualObjects();
    });

    editor.events.on('set', () => {
      if (editor.get('mode') !== 'add') {
        clearVirtualObjects();
      }
    });
  }

  unload(editor: VizPathEditor) {
    this._destroySplitDot(editor);
  }

  load(editor: VizPathEditor) {
    const { disabledSplit, disabledSplitDot } = this.options;
    // if (!disabledSplit) this._initSplitEvent(editor);
    // if (!disabledSplitDot) this._initDbclickChangeEvent(editor);

    this._strengthenAddEvent(editor);
  }
}

export default EditorBezier;
