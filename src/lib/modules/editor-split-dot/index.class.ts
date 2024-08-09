import { fabric } from 'fabric';
import VizPathModule from '../../vizpath-module.class';
import { calcCanvasCoord, deepIterateGroup, fabricOnceRender, splitInstruction } from '@utils';
import defaultsDeep from 'lodash-es/defaultsDeep';
import VizPathTheme from '../../vizpath-theme.class';
import type { ThemeDecorator } from '../editor-theme/index.class';
import VizPathEditor, { Mode } from '../../vizpath-editor.class';
import { InstructionType, type PathNode } from '../../vizpath.class';
import { Bezier } from 'bezier-js';

type EditorSplitDotOptions = {
  /**
   * 是否仅展示路径中心拆分点
   * @default false
   */
  showMiddleSplitDotOnly: boolean;
};

const DEFAULT_OPTIONS: EditorSplitDotOptions = {
  showMiddleSplitDotOnly: true,
};

/**
 * 编辑器路径拆分点模块，当鼠标聚焦路径段时显示拆分点，点击拆分路径
 */
class EditorSplitDot extends VizPathModule {
  static ID = 'editor-split-dot';

  splitDot: fabric.Object | null = null;

  options: EditorSplitDotOptions;

  themes = new VizPathTheme({
    splitDot: (decorator: ThemeDecorator<fabric.Object>) => {
      const circle = new fabric.Circle({
        radius: 5,
        fill: 'transparent',
        stroke: 'red',
        strokeWidth: 2,
      });

      return circle;
    },
  });

  constructor(options: Partial<EditorSplitDotOptions> = {}) {
    super();

    this.options = defaultsDeep(options, DEFAULT_OPTIONS);
  }

  // 创建拆分点画布对象
  private _createDotObject() {
    let decorated = false;

    const decorator: ThemeDecorator<fabric.Object> = (customObject, callback) => {
      customObject.set({
        // 选中时不出现选中框
        hasBorders: false,
        hasControls: false,
        // 不允许选中
        // evented: false,
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

    let object: fabric.Object = this.themes.create('splitDot')(decorator);
    if (!decorated) object = decorator(object);

    return object;
  }

  unload(editor: VizPathEditor) {
    const canvas = editor.canvas;
    if (this.splitDot && canvas?.contains(this.splitDot)) {
      canvas.remove(this.splitDot);
    }
    this.splitDot = null;
  }

  load(editor: VizPathEditor) {
    const canvas = editor.canvas;
    if (!canvas) return;

    const { showMiddleSplitDotOnly } = this.options;

    let pathNode: PathNode | undefined;
    let splitCoord: Coord | undefined;

    let cacheEvent: fabric.IEvent<MouseEvent> | undefined;
    let disableAddToken: string | undefined;

    const clear = () => {
      if (this.splitDot) canvas.remove(this.splitDot);
      pathNode = undefined;
      splitCoord = undefined;

      if (disableAddToken) editor.requestEnableFunction(disableAddToken);
    };

    const render = (e: fabric.IEvent<MouseEvent>) => {
      const vizpath = this.editor?.vizpath;
      if (!vizpath) return;

      if (editor.get('mode') !== Mode.ADD) return;

      const { target, pointer } = e;

      if (!pointer) return;
      if (!vizpath.path.containsPoint(pointer)) return;

      if (target && target[VizPathEditor.symbol]) return;
      if (target && target.type === 'activeSelection') return;

      let minDistance = Infinity;

      const validDistance = Math.max((vizpath.path.strokeWidth ?? 0) / 2 || 1, 1) + 1;

      // 找到最贴近路径上的拆分点
      vizpath.segments.forEach((segment) => {
        for (const item of segment) {
          let points: Coord[] = [];

          if (['M', 'Z'].includes(item.instruction[0])) continue;
          if (item.instruction[0] === InstructionType.LINE) {
            const { pre } = vizpath.getNeighboringNodes(item);
            const start = pre!.node!;
            const end = { x: item.instruction[1], y: item.instruction[2] };
            points = [start, { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 }, end];
          } else if (item.instruction[0] === InstructionType.QUADRATIC_CURCE) {
            const { pre } = vizpath.getNeighboringNodes(item);
            points = [
              pre!.node!,
              { x: item.instruction[1], y: item.instruction[2] },
              { x: item.instruction[3], y: item.instruction[4] },
            ];
          } else if (item.instruction[0] === InstructionType.BEZIER_CURVE) {
            const { pre } = vizpath.getNeighboringNodes(item);
            points = [
              pre!.node!,
              { x: item.instruction[1], y: item.instruction[2] },
              { x: item.instruction[3], y: item.instruction[4] },
              { x: item.instruction[5], y: item.instruction[6] },
            ];
          }

          const bezier = new Bezier(points);
          const coord = calcCanvasCoord(canvas, pointer);
          const p = bezier.project(
            vizpath.calcRelativeCoord({
              left: coord.x,
              top: coord.y,
            }),
          );

          if (p.d && p.d < validDistance && p.d < minDistance) {
            minDistance = p.d;
            pathNode = item;
            splitCoord = showMiddleSplitDotOnly ? bezier.get(0.5) : p;
          }
        }
      });

      if (pathNode && splitCoord) {
        this.splitDot = this.splitDot ?? this._createDotObject();
        this.splitDot.set(vizpath.calcAbsolutePosition(splitCoord));
        if (!canvas.contains(this.splitDot)) canvas.add(this.splitDot);
      }
    };

    const renderSplitDot = (e: fabric.IEvent<MouseEvent>) => {
      fabricOnceRender(canvas, () => {
        clear();
        render(e);
      });
      if (this.splitDot) {
        disableAddToken = editor.requestDisableFunction('add');
      }
    };

    editor.events.canvas.on('mouse:move', (e) => {
      // 缓存事件对象，以应对编辑器模式变更
      cacheEvent = e;

      renderSplitDot(e);
    });

    editor.events.canvas.on('mouse:down:before', (e) => {
      const vizpath = this.editor?.vizpath;
      if (!vizpath) return;

      if (!this.splitDot || (e.target && e.target !== this.splitDot)) return;
      if (!this.splitDot.containsPoint(e.pointer!)) return;

      editor.rerender(() => {
        if (!pathNode || !splitCoord) return;

        const { pre } = vizpath.getNeighboringPathNodes(pathNode);
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
            }, [] as Coord[]),
          ],
          splitCoord,
        );

        const node = vizpath.replace(pathNode, splitCurves.pre);
        if (node) {
          const object = editor.nodeObjectMap.get(node);
          if (object) editor.focus(object);
          vizpath.insertAfter(node, splitCurves.next);

          const insertObject = editor.nodeObjectMap.get(node);
          editor.currentConvertNodeObject = insertObject ?? null;
        }

        clear();
      });
    });

    editor.events.on('set', () => {
      cacheEvent && renderSplitDot(cacheEvent);
    });
  }
}

export default EditorSplitDot;
