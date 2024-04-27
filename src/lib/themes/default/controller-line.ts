import { fabric } from 'fabric';
import type { Theme } from '.';

const createDefaultLine: Theme['controllerLine'] = (decorator) => {
  const line = new fabric.Line([0, 0, 0, 0], {
    stroke: '#bebebe',
    strokeWidth: 1,
    strokeDashArray: [4, 3],
    strokeUniform: true,
    selectable: false,
    evented: false,
    originX: 'center',
    originY: 'center',
  });

  return decorator(line);
}

export default createDefaultLine;