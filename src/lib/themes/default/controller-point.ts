import { fabric } from 'fabric';
import type { Theme } from '.';

const createDefaultPoint: Theme['controllerPoint'] = (decorator) => {
  const circle = new fabric.Circle({
    radius: 4,
    fill: '#bebebe',
    stroke: '#bebebe',
    strokeWidth: 2,
    originX: 'center',
    originY: 'center',
  });

  const object = decorator(circle);
  object.on('selected', () => {
    circle.set({
      stroke: '#333',
    });
    object.canvas?.renderAll();
  });

  object.on('deselected', () => {
    circle.set({
      stroke: '#bebebe',
    });
    object.canvas?.renderAll();
  });

  return object;
};

export default createDefaultPoint;
