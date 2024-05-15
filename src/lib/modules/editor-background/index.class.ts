import { fabric } from "fabric";
import defaultsDeep from "lodash-es/defaultsDeep";
import type Vizpath from "../../vizpath.class";
import EditorModule from "../base.class";
import Editor from "../editor/index.class";

type EditorBackgroundOptions = {
  grid?: boolean;
  gridSize?: number;
  gridStyle?: Partial<{
    stroke: string;
    strokeWidth: number;
    strokeDashArray: number[];
  }>;
};

class EditorBackground extends EditorModule {
  static ID = "editor-background";

  options: Required<EditorBackgroundOptions> = {
    grid: true,
    gridSize: 50,
    gridStyle: {
      stroke: "rgba(0, 0, 0, 0.05)",
      strokeWidth: 1,
      strokeDashArray: [4, 2],
    },
  };

  constructor(options: EditorBackgroundOptions = {}) {
    super();
    this.options = defaultsDeep(options, this.options);
  }

  // private _initAlignEvents(editor: Editor) {
  //   const canvas = editor.canvas;
  //   if (!canvas) return;

  //   editor.on("canvas", "mouse:move", (e) => {
  //     const { gridSize } = this.options;
  //     const globalOffset = {
  //       x: -(canvas.getWidth() % gridSize) / 2,
  //       y: -(canvas.getHeight() % gridSize) / 2,
  //     };
  //     const pointOffset = {
  //       x: (e.pointer.x - globalOffset.x) % gridSize,
  //       y: (e.pointer.y - globalOffset.y) % gridSize,
  //     };

  //     const stickyValue = 2;
  //     if (
  //       (pointOffset.x < stickyValue ||
  //       pointOffset.x > gridSize - stickyValue) &&
  //       (pointOffset.y < stickyValue ||
  //       pointOffset.y > gridSize - stickyValue)
  //     ) {
  //       console.log(pointOffset);
  //     }
  //   });
  // }

  async load(vizPath: Vizpath) {
    const editor = vizPath.context.find(Editor);
    if (!editor) return;

    const canvas = editor.canvas;
    if (!canvas) return;

    const { grid, gridSize, gridStyle } = this.options;
    if (grid && gridSize > 0) {
      const pattern = new fabric.Group([
        new fabric.Line([0, 0, gridSize, 0], gridStyle),
        new fabric.Line([0, 0, 0, gridSize], gridStyle),
      ]);

      await new Promise<void>((resolve) => {
        const image = new Image();
        image.onload = () => {
          canvas.setBackgroundColor(
            new fabric.Pattern({
              source: image,
              repeat: "repeat",
              offsetX: -(canvas.getWidth() % gridSize) / 2,
              offsetY: -(canvas.getHeight() % gridSize) / 2,
            }),
            () => {
              canvas.requestRenderAll();
              resolve();
            }
          );
        };
        image.src = pattern.toDataURL({});
      });
    }

    // this._initAlignEvents(editor);
  }
}

export default EditorBackground;
