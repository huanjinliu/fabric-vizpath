import throttle from 'lodash-es/throttle';
import type Vizpath from '../../vizpath.class';
import VizPathModule from '../../vizpath-module.class';
import VizPathEvent from '../../vizpath-event.class';

export interface EditorResizeOptions {
  /**
   * 尺寸调整的间隔时间，毫秒为单位
   * @default 60
   */
  interval?: number;
  /**
   * 自动调整视图偏移
   * @default 'center'
   */
  autoAdjustView?: 'leftTop' | 'center' | 'none';
}

const DEFAUlT_OPTIONS: Required<EditorResizeOptions> = {
  interval: 60,
  autoAdjustView: 'center',
};

class EditorResize extends VizPathModule {
  static ID = 'editor-resize';

  events = new VizPathEvent<{
    resize: (canvas: fabric.Canvas) => void;
  }>();

  private _parentNode: HTMLElement | null;

  private _options: Required<EditorResizeOptions>;

  private _observer: ResizeObserver | undefined;

  constructor(parentNode?: HTMLElement, options: EditorResizeOptions = {}) {
    super();
    this._parentNode = parentNode ?? null;
    this._options = {
      ...DEFAUlT_OPTIONS,
      ...options,
    };
  }

  unload(vizpath: Vizpath) {
    this._observer?.disconnect();
    this._observer = undefined;
    this._parentNode = null;
  }

  resize(canvas: fabric.Canvas, width: number, height: number) {
    const oldWidth = canvas.getWidth();
    const oldHeight = canvas.getHeight();

    const viewportTransform = canvas.viewportTransform ?? [1, 0, 0, 1, 0, 0];
    const offset = {
      leftTop: { x: 0, y: 0 },
      center: { x: width / 2, y: height / 2 },
      none: {
        x: viewportTransform[4] + (width - oldWidth) / 2,
        y: viewportTransform[5] + (height - oldHeight) / 2,
      },
    }[this._options.autoAdjustView];
    const newViewportTransfrom = [...viewportTransform.slice(0, 4), offset.x, offset.y];

    canvas.setViewportTransform(newViewportTransfrom);
    canvas.setDimensions({ width, height });

    this.events.fire('resize', canvas);
  }

  /**
   * 流式布局尺寸变更监听
   */
  load(vizpath: Vizpath) {
    const editor = vizpath.editor;
    if (!editor) return;

    const canvas = editor.canvas;
    if (!canvas) return;

    const parentNode = (this._parentNode ??
      canvas.getElement().parentNode?.parentNode) as HTMLDivElement;
    if (!parentNode) return;

    this._parentNode = parentNode as HTMLDivElement;

    // 如果不兼容，抛出错误
    if (typeof ResizeObserver === 'undefined')
      throw Error('(VizPath Error) ResizeObserver is incompatible!');

    const { interval } = this._options;
    const observer = new ResizeObserver(
      throttle(
        (entries) => {
          const target = entries[0].target;
          if (!target) return;

          const { clientWidth: newWidth, clientHeight: newHeight } = target;
          const oldWidth = canvas.getWidth();
          const oldHeight = canvas.getHeight();
          if (newWidth === oldWidth && newHeight === oldHeight) return;

          this.resize(canvas, newWidth, newHeight);
        },
        interval,
        {
          leading: true,
          trailing: true,
        },
      ),
    );
    observer.observe(this._parentNode);

    this._observer = observer;

    this.resize(canvas, parentNode.clientWidth, parentNode.clientHeight);
  }
}

export default EditorResize;
