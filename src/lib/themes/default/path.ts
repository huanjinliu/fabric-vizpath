import { fabric } from 'fabric';
import type { Theme } from '.';

const createDefaultPath: Theme['path'] = (decorator) => {
  const path = new fabric.Path('M 0 0');

  path.set({
    stroke: '#333',
    strokeWidth: 4,
    fill: 'transparent',
  });

  return decorator(path);
};

export default createDefaultPath;
