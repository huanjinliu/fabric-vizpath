import VizPathEvent from './vizpath-event.class';

type CanvasEventName =
  | 'object:modified'
  | 'object:moving'
  | 'object:scaling'
  | 'object:rotating'
  | 'object:skewing'
  | 'object:resizing'
  | 'object:selected'
  | 'object:added'
  | 'object:removed'
  | 'group:selected'
  | 'before:transform'
  | 'before:selection:cleared'
  | 'selection:cleared'
  | 'selection:created'
  | 'selection:updated'
  | 'mouse:up'
  | 'mouse:down'
  | 'mouse:move'
  | 'mouse:up:before'
  | 'mouse:down:before'
  | 'mouse:move:before'
  | 'mouse:dblclick'
  | 'mouse:wheel'
  | 'mouse:over'
  | 'mouse:out'
  | 'drop:before'
  | 'drop'
  | 'dragover'
  | 'dragenter'
  | 'dragleave'
  | 'before:render'
  | 'after:render'
  | 'before:path:created'
  | 'path:created'
  | 'canvas:cleared'
  | 'moving'
  | 'scaling'
  | 'rotating'
  | 'skewing'
  | 'resizing'
  | 'mouseup'
  | 'mousedown'
  | 'mousemove'
  | 'mouseup:before'
  | 'mousedown:before'
  | 'mousemove:before'
  | 'mousedblclick'
  | 'mousewheel'
  | 'mouseover'
  | 'mouseout'
  | 'drop:before'
  | 'drop'
  | 'dragover'
  | 'dragenter'
  | 'dragleave';

/**
 * 元素事件类
 */
class VizPathDOMEvent<
  Events extends Record<string, (...args: any[]) => void>,
> extends VizPathEvent<Events> {
  private _canvas: fabric.Canvas | null = null;

  private _DOMEvents: {
    target: 'global' | 'canvas';
    eventName: string;
    handler: (e: any) => void;
  }[] = [];

  canvas: {
    on(eventName: CanvasEventName, handler: (e: fabric.IEvent<MouseEvent>) => void): void;
    on(eventName: 'mouse:wheel', handler: (e: fabric.IEvent<WheelEvent>) => void): void;
    on(eventName: string, handler: (e: fabric.IEvent) => void): void;
    off(eventName: string, handler?: (e: fabric.IEvent) => void): void;
  } = {
    on: (eventName: string, handler: (...args: any[]) => void) => {
      const canvas = this._canvas;
      if (!canvas) return;

      canvas.on(eventName, handler);

      this._DOMEvents.push({ target: 'canvas', eventName, handler });
    },
    off: (eventName, handler?: (e: fabric.IEvent) => void) => {
      const canvas = this._canvas;
      if (!canvas) return;

      this._DOMEvents = this._DOMEvents.filter((listener) => {
        if (handler && handler !== listener.handler) return true;
        if (eventName === listener.eventName) {
          canvas.off(listener.eventName, listener.handler);
          return false;
        }
        return true;
      });
    },
  };

  global = {
    on: <K extends keyof WindowEventMap>(eventName: K, handler: (e: WindowEventMap[K]) => void) => {
      window.addEventListener(eventName, handler);

      this._DOMEvents.push({ target: 'global', eventName, handler });
    },
    off: <K extends keyof WindowEventMap>(
      eventName: K,
      handler?: (e: WindowEventMap[K]) => void,
    ) => {
      this._DOMEvents = this._DOMEvents.filter((listener) => {
        if (handler && handler !== listener.handler) return true;
        if (eventName === listener.eventName) {
          window.removeEventListener(listener.eventName, listener.handler);
          return false;
        }
        return true;
      });
    },
  };

  mount(canvas: fabric.Canvas) {
    this._canvas = canvas;
  }

  clear() {
    super.clear();

    this._DOMEvents.forEach(({ target, eventName, handler }) => {
      this[target].off(eventName as keyof WindowEventMap, handler);
    });
    this._DOMEvents.length = 0;

    this._canvas = null;
  }
}

export default VizPathDOMEvent;
