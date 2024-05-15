import { fabric } from 'fabric';
import type Vizpath from '../../vizpath.class';
import EditorModule from '../base.class';

class Editor extends EditorModule {
  static ID = 'editor';

  /**
   * 挂载的画布
   */
  private _mountCanvas: fabric.Canvas;

  /**
   * 交互所在fabric画布
   */
  canvas: fabric.Canvas | null = null;

  /**
   * 监听事件
   */
  listeners: {
    type: 'global' | 'canvas';
    eventName: string;
    handler: (e: any) => void;
  }[] = [];

  /**
   * 构造函数
   * @param options 更多配置
   */
  constructor(canvas: fabric.Canvas) {
    super();
    this._mountCanvas = canvas;
  }

  /**
   * 基于挂载画布构建编辑器画布
   */
  private _createEditorCanvas(canvas: fabric.Canvas) {
    if (!(canvas instanceof fabric.Canvas)) {
      throw new TypeError(
        'Please use fabric.Canvas instead of fabric.StaticCanvas.'
      );
    }

    const container = canvas.getElement().parentNode as HTMLDivElement;
    if (!container) {
      throw new TypeError(
        'Please use fabric.Canvas which is mounted into the document.'
      );
    }

    const editorCanvas = document.createElement('canvas');
    container.appendChild(editorCanvas);

    const editorFabricCanvas = new fabric.Canvas(editorCanvas, {
      width: container.clientWidth,
      height: container.clientHeight,
      selection: true,
      skipOffscreen: false,
      preserveObjectStacking: true,
      selectionColor: canvas.selectionColor,
      selectionBorderColor: canvas.selectionBorderColor,
      selectionDashArray: canvas.selectionDashArray,
      selectionLineWidth: canvas.selectionLineWidth,
    });

    editorFabricCanvas.setViewportTransform(
      canvas.viewportTransform ?? [1, 0, 0, 1, 0, 0]
    );

    return editorFabricCanvas;
  }

  /**
   * 添加事件监听
   */
  on(
    type: 'global' | 'canvas',
    eventName: string,
    handler: (e: any) => void
  ) {
    if (!this.canvas) return;

    if (type === 'global') {
      window.addEventListener(eventName, handler);
    }

    if (type === 'canvas') {
      this.canvas.on(eventName, handler);
    }

    this.listeners.push({ type, eventName, handler });
  }

  /**
   * 移除事件监听
   */
  off(
    type: 'global' | 'canvas',
    eventName: string,
    handler?: (e: any) => void
  ) {
    const canvas = this.canvas;
    if (!canvas) return;

    this.listeners = this.listeners.filter(listener => {
      if (handler && handler !== listener.handler) return true;
      if (eventName === listener.eventName) {
        if (type === 'global') {
          window.removeEventListener(listener.eventName, listener.handler);
        }
        if (type === 'canvas') {
          canvas.off(listener.eventName, listener.handler);
        }
        return false;
      }
      return true;
    })
  }

  load(editor: Vizpath) {
    this.canvas = this._createEditorCanvas(this._mountCanvas);
  }
}

export default Editor;
