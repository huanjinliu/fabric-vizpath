import { fabric } from 'fabric';
import type { Theme } from 'src/lib/modules/editor-ui/index.class';

const createPoint: Theme['controllerPoint'] = () => {
  const circle = new fabric.Circle({
    radius: 4,
    fill: '#ffffff',
    stroke: '#bebebe',
    strokeWidth: 2,
  });

  return circle;
};

export default createPoint;
