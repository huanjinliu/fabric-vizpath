import BaseEvent from '../base-event.class';
import type VizPath from '../vizpath.class';

abstract class EditorModule<
  Events extends Record<string, (...args: any[]) => void> = Record<
    string,
    (...args: any[]) => void
  >,
> extends BaseEvent<Events> {
  static ID: string;

  vizpath: VizPath | null = null;

  async prepare() {}

  abstract unload(vizpath: VizPath): void;

  abstract load(vizpath: VizPath): void;

  __unload(vizpath: VizPath) {
    this.unload(vizpath);
    this.vizpath = null;
    this.events = {};
  }

  async __load(vizpath: VizPath) {
    await this.prepare();
    this.vizpath = vizpath;
    this.load(vizpath);
  }
}

export default EditorModule;
