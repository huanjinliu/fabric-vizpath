import { fabric } from 'fabric';
import type { Theme } from 'src/lib/modules/editor-ui/index.class';

export default {
  path: (pathObject) => {},
  node: () => {
    const circle = new fabric.Circle({
      radius: 3,
      fill: '#ffffff',
      stroke: '#4b4b4b',
      strokeWidth: 1,
    });

    return circle;
  },
  dot: () => {
    const circle = new fabric.Circle({
      radius: 3,
      fill: '#ffffff',
      stroke: '#4b4b4bcc',
      strokeWidth: 1,
      strokeDashArray: [1, 1],
    });

    return circle;
  },
  line: () => {
    const line = new fabric.Line([0, 0, 0, 0], {
      stroke: '#bebebe',
      strokeWidth: 1,
    });

    return line;
  },
} as Theme;
