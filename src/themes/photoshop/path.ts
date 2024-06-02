import { fabric } from 'fabric';
import type { Theme } from 'src/lib/modules/editor-ui/index.class';

const createPath: Theme['path'] = (decorator, pathObject) => {
  pathObject.set({
    stroke: '#1884ec',
    strokeWidth: 2,
  });

  return pathObject;
};

export default createPath;
