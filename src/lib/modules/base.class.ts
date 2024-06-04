import BaseEvent from '../base-event.class';
import type VizPath from '../vizpath.class';

abstract class EditorModule<
  Events extends Record<string, (...args: any[]) => void> = Record<
    string,
    (...args: any[]) => void
  >,
> extends BaseEvent<Events> {
  static ID: string;

  vizPath: VizPath | null = null;

  async prepare() {}

  abstract unload(vizPath: VizPath): void;

  abstract load(vizPath: VizPath): void;

  __unload(vizPath: VizPath) {
    this.unload(vizPath);
    this.vizPath = null;
    this.events = {};
  }

  async __load(vizPath: VizPath) {
    await this.prepare();
    this.vizPath = vizPath;
    this.load(vizPath);
  }
}

export default EditorModule;
