/**
 * 基础事件类
 */
class BaseEvent<Events extends Record<string, (...args: any[]) => void>> {
  /**
   * 监听事件
   */
  events: Partial<Record<keyof Events, ((...args: any[]) => void)[]>> = {};

  /**
   * 监听事件
   * @param eventName 事件名
   * @param callback 回调
   */
  on<Event extends keyof Events>(eventName: Event, callback: Events[Event], params?: any) {
    this.events[eventName] = this.events[eventName] ?? [];
    this.events[eventName]!.push(callback);
  }

  /**
   * 取消监听事件
   * @param eventName 事件名
   * @param callback 回调
   */
  off<Event extends keyof Events>(eventName: Event, callback?: Events[Event], params?: any) {
    if (!callback) delete this.events[eventName];

    const handlers = this.events[eventName];
    if (!handlers) return;

    const index = handlers.indexOf(callback as (typeof handlers)[number]);
    if (index !== -1) handlers.splice(index, 1);
  }

  /**
   * 触发编辑器事件
   */
  fire<Event extends keyof Events>(eventName: Event, ...data: Parameters<Events[Event]>) {
    const handlers = this.events[eventName];
    if (!handlers) return;
    for (const callback of handlers) callback(...data);
  }
}

export default BaseEvent;
