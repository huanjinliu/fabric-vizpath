import { fabric } from 'fabric';
import type Vizpath from '../../vizpath.class';
import VizPathModule from '../../vizpath-module.class';
import VizPathEvent from '../../vizpath-event.class';

export interface EditorZoomOptions {
  /**
   * 是否允许缩放
   * @default true
   */
  zoomable?: boolean;
  /**
   * 缩放中心点（canvas-画布中心，mouse-鼠标中心）
   * @default "mouse"
   */
  zoomCenter?: 'canvas' | 'mouse';
  /**
   * 缩放限制，最小倍数和最大倍数
   * @default [0.5, 5]
   */
  zoomLimit?: [min: number, max: number];
}

const DEFAUlT_OPTIONS: Required<EditorZoomOptions> = {
  zoomable: true,
  zoomCenter: 'mouse',
  zoomLimit: [0.5, 5],
};

class EditorZoom extends VizPathModule {
  static ID = 'editor-zoom';

  events = new VizPathEvent<{
    zoom: (canvas: fabric.Canvas) => void;
  }>();

  private _options: Required<EditorZoomOptions>;

  constructor(options: EditorZoomOptions = {}) {
    super();
    this._options = {
      ...DEFAUlT_OPTIONS,
      ...options,
    };
  }

  /**
   * 允许更改是否可以缩放能力
   */
  setZoomable(allow: boolean) {
    this._options.zoomable = allow;
  }

  /**
   * 缩放函数
   * @param newZoom 新的缩放值
   * @param zoomCenter 缩放中心点
   */
  zoom(canvas: fabric.Canvas, newZoom: number, zoomCenter?: { x: number; y: number }) {
    const width = canvas.getWidth();
    const height = canvas.getHeight();

    canvas.zoomToPoint(
      zoomCenter
        ? new fabric.Point(zoomCenter.x, zoomCenter.y)
        : new fabric.Point(width / 2, height / 2),
      newZoom,
    );

    this.events.fire('zoom', canvas);
  }

  initZoomListener(vizpath: Vizpath) {
    const editor = vizpath.editor;
    if (!editor) return;

    const canvas = editor.canvas;
    if (!canvas) return;

    const handler = (event: fabric.IEvent<WheelEvent>) => {
      const { zoomable, zoomCenter } = this._options;
      if (!zoomable) return;

      event.e.preventDefault();
      const [zoom] = canvas.viewportTransform ?? [1, 0, 0, 1, 0, 0];
      const { zoomLimit } = this._options;
      const { offsetX, offsetY, deltaY } = event.e;
      const dZoom = 0.999 ** (deltaY / 2);
      const newZoom = Math.min(Math.max(zoom * dZoom, zoomLimit[0]), zoomLimit[1]);
      const canvasCenter = canvas.getCenter();

      this.zoom(
        canvas,
        newZoom,
        {
          canvas: { x: canvasCenter.left, y: canvasCenter.top },
          mouse: { x: offsetX, y: offsetY },
        }[zoomCenter],
      );
    };

    editor.events.canvas.on('mouse:wheel', handler);
  }

  unload(vizpath: Vizpath) {}

  load(vizpath: Vizpath) {
    this.initZoomListener(vizpath);
  }
}

export default EditorZoom;
