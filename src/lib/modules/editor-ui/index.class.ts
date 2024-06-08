import { fabric } from 'fabric';
import EditorModule from '../base.class';
import Editor from '../editor/index.class';
import VizPath from '../../vizpath.class';
import defaults from 'lodash-es/defaults';

export type ThemeDecorator<InputType, OutputType = InputType> = (
  customObject: InputType,
  callback?: () => void,
) => OutputType;

export type DefaultThemeConfigurators = {
  path: (decorator: ThemeDecorator<fabric.Path>, pathObject: fabric.Path) => void;
  node: (decorator: ThemeDecorator<fabric.Object>) => fabric.Object;
  dot: (decorator: ThemeDecorator<fabric.Object>) => fabric.Object;
  line: (decorator: ThemeDecorator<fabric.Line>) => fabric.Line;
};

export type ThemeConfigurators<
  T extends Record<string, any> = Record<string, unknown>,
  Q extends Record<string, any> = Record<string, unknown>,
> = (
  editor: Editor,
  shareState: Partial<T>,
) => DefaultThemeConfigurators & {
  [p in keyof Omit<Q, keyof DefaultThemeConfigurators>]?: (decorator: ThemeDecorator<Q[p]>) => Q[p];
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
} as DefaultThemeConfigurators;

class EditorUI<
  T extends Record<string, any> = Record<string, unknown>,
  Q extends Record<string, any> = Record<string, unknown>,
> extends EditorModule {
  static ID = 'editor-ui';

  /**
   * 主题配置器
   */
  configurator: (
    editor: Editor,
    shareState: Partial<T>,
  ) => Partial<DefaultThemeConfigurators> & {
    [p in keyof Omit<Q, keyof DefaultThemeConfigurators>]?: (
      decorator: ThemeDecorator<Q[p]>,
    ) => Q[p];
  };

  /**
   * 主题
   */
  theme: ReturnType<ThemeConfigurators<T, Q>> | null = null;

  /**
   * 共享状态
   */
  shareState: Partial<T>;

  /**
   * 监听共享状态变化
   */
  private _onShareStateUpdate?: (editor: Editor, shareState: Partial<T>) => void;

  /**
   * 元素渲染更新回调映射
   */
  objectPreRenderCallbackMap = new Map<fabric.Object, () => void>([]);

  constructor(
    configurator: EditorUI<T, Q>['configurator'] = () => ({}),
    initialShareState: Partial<T> = {},
    onShareStateUpdate?: (editor: Editor, shareState: Partial<T>) => void,
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
    const theme = this.configurator(editor, this.shareState);
    this.theme = defaults(theme, DEFAULT_THEME);
  }
}

export default EditorUI;
