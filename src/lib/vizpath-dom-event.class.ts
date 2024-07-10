import VizPathEvent from './vizpath-event.class';

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

  canvas = {
    on: (eventName: string, handler: (...args: any[]) => void) => {
      const canvas = this._canvas;
      if (!canvas) return;

      canvas.on(eventName, handler);

      this._DOMEvents.push({ target: 'canvas', eventName, handler });
    },
    off: (eventName: string, handler?: (...args: any[]) => void) => {
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
    on: (eventName: string, handler: (...args: any[]) => void) => {
      window.addEventListener(eventName, handler);

      this._DOMEvents.push({ target: 'global', eventName, handler });
    },
    off: (eventName: string, handler?: (...args: any[]) => void) => {
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
      this[target].off(eventName, handler);
    });
    this._DOMEvents.length = 0;

    this._canvas = null;
  }
}

export default VizPathDOMEvent;
