import { fabric } from 'fabric';
import type { Theme } from '..';

const createDefaultPoint: Theme['controllerPoint'] = (decorator) => {
  const circle = new fabric.Circle({
    radius: 3,
    fill: '#ffffff',
    stroke: '#1884ec',
    strokeWidth: 1,
  });

  const object = decorator(circle);
  object.on('selected', () => {
    circle.set({
      fill: '#1884ec',
    });
    object.canvas?.requestRenderAll();
  });

  object.on('deselected', () => {
    circle.set({
      fill: '#ffffff',
    });
    object.canvas?.requestRenderAll();
  });

  return object;
};

export default createDefaultPoint;
