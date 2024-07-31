import type VizPath from './vizpath.class';
import VizPathTheme from './vizpath-theme.class';
import VizPathEvent from './vizpath-event.class';
import type { ThemeDecorator } from './modules/editor-theme/index.class';

abstract class VizPathModule {
  static ID: string;

  vizpath: VizPath | null = null;

  events = new VizPathEvent<Record<string, (...args: any[]) => void>>();

  themes = new VizPathTheme<
    Record<string, (decorator: ThemeDecorator<any>, ...args: any[]) => any>
  >({});

  abstract unload(vizpath: VizPath): void;

  abstract load(vizpath: VizPath): void;

  __unload(vizpath: VizPath) {
    this.unload(vizpath);
    this.vizpath = null;
    this.events.clear();
  }

  async __load(vizpath: VizPath) {
    this.vizpath = vizpath;
    this.load(vizpath);
  }
}

export default VizPathModule;
