import { fabric } from 'fabric';
import defaults from 'lodash-es/defaults';
import EditorModule from '../base.class';
import defaultTheme, { type ThemeShareState } from 'src/themes/default';
import noneTheme from 'src/themes/none';
import Editor from '../editor/index.class';

export type ThemeDecorator<InputType, OutputType = InputType> = (
  customObject: InputType,
  callback?: () => void,
) => OutputType;

export interface Theme<T extends Record<string, any> = {}> {
  path: (pathObject: fabric.Path, decorator: ThemeDecorator<fabric.Path>, shareState: T) => void;
  node: (decorator: ThemeDecorator<fabric.Object>, shareState: T) => fabric.Object;
  dot: (decorator: ThemeDecorator<fabric.Object>, shareState: T) => fabric.Object;
  line: (decorator: ThemeDecorator<fabric.Line>, shareState: T) => fabric.Line;
}

class EditorUI<T extends Record<string, any> = ThemeShareState> extends EditorModule {
  static ID = 'editor-ui';

  static noneUI = noneTheme;

  static defaultUI = defaultTheme;

  options: Theme<T>;

  /**
   * 共享状态
   */
  shareState: T;

  /**
   * 元素渲染更新回调映射
   */
  objectPreRenderCallbackMap = new Map<fabric.Object, () => void>([]);

  constructor(options: Partial<Theme<T>> = EditorUI.defaultUI, initialShareState: T = {} as T) {
    super();
    this.options = defaults(options, EditorUI.noneUI);
    this.shareState = (initialShareState ?? {}) as T;
  }

  /**
   * 重新渲染对象样式
   */
  refresh() {
    const editor = this.vizPath?.context.find(Editor);
    if (!editor) return;

    const canvas = editor.canvas;
    if (!canvas) return;

    canvas?._objects.map((object) => {
      this.objectPreRenderCallbackMap.get(object)?.();
    });
  }

  unload() {
    this.shareState = {} as T;
    this.objectPreRenderCallbackMap.clear();
  }

  load() {
    this.shareState = new Proxy(this.shareState, {
      // 每次共享状态修改都会触发UI更新
      set: (target, p, newValue, receiver) => {
        const needRefresh = target[p as string] !== newValue;
        const result = Reflect.set(target, p, newValue, receiver);
        if (needRefresh) this.refresh();
        return result;
      },
    });
  }
}

export default EditorUI;
