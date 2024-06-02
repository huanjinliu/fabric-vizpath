import { fabric } from 'fabric';
import type { Theme } from 'src/lib/modules/editor-ui/index.class';

const createPath: Theme['path'] = (decorator, pathObject) => pathObject;

export default createPath;
