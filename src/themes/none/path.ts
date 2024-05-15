import { fabric } from 'fabric';
import type { Theme } from 'src/lib/modules/editor-ui/index.class';

const createPath: Theme['path'] = (decorator, originPath) => originPath;

export default createPath;
