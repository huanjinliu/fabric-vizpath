import { fabric } from 'fabric';
import EditorNode from 'src/lib/modules/editor-node/index.class';
import type { Theme } from 'src/lib/modules/editor-ui/index.class';

const createCurveDot: Theme['dot'] = (decorator) => {
  const circle = new fabric.Circle({
    radius: 3,
    fill: '#ffffff',
    stroke: '#4b4b4bcc',
    strokeWidth: 1,
    strokeDashArray: [1, 1],
  });

  return circle;
};

export default createCurveDot;
