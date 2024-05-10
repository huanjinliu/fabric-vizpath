import { fabric } from 'fabric';
import type { Theme } from '..';

const createDefaultLine: Theme['controllerLine'] = (decorator) => {
  const line = new fabric.Line([0, 0, 0, 0], {
    stroke: '#bebebe',
    strokeWidth: 1,
    strokeDashArray: [4, 3],
  });

  return decorator(line);
}

export default createDefaultLine;