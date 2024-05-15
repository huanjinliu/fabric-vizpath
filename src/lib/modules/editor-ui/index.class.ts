import defaults from "lodash-es/defaults";
import EditorModule from "../base.class";
import defaultTheme from "src/themes/default";
import noneTheme from "src/themes/none";
import type VizPathContext from "src/lib";
import type VizPath from "../../vizpath.class";
import Editor from "../editor/index.class";

export type ThemeDecorator<InputType, OutputType = InputType> = (
  customObject: InputType,
  callback?: (context: VizPathContext, object: OutputType) => void
) => OutputType;

type EditorUIOptions = {
  selectionColor: string;
  selectionBorderColor: string;
  selectionDashArray: number[];
  selectionLineWidth: number;
};

export interface Theme {
  path: (
    decorator: ThemeDecorator<fabric.Path>,
    originPath: fabric.Path
  ) => fabric.Path;
  node: (decorator: ThemeDecorator<fabric.Object>) => fabric.Object;
  controllerPoint: (decorator: ThemeDecorator<fabric.Object>) => fabric.Object;
  controllerLine: (decorator: ThemeDecorator<fabric.Line>) => fabric.Line;
}

class EditorUI extends EditorModule {
  static ID = "editor-ui";

  static noneUI = noneTheme;

  static defaultUI = defaultTheme;

  options: Partial<EditorUIOptions> & Theme = EditorUI.defaultUI;

  constructor(options: Partial<EditorUIOptions & Theme> = {}) {
    super();
    this.options = defaults(options, this.options);
  }

  load(vizPath: VizPath): void {
    const editor = vizPath.context.find(Editor);
    const {
      selectionColor,
      selectionBorderColor,
      selectionDashArray,
      selectionLineWidth,
    } = this.options;
    if (editor?.canvas) {
      if (selectionColor) editor.canvas.selectionColor = selectionColor;
      if (selectionBorderColor)
        editor.canvas.selectionBorderColor = selectionBorderColor;
      if (selectionDashArray)
        editor.canvas.selectionDashArray = selectionDashArray;
      if (selectionLineWidth)
        editor.canvas.selectionLineWidth = selectionLineWidth;
    }
  }
}

export default EditorUI;
