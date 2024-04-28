import { fabric } from 'fabric';
import type { Theme } from '..';

const createDefaultPath: Theme['path'] = (decorator, originPath) => {
  const path = new fabric.Path();

  path.set(originPath.toJSON() as any);

  const { x, y } = originPath.pathOffset;
  path.pathOffset = new fabric.Point(x, y);

  path.set({
    stroke: '#333',
    strokeWidth: 4,
    fill: 'transparent',
  });

  return decorator(path);
};

export default createDefaultPath;
