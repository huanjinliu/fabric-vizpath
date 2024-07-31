import { fabric } from 'fabric';
import type VizPathEditor from '../../lib/vizpath-editor.class';
import type { ThemeDecorator } from '../../lib/modules/editor-theme/index.class';

export type ThemeShareState = {
  selectedNodes: fabric.Object[];
  selectedPoint: fabric.Object | null;
  selectedLine: fabric.Line | null;
};

const photoshopTheme = (editor: VizPathEditor, shareState: ThemeShareState) => {
  editor.events.on('selected', (nodes: fabric.Object[], point: fabric.Object | null) => {
    shareState.selectedNodes = nodes;
    shareState.selectedPoint = point;
    if (point) {
      shareState.selectedLine =
        editor.deformers.find((i) => i.curveDot === point)?.curveBar ?? null;
    }
  });

  editor.events.on('deselected', () => {
    shareState.selectedNodes = [];
    shareState.selectedPoint = null;
    shareState.selectedLine = null;
  });

  return {
    path: (decorator: ThemeDecorator<fabric.Path>, pathObject: fabric.Path) => {
      pathObject.set({
        stroke: '#1884ec',
        strokeWidth: 1,
      });
    },
    node: (decorator: ThemeDecorator<fabric.Object>) => {
      const rect = new fabric.Rect({
        width: 6,
        height: 6,
        fill: '#ffffff',
        stroke: '#1784ec',
        strokeWidth: 1,
      });

      return decorator(rect, () => {
        rect.set({
          fill: shareState.selectedNodes?.includes(rect) ? '#1884ec' : '#ffffff',
        });
      });
    },
    dot: (decorator: ThemeDecorator<fabric.Object>) => {
      const circle = new fabric.Circle({
        radius: 3,
        fill: '#ffffff',
        stroke: '#1884ec',
        strokeWidth: 1,
      });

      return decorator(circle, () => {
        circle.set({
          fill: shareState.selectedPoint === circle ? '#1884ec' : '#ffffff',
        });
      });
    },
    line: (decorator: ThemeDecorator<fabric.Line>) => {
      const line = new fabric.Line([0, 0, 0, 0], {
        stroke: '#1884ec',
        strokeWidth: 1,
      });

      return line;
    },
  };
};

export default photoshopTheme;
