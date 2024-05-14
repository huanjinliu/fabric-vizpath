import { fabric } from 'fabric';
import type { Theme } from 'src/lib/modules/editor-ui/index.class';

const createPath: Theme['path'] = (decorator, originPath) => {
  originPath.set({
    stroke: '#333',
    strokeWidth: 4,
    fill: 'transparent',
    strokeUniform: true,
    backgroundColor: 'rgba(255, 0, 0, 0.2)'
  });

  return originPath;
};

export default createPath;
