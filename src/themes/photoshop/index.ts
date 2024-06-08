import { fabric } from 'fabric';
import type { ThemeConfigurators } from '../../lib/modules/editor-ui/index.class';

export type ThemeShareState = {
  selectedNodes: fabric.Object[];
  selectedPoint: fabric.Object | null;
  selectedLine: fabric.Line | null;
};

const photoshopTheme = ((editor, shareState) => {
  editor.on('selected', (nodes: fabric.Object[], point: fabric.Object | null) => {
    shareState.selectedNodes = nodes;
    shareState.selectedPoint = point;
    if (point) {
      shareState.selectedLine = editor.curveDots.find((i) => i.point === point)?.line ?? null;
    }
  });

  editor.on('deselected', () => {
    shareState.selectedNodes = [];
    shareState.selectedPoint = null;
    shareState.selectedLine = null;
  });

  return {
    path: (decorator, pathObject) => {
      pathObject.set({
        stroke: '#1884ec',
        strokeWidth: 1,
      });
    },
    node: (decorator) => {
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
    dot: (decorator) => {
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
    line: (decorator) => {
      const line = new fabric.Line([0, 0, 0, 0], {
        stroke: '#1884ec',
        strokeWidth: 1,
      });

      return line;
    },
  };
}) as ThemeConfigurators<ThemeShareState>;

export default photoshopTheme;
