import { fabric } from 'fabric';
import type Vizpath from '../../vizpath.class';
import EditorModule from '../base.class';
import Editor from '../editor/index.class';

class EditorBackground extends EditorModule {
  static ID = Symbol('editor-background');

  load(vizPath: Vizpath) {
    const editor = vizPath.context.find(Editor);
    if (!editor) {
      return;
    }

    const canvas = editor.canvas;
    if (!canvas) {
      return;
    }

    const size = 50;

    const grid = new fabric.Rect({
      width: size,
      height: size,
      fill: 'transparent',
      stroke: '#f1f1f1',
      strokeWidth: 1,
      strokeDashArray: [4, 2],
    });

    return new Promise<void>((resolve) => {
      const image = new Image();
      image.onload = () => {
        canvas.setBackgroundColor(
          new fabric.Pattern({
            source: image,
            repeat: 'repeat',
            offsetX: -(canvas.getWidth() % size) / 2,
            offsetY: -(canvas.getHeight() % size) / 2,
          }),
          () => {
            canvas.renderAll();
            resolve();
          }
        );
      };
      image.src = grid.toDataURL({});
    });
  }
}

export default EditorBackground;
