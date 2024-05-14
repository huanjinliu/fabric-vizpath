import defaults from 'lodash-es/defaults';
import EditorModule from '../base.class';
import defaultTheme from 'src/themes/default';
import noneTheme from 'src/themes/none';
import type VizPathContext from 'src/lib';

export type ThemeDecorator<InputType, OutputType = InputType> = (
  customObject: InputType,
  callback?: (context: VizPathContext, object: OutputType) => void,
) => OutputType;

export interface Theme {
  path: (
    decorator: ThemeDecorator<fabric.Path>,
    originPath: fabric.Path
  ) => fabric.Path;
  node: (
    decorator: ThemeDecorator<fabric.Object>
  ) => fabric.Object;
  controllerPoint: (
    decorator: ThemeDecorator<fabric.Object>
  ) => fabric.Object;
  controllerLine: (
    decorator: ThemeDecorator<fabric.Line>
  ) => fabric.Line;
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
