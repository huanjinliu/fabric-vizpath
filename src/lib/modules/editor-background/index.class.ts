import { fabric } from 'fabric';
import defaultsDeep from 'lodash-es/defaultsDeep';
import type VizPathEditor from '../../vizpath-editor.class';
import VizPathModule from '../../vizpath-module.class';

type EditorBackgroundOptions = {
  image?: string;
  repeat?: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat';
  noScaling?: boolean;
};

class EditorBackground extends VizPathModule {
  static ID = 'editor-background';

  options: Required<EditorBackgroundOptions> = {
    image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAAXNSR0IArs4c6QAAAK9JREFUaEPtljEKw0AMBOUijWv//5mpg0MK11ssyjCGq4ws5FkNdwznOQ/OLHM5zFKaklkKZlACGJIAUGQUwFYBSGYrGZQAVPPWmCkAyRT+ACpmqrmQmKgFigxqZxwmCnShCEUGJQBvzYX4Ry1QO+MwUQYKRSgyqrmQmKgFigxqZxwmCnShCEUGJQBvzYX4Ry1QO+MwUQYKRSgyqrmQmKjFl8z5O88vvGfmPv/07vUBoQcRCbiL/70AAAAASUVORK5CYII=',
    repeat: 'repeat',
    noScaling: false,
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

  async unload(editor: VizPathEditor) {
    const canvas = editor.canvas;
    if (!canvas) return;

    canvas.backgroundColor = undefined;
    canvas.requestRenderAll();
  }

  async load(editor: VizPathEditor) {
    const canvas = editor.canvas;
    if (!canvas) return;

    const { image: imageURL, repeat, noScaling } = this.options;
    if (imageURL) {
      await new Promise<void>((resolve) => {
        const image = new Image();
        image.onload = () => {
          const pattern = new fabric.Pattern({
            source: image,
            repeat: repeat,
            // offsetX: -(canvas.getWidth() % gridSize) / 2,
            // offsetY: -(canvas.getHeight() % gridSize) / 2,
          });
          if (noScaling) {
            canvas.on('before:render', () => {
              pattern.patternTransform = fabric.util.invertTransform(canvas.viewportTransform!);
            });
          }
          canvas.setBackgroundColor(pattern, () => {
            canvas.requestRenderAll();
            resolve();
          });
        };
        image.src = imageURL;
      });
    }

    // this._initAlignEvents(editor);
  }
}

export default EditorBackground;
