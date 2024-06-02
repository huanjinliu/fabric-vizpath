import { fabric } from 'fabric';
import type { Theme } from 'src/lib/modules/editor-ui/index.class';

const createPath: Theme['path'] = (decorator, pathObject) => {
  pathObject.set({
    stroke: '#333',
    strokeWidth: 4,
    fill: 'transparent',
    strokeUniform: true,
  });

  return pathObject;
};

export default createPath;
