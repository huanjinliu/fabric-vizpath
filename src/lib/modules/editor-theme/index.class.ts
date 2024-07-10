import VizPath from '../../vizpath.class';
import VizPathModule from '../../vizpath-module.class';
import VizPathEvent from '../../../lib/vizpath-event.class';

export type ThemeDecorator<InputType, OutputType = InputType> = (
  customObject: InputType,
  callback?: () => void,
) => OutputType;

class EditorTheme<
  ShareState extends Record<string, any> = Record<string, unknown>,
> extends VizPathModule {
  static ID = 'editor-theme';

  /**
   * 共享状态
   */
  shareState: ShareState;

  events = new VizPathEvent<{
    ['state-update']: (vizpath: VizPath, shareState: ShareState) => void;
  }>();

  /**
   * 主题配置器
   */
  private _configurators = new WeakMap<
    VizPathModule,
    (vizpath: VizPath, shareState: ShareState) => Partial<VizPathModule['themes']['__themes']>
  >();

  /**
   * 临时共享状态的getter观察者
   */
  private _tempStateGetterObservers = new Set<Set<keyof ShareState>>([]);

  /**
   * 渲染依赖
   */
  private _rerenderDependencies = new Map<keyof ShareState, Set<() => void>>([]);

  constructor(initialShareState: ShareState) {
    super();
    this.shareState = initialShareState;
  }

  /**
   * 观测回调
   */
  private _observeCallback(callback: () => void) {
    const dependencyObserver = new Set([]);
    this._tempStateGetterObservers.add(dependencyObserver);
    callback();
    this._tempStateGetterObservers.delete(dependencyObserver);
    // 如该元素后续的更新依赖状态变化
    if (dependencyObserver.size) {
      dependencyObserver.forEach((key) => {
        const dependencies = this._rerenderDependencies.get(key) ?? new Set([]);
        dependencies.add(callback);
        this._rerenderDependencies.set(key, dependencies);
      });
    }
  }

  configure<Module extends VizPathModule>(
    module: Module,
    configurator: (
      vizpath: VizPath,
      shareState: ShareState,
    ) => Partial<Module['themes']['__themes']>,
  ) {
    this._configurators.set(module, (editor, shareState) => {
      const themes = configurator(editor, shareState);

      for (const themeKey in themes) {
        const theme = themes[themeKey];
        themes[themeKey] = ((decorator: ThemeDecorator<any>, ...args: any[]) => {
          return theme!(
            (customObject, callback) => {
              decorator(customObject);
              if (callback) {
                const _added = () => {
                  this._observeCallback(callback);
                  customObject.canvas.requestRenderAll();
                };
                const _removed = () => {
                  this._rerenderDependencies.forEach((set) => {
                    set.delete(callback);
                  });
                };
                customObject.on('added', _added);
                customObject.on('removed', _removed);
              }
              return customObject;
            },
            ...args,
          );
        }) as typeof theme;
      }

      return themes;
    });
  }

  unload() {
    this.shareState = {} as ShareState;
    this.events.clear();
    this._rerenderDependencies.forEach((set) => {
      set.clear();
    });
    this._rerenderDependencies.clear();
  }

  load(vizpath: VizPath) {
    const editor = vizpath.editor;
    if (!editor) {
      throw new TypeError('Please use editor module before using ui module.');
    }

    const canvas = editor.canvas;
    if (!canvas) return;

    this.shareState = new Proxy(this.shareState, {
      get: (target, p, receiver) => {
        if (p in target) {
          this._tempStateGetterObservers.forEach((observer) => observer.add(p as string));
        }
        return Reflect.get(target, p, receiver);
      },
      // 每次共享状态修改都会触发UI更新
      set: (target, p, newValue, receiver) => {
        const needRerender = target[p as string] !== newValue;
        const result = Reflect.set(target, p, newValue, receiver);
        if (needRerender) {
          this.events.fire('state-update', vizpath, this.shareState);

          // 重新渲染
          const callbackSet = this._rerenderDependencies.get(p as string);
          if (callbackSet) {
            const callbacks: (() => void)[] = [];
            callbackSet.forEach((callback) => {
              this._rerenderDependencies.forEach((set) => {
                set.delete(callback);
              });
              callbacks.push(callback);
            });
            callbacks.forEach((callback) => {
              this._observeCallback(callback);
            });
            callbacks.length = 0;
          }

          canvas.requestRenderAll();
        }
        return result;
      },
    });

    vizpath.modules.forEach((module) => {
      const configurator = this._configurators.get(module);
      if (!configurator) return;

      module.themes.__themes = {
        ...module.themes.__themes,
        ...configurator(vizpath, this.shareState),
      } as typeof module.themes.__themes;
    });
  }
}

export default EditorTheme;
