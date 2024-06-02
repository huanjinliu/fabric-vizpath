import { fabric } from 'fabric';
import type Vizpath from '../../vizpath.class';
import EditorModule from '../base.class';

class Editor extends EditorModule {
  static ID = 'editor';

  /**
   * 挂载的画布
   */
  mountCanvas: fabric.Canvas | null = null;

  /**
   * 交互所在fabric画布
   */
  canvas: fabric.Canvas | null = null;

  /**
   * 是否隔离
   */
  isolation = false;

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
  constructor(mountCanvas: fabric.Canvas, isolation = false) {
    super();
    this.mountCanvas = mountCanvas;
    this.isolation = isolation;
  }

  /**
   * 基于挂载画布构建编辑器画布
   */
  private _createEditorCanvas(canvas: fabric.Canvas) {
    const container = canvas.getElement().parentNode as HTMLDivElement;
    if (!container) {
      throw new TypeError('Please use fabric.Canvas which is mounted into the document.');
    }

    // 如果使用隔离画布则会参考配置构造新画布使与原画布隔离
    if (this.isolation) {
      const editorCanvas = document.createElement('canvas');
      container.appendChild(editorCanvas);

      const editorFabricCanvas = new fabric.Canvas(editorCanvas, {
        // 跟随尺寸
        width: container.clientWidth,
        height: container.clientHeight,
        // 允许画布多选
        selection: true,
        // 画布渲染不跳过离屏元素
        skipOffscreen: false,
        // 保持选中元素的层级关系
        preserveObjectStacking: true,
      });

      // 保留画布变换
      editorFabricCanvas.setViewportTransform(canvas.viewportTransform ?? [1, 0, 0, 1, 0, 0]);

      // 更多画布配置需要使用者外部配置

      return editorFabricCanvas;
    }

    return canvas;
  }

  /**
   * 添加事件监听
   */
  on(type: 'global' | 'canvas', eventName: string, handler: (e: any) => void) {
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
  off(type: 'global' | 'canvas', eventName: string, handler?: (e: any) => void) {
    const canvas = this.canvas;
    if (!canvas) return;

    this.listeners = this.listeners.filter((listener) => {
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
    });
  }

  unload() {
    // 如果是隔离画布要销毁克隆画布
    if (this.isolation) {
      this.canvas?.dispose();
    } else {
      this.listeners.forEach(({ type, eventName, handler }) => {
        this.off(type, eventName, handler);
      });
    }

    this.mountCanvas = null;
    this.canvas = null;
    this.isolation = false;
    this.listeners.length = 0;
  }

  async load() {
    if (!this.mountCanvas) {
      throw new TypeError('Please use valid canvas object.');
    }

    if (!(this.mountCanvas instanceof fabric.Canvas)) {
      throw new TypeError('Please use fabric.Canvas instead of fabric.StaticCanvas.');
    }

    this.canvas = this._createEditorCanvas(this.mountCanvas);
  }
}

export default Editor;
