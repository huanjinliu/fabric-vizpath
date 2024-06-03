import defaults from 'lodash-es/defaults';
import EditorModule from '../base.class';
import defaultTheme from 'src/themes/default';
import noneTheme from 'src/themes/none';
import type VizPathCreator from 'src/lib';

export type ThemeDecorator<InputType, OutputType = InputType> = (
  customObject: InputType,
  callback?: (context: VizPathCreator, object: OutputType) => void,
) => OutputType;

export interface Theme {
  path: (decorator: ThemeDecorator<fabric.Path>, pathObject: fabric.Path) => fabric.Path;
  node: (decorator: ThemeDecorator<fabric.Object>) => fabric.Object;
  dot: (decorator: ThemeDecorator<fabric.Object>) => fabric.Object;
  line: (decorator: ThemeDecorator<fabric.Line>) => fabric.Line;
}

class EditorUI extends EditorModule {
  static ID = 'editor-ui';

  static noneUI = noneTheme;

  static defaultUI = defaultTheme;

  options: Theme = EditorUI.defaultUI;

  constructor(options: Partial<Theme> = {}) {
    super();
    this.options = defaults(options, this.options);
  }
}

export default EditorUI;
