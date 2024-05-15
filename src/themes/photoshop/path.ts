import { fabric } from 'fabric';
import type { Theme } from 'src/lib/modules/editor-ui/index.class';

const createPath: Theme['path'] = (decorator, originPath) => {
  originPath.set({
    stroke: '#1884ec',
    strokeWidth: 2,
  });

  return originPath;
};

export default createPath;
