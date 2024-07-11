import { fabric } from 'fabric';
import type Vizpath from '../../../lib/vizpath.class';
import VizPathModule from '../../../lib/vizpath-module.class';
import VizPathEvent from '../../../lib/vizpath-event.class';

export interface EditorMoveOptions {
  /**
   * 默认偏移
   */
  defaultOffset?: {
    x: number;
    y: number;
  };
  /**
   * 是否默认允许拖拽
   * @default true
   */
  movable?: boolean;
  /**
   * 移动时光标
   * @default move
   */
  moveCursor?: 'move' | 'grab' | 'grabbing' | string;
  /**
   * 按下空格同时聚焦画布时光标
   * @default move
   */
  spaceHoverCursor?: 'move' | 'grab' | 'grabbing' | string;
  /**
   * 是否允许空格+左键进行拖拽
   * @default true
   */
  spaceLeftClickMove?: boolean;
  /**
   * 是否提供右键拖拽
   * @default true
   */
  rightClickMove?: boolean;
}

/** 默认内容区配置 */
const DEFAUlT_OPTIONS: Required<EditorMoveOptions> = {
  defaultOffset: { x: 0, y: 0 },
  movable: true,
  spaceHoverCursor: 'move',
  moveCursor: 'move',
  spaceLeftClickMove: true,
  rightClickMove: true,
};

class EditorMoveModule extends VizPathModule {
  static ID = 'editor-move';

  events = new VizPathEvent<{
    move: (canvas: fabric.Canvas) => void;
  }>();

  private _options: Required<EditorMoveOptions>;

  /**
   * 当前光标
   */
  private _currentCursor = 'default';

  /**
   * 记录可操作元素，用于移动结束后重新赋于可操作
   */
  private _cacheSelectableObjects: fabric.Object[] = [];

  /**
   * 记录原选中元素
   */
  private _cacheActiveObjects: fabric.Object[] = [];

  constructor(options: EditorMoveOptions = {}) {
    super();
    this._options = {
      ...DEFAUlT_OPTIONS,
      ...options,
    };
  }

  /**
   * 改变画布光标
   */
  private changeCanvasCursor = (canvas: fabric.Canvas, type: string, outerType: string = type) => {
    canvas.defaultCursor = type;
    // 这里设置外层画布的光标样式，必须和defaultCursor一起设置不然会相互冲突
    canvas.setCursor(outerType);

    this._currentCursor = type;
  };

  /** 偏移画布 */
  move(canvas: fabric.Canvas, offset: Crood) {
    canvas.absolutePan({
      x: -offset.x,
      y: -offset.y,
    });
    this.events.fire('move', canvas);
  }

  /**
   * 允许更改是否可以拖拽能力
   */
  setMovable(allow: boolean) {
    this._options.movable = allow;
  }

  /**
   * 回到画布中心
   */
  backToCenter() {
    const editor = this.vizpath?.editor;
    if (!editor) return;

    const canvas = editor.canvas;
    if (!canvas) return;

    this.move(canvas, { x: 0, y: 0 });
  }

  /**
   * 移动监听
   */
  private initMoveListener(vizpath: Vizpath) {
    const editor = vizpath.editor;
    if (!editor) return;

    const canvas = vizpath.editor?.canvas;
    if (!canvas) return;

    // 是否按下空格
    let space = false;
    // 起始移动坐标
    let moveInitDistance: Crood | undefined;
    // 如果允许右键移动
    if (this._options.rightClickMove) {
      canvas.fireRightClick = true;
      canvas.stopContextMenu = true;
    }

    // 移动相关监听方法
    const moveHandlers = {
      prepare: (event: KeyboardEvent) => {
        const { movable, spaceHoverCursor, moveCursor, spaceLeftClickMove } = this._options;
        if (!movable) return;

        if (space) {
          event.preventDefault();
          return;
        }

        space = spaceLeftClickMove && event.code === 'Space';

        if (!space) return;
        else {
          this._cacheActiveObjects = canvas.getActiveObjects();
          canvas.skipTargetFind = true;
          canvas.discardActiveObject();
        }

        if (this._currentCursor !== moveCursor) this.changeCanvasCursor(canvas, spaceHoverCursor);

        event.preventDefault();
      },
      start: (event: fabric.IEvent<MouseEvent>) => {
        const { movable, moveCursor } = this._options;
        if (!movable) return;

        const [leftClick, rightClick] = [
          space && event.e.buttons === 1,
          this._options.rightClickMove && event.e.buttons === 2,
        ];

        if (leftClick || rightClick) {
          const [, , , , offsetX, offsetY] = canvas.viewportTransform ?? [1, 0, 0, 1, 0, 0];

          const dragCursor = moveCursor;

          // 开始移动起取消当前画布聚焦元素并将所以元素设为不可操作
          canvas.forEachObject((object) => {
            if (object.selectable) this._cacheSelectableObjects.push(object);
            object.set({
              selectable: false,
              hoverCursor: dragCursor,
            });
          });

          moveInitDistance = {
            x: event.e.x - offsetX,
            y: event.e.y - offsetY,
          };

          this.changeCanvasCursor(canvas, dragCursor);

          // 拖拽开始先禁止画布多元素框选
          canvas.selection = false;
        }
      },
      moving: (event: fabric.IEvent<MouseEvent>) => {
        if (moveInitDistance === undefined) return;

        const newOffset = {
          x: event.e.x - moveInitDistance.x,
          y: event.e.y - moveInitDistance.y,
        };

        this.move(canvas, newOffset);
      },
      finish: (event: KeyboardEvent | fabric.IEvent<MouseEvent>) => {
        // 如果是键盘松开且松开的是空格，取消space按下状态，否则维持原状态
        const keyup = (event as KeyboardEvent).type === 'keyup';
        if (keyup && (event as KeyboardEvent).code === 'Space') space = false;

        const { spaceHoverCursor } = this._options;
        if (moveInitDistance) canvas.requestRenderAll();

        if (!space) {
          canvas.skipTargetFind = false;
          // 重置元素悬浮光标
          canvas.forEachObject((object) => {
            const selectable = object.selectable || this._cacheSelectableObjects.includes(object);
            object.set({
              selectable,
              hoverCursor: selectable ? 'move' : 'default',
            });
          });
          this._cacheSelectableObjects = [];
          if (this._cacheActiveObjects.length) {
            editor.focus(...this._cacheActiveObjects);
            this._cacheActiveObjects = [];
          }
        }

        moveInitDistance = undefined;

        const isHover = (canvas as any)._hoveredTarget?.selectable === true;
        const newCursor = space ? spaceHoverCursor : 'default';

        this.changeCanvasCursor(canvas, newCursor, isHover ? 'move' : newCursor);

        // 拖拽结束重置画布多元素框选
        canvas.selection = true;
      },
    };

    editor.events.global.on('keydown', moveHandlers.prepare);
    editor.events.global.on('keyup', moveHandlers.finish);
    editor.events.canvas.on('mouse:down', moveHandlers.start);
    editor.events.canvas.on('mouse:move', moveHandlers.moving);
    editor.events.canvas.on('mouse:up', moveHandlers.finish);

    const { defaultOffset } = this._options;
    this.move(canvas, defaultOffset);
  }

  unload(vizpath: Vizpath) {}

  load(vizpath: Vizpath) {
    this.initMoveListener(vizpath);
  }
}

export default EditorMoveModule;
