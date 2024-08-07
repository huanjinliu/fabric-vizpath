import VizPathEditor from '../../vizpath-editor.class';
import VizPathModule from '../../vizpath-module.class';
import VizPathEvent from '../../vizpath-event.class';

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
    ['state-update']: (editor: VizPathEditor, shareState: ShareState) => void;
  }>();

  /**
   * 主题配置器
   */
  private _configurators = new Map<
    VizPathEditor | VizPathModule,
    (editor: VizPathEditor, shareState: ShareState) => Partial<VizPathModule['themes']['__themes']>
  >();

  /**
   * 暂存配置器
   */
  private _stashConfigurators: (
    | {
        module: null;
        configurator: (
          editor: VizPathEditor,
          shareState: ShareState,
        ) => Partial<VizPathEditor['themes']['__themes']>;
      }
    | {
        module: VizPathModule;
        configurator: (
          editor: VizPathEditor,
          shareState: ShareState,
        ) => Partial<VizPathModule['themes']['__themes']>;
      }
  )[] = [];

  /**
   * 临时共享状态的getter观察者
   */
  private _tempStateGetterObservers = new Set<Set<keyof ShareState>>([]);

  /**
   * 渲染依赖
   */
  private _rerenderDependencies = new Map<keyof ShareState, Set<() => void>>([]);

  constructor(
    editorConfigurator: (
      editor: VizPathEditor,
      shareState: ShareState,
    ) => Partial<VizPathEditor['themes']['__themes']>,
    initialShareState: ShareState,
  ) {
    super();
    this.shareState = initialShareState;
    this._stashConfigurators.push({
      module: null,
      configurator: editorConfigurator,
    });
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

  /**
   * 注入配置
   */
  private _injectConfigurations() {
    const editor = this.editor;
    if (!editor) return;

    this._stashConfigurators.forEach(({ module, configurator }) => {
      this._configurators.set(module ?? editor, (editor, shareState) => {
        const themes = configurator(editor, shareState);

        for (const themeKey in themes) {
          const theme = themes[themeKey] as any;
          themes[themeKey] = ((decorator: ThemeDecorator<any>, ...args: any[]) => {
            return theme(
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
    });
    this._stashConfigurators.length = 0;

    Array.from(this._configurators.entries()).forEach(([module, configurator]) => {
      module.themes.__themes = {
        ...module.themes.__themes,
        ...configurator(editor, this.shareState),
      } as typeof module.themes.__themes;
    });
  }

  /**
   * 配置模块内部主题
   * @param module 模块
   * @param configurator 模块主题配置回调
   *
   * @note
   * 注意配置时机，建议在模块创建画布对象前配置，如时机不对，主题的变化不会达到预期；
   * 更好的配置时机是编辑器挂载画布前进行统一配置。
   */
  configure<Module extends VizPathModule>(
    module: Module,
    configurator: (
      editor: VizPathEditor,
      shareState: ShareState,
    ) => Partial<Module['themes']['__themes']>,
  ) {
    this._stashConfigurators.push({
      module,
      configurator,
    });
    // 若已经挂载画布，则配置后直接注入配置
    if (this.editor?.canvas) {
      this._injectConfigurations();
    }
  }

  unload() {
    this.shareState = {} as ShareState;
    this.events.clear();
    this._rerenderDependencies.forEach((set) => {
      set.clear();
    });
    this._rerenderDependencies.clear();
    this._configurators.clear();
  }

  load(editor: VizPathEditor) {
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
          this.events.fire('state-update', editor, this.shareState);

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

    this._injectConfigurations();
  }
}

export default EditorTheme;
