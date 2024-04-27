import createDefaultPath from './path';
import createDefaultNode from './node';
import createDefaultPoint from './controller-point';
import createDefaultLine from './controller-line';

export interface Theme {
  path: (
    decorator: (path: fabric.Path) => fabric.Path,
    info: Record<string, any> & {
      label?: string;
    }
  ) => fabric.Path;
  node: (
    decorator: (object: fabric.Object) => fabric.Group
  ) => fabric.Object | fabric.Group;
  controllerPoint: (
    decorator: (object: fabric.Object) => fabric.Group
  ) => fabric.Object | fabric.Group;
  controllerLine: (
    decorator: (object: fabric.Line) => fabric.Line
  ) => fabric.Line;
}

export default {
  path: createDefaultPath,
  node: createDefaultNode,
  controllerPoint: createDefaultPoint,
  controllerLine: createDefaultLine,
};
