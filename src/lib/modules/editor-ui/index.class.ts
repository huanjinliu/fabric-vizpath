import { defaults } from 'lodash-es';
import defaultTheme from '../../themes/default';
import type { Theme } from '../../themes/default';
import EditorModule from '../base.class';

class EditorUI extends EditorModule {
  static ID = Symbol('editor-ui');

  static defaultUI = defaultTheme;

  options: Theme = EditorUI.defaultUI;

  constructor(options: Partial<Theme> = {}) {
    super();
    this.options = defaults(options, this.options);
  }
}

export default EditorUI;
