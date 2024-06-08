import { fabric } from 'fabric';
import { v4 as uuid } from 'uuid';
import { Bezier } from 'bezier-js';
import type Vizpath from '../../vizpath.class';
import EditorModule from '../base.class';
import Editor, { Mode } from '../editor/index.class';
import { InstructionType, type Instruction, type PathNode } from 'src/lib';
import { calcCanvasCrood, deepIterateGroup } from '@utils';
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
   * 根据路径指令上的一点拆分路径指令
   */
  private _splitInstruction(points: Crood[], point: Crood) {
    if (points.length === 2) {
      return {
        pre: [InstructionType.LINE, point.x, point.y] as Instruction,
        next: [InstructionType.LINE, points[1].x, points[1].y] as Instruction,
      };
    } else {
      const curve = new Bezier(points);
      const { t } = curve.project(point);
      const splitCurves = curve.split(t!);
      const path = new fabric.Path(splitCurves.left.toSVG() + splitCurves.right.toSVG())
        .path! as unknown as Instruction[];

      return { pre: path[1], next: path[3] };
    }
  }

  /**
   * 通过线与点实现曲线化
   */
  curveFromLine(line: [start: Crood, end: Crood], point: Crood, t = 0.71) {
    const [start, end] = line;
    const curvePoint = {
      x: end.x + (point.x - start.x) / 2,
      y: end.y + (point.y - start.y) / 2,
    };
    const curve = (Bezier as any).quadraticFromPoints(...[end, curvePoint, point].flat(1), t);
    return curve.points[0] as Crood;
  }

  /**
   * 通过点与点实现曲线化
   */
  curveFromPoint(point0: Crood, point: Crood) {
    const centerPoint = {
      x: (point.x + point0.x) / 2,
      y: (point.y + point0.y) / 2,
    };
    const dx = point.x - centerPoint.x;
    const dy = point.y - centerPoint.y;
    const midPoint = {
      x: centerPoint.x - dy,
      y: centerPoint.y + dx,
    };
    return midPoint as Crood;
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
   * 自动升级到直线
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
        const point = this.curveFromLine(
          pre.curveDots?.pre ? [pre.curveDots.pre, pre.node!] : [ppre!.node!, pre.node!],
          pathNode.node!,
        );
        vizpath.replace(pathNode, [
          InstructionType.QUADRATIC_CURCE,
          point.x,
          point.y,
          pathNode.node!.x,
          pathNode.node!.y,
        ] as Instruction);
      } else {
        const midPoint = this.curveFromPoint(pre.node!, pathNode.node!);
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
        const point = this.curveFromLine(
          next.curveDots?.next ? [next.curveDots.next, next.node!] : [nnext!.node!, next.node!],
          pathNode.node!,
        );
        vizpath.replace(next, [
          InstructionType.QUADRATIC_CURCE,
          point.x,
          point.y,
          next.node!.x,
          next.node!.y,
        ] as Instruction);
      } else {
        const midPoint = this.curveFromPoint(next.node!, pathNode.node!);
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
    const ui = vizpath.context.find(EditorUI<Record<string, unknown>, { splitDot: fabric.Object }>);
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

      if (editor.setting.mode !== Mode.ADD) return;

      if (e.target && e.target[Editor.symbol]) return;

      const pointer = calcCanvasCrood(canvas, e.pointer);

      // 只有进入路径范围内才开始判定是否触线拆分
      const touchPath = editor.paths.find((i) => i.pathObject.containsPoint(e.pointer));
      if (!touchPath) return;

      const { segment, pathObject } = touchPath;

      const { x, y } = editor.calcRelativeCrood(
        {
          left: pointer.x,
          top: pointer.y,
        },
        pathObject,
      );

      let d = Math.max((pathObject.strokeWidth ?? 0) / 2 || 1, 1);

      for (const item of segment) {
        let points: Crood[] = [];

        if ([InstructionType.START, InstructionType.CLOSE].includes(item.instruction[0])) continue;
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

        if (p.d && p.d < d) {
          d = p.d;
          pathNode = item;
          splitCrood = p;
        }
      }

      if (pathNode && splitCrood) {
        const { x, y } = splitCrood;
        const { left, top } = editor.calcAbsolutePosition({ x, y }, pathObject);

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

    editor.addCanvasEvent('mouse:down', (e) => {
      if (!pathNode || !splitCrood) return;

      const { pre } = vizpath.getNeighboringInstructions(pathNode, true);
      if (!pre || !pre.node) return;

      const splitCurves = this._splitInstruction(
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
        vizpath.insert(node, splitCurves.next);
      }

      clean();
    });
  }

  unload(vizpath: Vizpath) {
    this._destorySplitDot(vizpath);
  }

  load(vizpath: Vizpath) {
    const { disabledSplit, disabledSplitDot } = this.options;
    if (!disabledSplit) this._initSplitEvent(vizpath);
    if (!disabledSplitDot) this._initDbclickChangeEvent(vizpath);
  }
}

export default EditorBezier;
