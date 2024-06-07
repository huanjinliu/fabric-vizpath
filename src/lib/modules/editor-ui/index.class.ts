import { fabric } from 'fabric';
import EditorModule from '../base.class';
import Editor from '../editor/index.class';
import VizPath from '../../vizpath.class';

export type ThemeDecorator<InputType, OutputType = InputType> = (
  customObject: InputType,
  callback?: () => void,
) => OutputType;

export type ThemeConfigurator<T extends Record<string, any> = object> = (
  editor: Editor,
  shareState: T,
) => {
  path?: (decorator: ThemeDecorator<fabric.Path>, pathObject: fabric.Path) => void;
  node: (decorator: ThemeDecorator<fabric.Object>) => fabric.Object;
  dot: (decorator: ThemeDecorator<fabric.Object>) => fabric.Object;
  line: (decorator: ThemeDecorator<fabric.Line>) => fabric.Line;
  splitDot?: (decorator: ThemeDecorator<fabric.Object>) => fabric.Object;
};

export const DEFAULT_THEME = {
  path: (decorator, pathObject) => {
    pathObject.set({
      stroke: '#4b4b4b',
      strokeWidth: 1,
    });
  },
  node: () => {
    const circle = new fabric.Circle({
      radius: 3,
      fill: '#ffffff',
      stroke: '#4b4b4b',
      strokeWidth: 1,
    });

    return circle;
  },
  splitDot: () => {
    const circle = new fabric.Circle({
      radius: 3,
      fill: '#ffffff',
      stroke: '#4b4b4b',
      strokeWidth: 1,
    });

    return circle;
  },
  dot: () => {
    const circle = new fabric.Circle({
      radius: 3,
      fill: '#ffffff',
      stroke: '#4b4b4bcc',
      strokeWidth: 1,
      strokeDashArray: [1, 1],
    });

    return circle;
  },
  line: () => {
    const line = new fabric.Line([0, 0, 0, 0], {
      stroke: '#bebebe',
      strokeWidth: 1,
    });

    return line;
  },
} as Required<ReturnType<ThemeConfigurator<object>>>;

class EditorUI<T extends Record<string, any> = object> extends EditorModule {
  static ID = 'editor-ui';

  /**
   * 主题配置器
   */
  configurator: ThemeConfigurator<T>;

  /**
   * 主题
   */
  theme: Required<ReturnType<ThemeConfigurator<T>>> | null = null;

  /**
   * 共享状态
   */
  shareState: T;

  /**
   * 监听共享状态变化
   */
  private _onShareStateUpdate?: (editor: Editor, shareState: T) => void;

  /**
   * 元素渲染更新回调映射
   */
  objectPreRenderCallbackMap = new Map<fabric.Object, () => void>([]);

  constructor(
    configurator: ThemeConfigurator<T>,
    initialShareState: T,
    onShareStateUpdate?: (editor: Editor, shareState: T) => void,
  ) {
    super();
    this.configurator = configurator;
    this.shareState = initialShareState;
    this._onShareStateUpdate = onShareStateUpdate;
  }

  /**
   * 重新渲染对象样式
   */
  refresh() {
    const editor = this.vizpath?.context.find(Editor);
    if (!editor) return;

    const canvas = editor.canvas;
    if (!canvas) return;

    this._onShareStateUpdate?.(editor, this.shareState);

    this.objectPreRenderCallbackMap.forEach((callback) => callback());
    canvas.requestRenderAll();
  }

  unload() {
    this.theme = null;
    this.shareState = {} as T;
    this._onShareStateUpdate = undefined;
    this.objectPreRenderCallbackMap.clear();
  }

  load(vizpath: VizPath) {
    const editor = vizpath.context.find(Editor);
    if (!editor) {
      throw new TypeError('Please use editor module before using ui module.');
    }
    this.shareState = new Proxy(this.shareState, {
      // 每次共享状态修改都会触发UI更新
      set: (target, p, newValue, receiver) => {
        const needRefresh = target[p as string] !== newValue;
        const result = Reflect.set(target, p, newValue, receiver);
        if (needRefresh) this.refresh();
        return result;
      },
    });
    const { path, node, splitDot, dot, line } = this.configurator(editor, this.shareState);
    this.theme = {
      path: path ?? ((decorator, pathObject) => pathObject),
      splitDot: splitDot ?? node,
      node,
      dot,
      line
    };
  }
}

export default EditorUI;
