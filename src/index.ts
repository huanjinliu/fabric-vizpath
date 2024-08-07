/**
 * 基础类
 */
export { default as Path } from './lib/vizpath.class';
export { default as VizPath } from './lib/vizpath.class';
export { default as VizPathEditor } from './lib/vizpath-editor.class';
export { default as VizPathTheme } from './lib/vizpath-theme.class';
export { default as VizPathEvent } from './lib/vizpath-event.class';
export { default as VizPathDOMEvent } from './lib/vizpath-dom-event.class';
export { default as VizPathModule } from './lib/vizpath-module.class';
export type { PathNode, PathSegment, Instruction, InstructionType } from './lib/vizpath.class';

/**
 * 内置模块类
 */
export { default as EditorBackground } from './lib/modules/editor-background/index.class';
export { default as EditorShortcut } from './lib/modules/editor-shortcut/index.class';
export { default as EditorResize } from './lib/modules/editor-resize/index.class';
export { default as EditorMove } from './lib/modules/editor-move/index.class';
export { default as EditorZoom } from './lib/modules/editor-zoom/index.class';
export { default as EditorTheme } from './lib/modules/editor-theme/index.class';
// export { default as EditorBezier } from './lib/modules/editor-bezier/index.class';
export { default as EditorTrack } from './lib/modules/editor-track/index.class';
export { default as EditorSplitDot } from './lib/modules/editor-split-dot/index.class';

/**
 * 共用方法
 */
export * as utils from './lib/utils';
