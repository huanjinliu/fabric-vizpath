import throttle from 'lodash-es/throttle';
import type Vizpath from '../../../lib/vizpath.class';
import VizPathModule from '../../../lib/vizpath-module.class';
import VizPathEvent from '../../../lib/vizpath-event.class';

export interface EditorResizeOptions {
  /**
   * 尺寸调整的间隔时间，毫秒为单位
   * @default 60
   */
  interval?: number;
  /**
   * 自动居中
   * @default true
   */
  autoCenter?: boolean;
}

const DEFAUlT_OPTIONS: Required<EditorResizeOptions> = {
  interval: 60,
  autoCenter: true,
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

  /**
   * 流式布局尺寸变更监听
   */
  load(vizpath: Vizpath) {
    const editor = vizpath.editor;
    if (!editor) return;

    const canvas = editor.canvas;
    if (!canvas) return;

    const parentNode = this._parentNode ?? canvas.getElement().parentNode?.parentNode;
    if (!parentNode) return;

    this._parentNode = parentNode as HTMLDivElement;

    // 如果不兼容，抛出错误
    if (typeof ResizeObserver === undefined) throw Error('ResizeObserver is incompatible!');

    const { interval } = this._options;
    const observer = new ResizeObserver(
      throttle(
        (entries) => {
          const target = entries[0].target;
          if (!target) return;

          const width = canvas.getWidth();
          const height = canvas.getHeight();

          const { clientWidth: newWidth, clientHeight: newHeight } = target;
          if (newWidth === width && newHeight === height) return;
          const viewportTransform = canvas.viewportTransform ?? [1, 0, 0, 1, 0, 0];
          const newViewportTransfrom = this._options.autoCenter
            ? [...viewportTransform.slice(0, 4), 0, 0]
            : [
                ...viewportTransform.slice(0, 4),
                viewportTransform[4] + (newWidth - width) / 2,
                viewportTransform[5] + (newHeight - height) / 2,
              ];
          canvas.setViewportTransform(newViewportTransfrom);
          canvas.setDimensions({
            width: newWidth,
            height: newHeight,
          });
          this.events.fire('resize', canvas);
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
  }
}

export default EditorResize;
