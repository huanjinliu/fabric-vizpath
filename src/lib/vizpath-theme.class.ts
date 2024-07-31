import type { ThemeDecorator } from '../lib.bak/modules/editor-theme/index.class';

class VizPathTheme<
  Theme extends Record<string, (decorator: ThemeDecorator<any>, ...args: any[]) => any>,
> {
  __themes: Theme;

  constructor(defaultTheme: Theme) {
    this.__themes = defaultTheme;
  }

  create<T extends keyof Theme>(type: T) {
    return this.__themes[type];
  }
}

export default VizPathTheme;
