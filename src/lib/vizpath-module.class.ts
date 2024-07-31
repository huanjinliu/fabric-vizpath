import type VizPathEditor from './vizpath-editor.class';
import VizPathTheme from './vizpath-theme.class';
import VizPathEvent from './vizpath-event.class';
import type { ThemeDecorator } from '../lib.bak/modules/editor-theme/index.class';

abstract class VizPathModule {
  static ID: string;

  editor: VizPathEditor | null = null;

  events = new VizPathEvent<Record<string, (...args: any[]) => void>>();

  themes = new VizPathTheme<
    Record<string, (decorator: ThemeDecorator<any>, ...args: any[]) => any>
  >({});

  abstract unload(editor: VizPathEditor): void | Promise<void>;

  abstract load(editor: VizPathEditor): void | Promise<void>;

  get name() {
    return (this.constructor as typeof VizPathModule).ID;
  }

  async __unload(editor: VizPathEditor) {
    await Promise.resolve(this.unload(editor));
    this.editor = null;
    this.events.clear();
  }

  async __load(editor: VizPathEditor) {
    this.editor = editor;
    await Promise.resolve(this.load(editor));
  }
}

export default VizPathModule;
