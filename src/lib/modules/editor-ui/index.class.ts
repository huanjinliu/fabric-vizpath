import { defaults } from 'lodash-es';
import EditorModule from '../base.class';
import { defaultTheme, noneTheme } from '../../themes';
import type { Theme } from '../../themes';

class EditorUI extends EditorModule {
  static ID = Symbol('editor-ui');

  static noneUI = noneTheme;

  static defaultUI = defaultTheme;

  options: Theme = EditorUI.defaultUI;

  constructor(options: Partial<Theme> = {}) {
    super();
    this.options = defaults(options, this.options);
  }
}

export default EditorUI;
