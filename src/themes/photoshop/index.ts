import { fabric } from 'fabric';
import type { Theme } from 'src/lib/modules/editor-ui/index.class';

export type ThemeShareState = {
  hoverObject?: fabric.Object;
  selectedNodes?: fabric.Object[];
  selectedPoint?: fabric.Object;
  test: string;
};

export default {
  path: (pathObject) => {
    pathObject.set({
      stroke: '#1884ec',
      strokeWidth: 2,
    });
    return pathObject;
  },
  node: (decorator, shareState) => {
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
  dot: (decorator, shareState) => {
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
  line: () => {
    const line = new fabric.Line([0, 0, 0, 0], {
      stroke: '#1884ec',
      strokeWidth: 1,
    });

    return line;
  },
} as Theme<ThemeShareState>;
