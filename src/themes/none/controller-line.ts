import { fabric } from 'fabric';
import type { Theme } from '..';

const createDefaultLine: Theme['controllerLine'] = (decorator) => {
  const line = new fabric.Line([0, 0, 0, 0], {
    stroke: '#1884ec',
    strokeWidth: 1,
  });

  return decorator(line);
}

export default createDefaultLine;