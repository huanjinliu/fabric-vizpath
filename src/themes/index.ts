export interface Theme {
  path: (
    decorator: (path: fabric.Path) => fabric.Path,
    originPath: fabric.Path
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

export { default as noneTheme } from './none';
export { default as defaultTheme } from './default';