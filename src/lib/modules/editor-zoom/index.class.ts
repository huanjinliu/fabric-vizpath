import { fabric } from 'fabric';
import type Vizpath from '../../../lib/vizpath.class';
import VizPathModule from '../../../lib/vizpath-module.class';
import VizPathEvent from '../../../lib/vizpath-event.class';

export interface EditorZoomOptions {
  /**
   * 默认缩放值
   */
  defaultZoom?: number;
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
  defaultZoom: 1,
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
    const matrix = canvas.viewportTransform ?? [1, 0, 0, 1, 0, 0];
    const [zoom, , , , offsetX, offsetY] = matrix;

    const width = canvas.getWidth();
    const height = canvas.getHeight();

    const canvasZoomCenter = fabric.util.transformPoint(
      zoomCenter
        ? new fabric.Point(zoomCenter.x, zoomCenter.y)
        : new fabric.Point(width / 2, height / 2),
      fabric.util.invertTransform(matrix),
    );
    const offset = {
      x: width * (newZoom - zoom) * (canvasZoomCenter.x / width),
      y: height * (newZoom - zoom) * (canvasZoomCenter.y / height),
    };

    canvas.setViewportTransform([newZoom, 0, 0, newZoom, offsetX - offset.x, offsetY - offset.y]);
    canvas.requestRenderAll();

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

      this.zoom(
        canvas,
        newZoom,
        {
          canvas: { x: canvas.getWidth() / 2, y: canvas.getHeight() / 2 },
          mouse: { x: offsetX, y: offsetY },
        }[zoomCenter],
      );
    };

    editor.events.canvas.on('mouse:wheel', handler);

    const { defaultZoom } = this._options;
    this.zoom(canvas, defaultZoom);
  }

  unload(vizpath: Vizpath) {}

  load(vizpath: Vizpath) {
    this.initZoomListener(vizpath);
  }
}

export default EditorZoom;
