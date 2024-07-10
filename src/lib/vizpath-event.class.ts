/**
 * 基础事件类
 */
class VizPathEvent<Events extends Record<string, (...args: any[]) => void>> {
  /**
   * 监听事件
   */
  private _events: Partial<Record<keyof Events, ((...args: any[]) => void)[]>> = {};

  /**
   * 监听事件
   * @param eventName 事件名
   * @param callback 回调
   */
  on<Event extends keyof Events>(eventName: Event, callback: Events[Event]) {
    this._events[eventName] = this._events[eventName] ?? [];
    this._events[eventName]!.push(callback);
  }

  /**
   * 取消监听事件
   * @param eventName 事件名
   * @param callback 回调
   */
  off<Event extends keyof Events>(eventName: Event, callback?: Events[Event]) {
    if (!callback) delete this._events[eventName];

    const handlers = this._events[eventName];
    if (!handlers) return;

    const index = handlers.indexOf(callback as (typeof handlers)[number]);
    if (index !== -1) handlers.splice(index, 1);
  }

  /**
   * 仅监听1次后取消监听
   * @param eventName 事件名
   * @param callback 回调
   */
  once<Event extends keyof Events>(eventName: Event, callback: Events[Event]) {
    this._events[eventName] = this._events[eventName] ?? [];

    const _onceHandler = ((...args: any[]) => {
      const result = callback(...args);
      this.off(eventName, _onceHandler);
      return result;
    }) as Events[Event];

    this._events[eventName]!.push(_onceHandler);
  }

  /**
   * 触发编辑器事件
   */
  fire<Event extends keyof Events>(eventName: Event, ...data: Parameters<Events[Event]>) {
    const handlers = this._events[eventName];
    if (!handlers) return;
    for (const callback of handlers) callback(...data);
  }

  clear() {
    this._events = {};
  }
}

export default VizPathEvent;
