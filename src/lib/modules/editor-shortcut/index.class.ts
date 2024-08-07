import isEqual from 'lodash-es/isEqual';
import type VizPathEditor from '../../vizpath-editor.class';
import VizPathModule from '../../vizpath-module.class';

const COMBINATION_KEYS = ['alt', 'ctrl', 'shift', 'meta'] as const;

type CombinationKey = (typeof COMBINATION_KEYS)[number];

type Shortcut<ReturnValue = any> = {
  key?: string;
  combinationKeys: CombinationKey[];
  onActivate: (e: KeyboardEvent) => ReturnValue;
  onDeactivate?: (e: KeyboardEvent, returnValue: ReturnValue) => void;
};

type ShortcutOptions<ReturnValue = any> = Partial<Shortcut<ReturnValue>>;

class EditorShortcut extends VizPathModule {
  static ID = 'editor-shortcut';

  verbose = false;

  shortcuts: Shortcut[] = [];

  shortcutOptions: ShortcutOptions[];

  activeShortcut?: {
    shortcut: Shortcut;
    returnValue: any;
  };

  private _preEvent?: KeyboardEvent | undefined;

  /**
   * 快捷键模块初始化
   * @param shortcuts 快捷键配置列表
   * @param verbose 输出每次的按键信息，默认false
   */
  constructor(shortcuts: ShortcutOptions[] = [], verbose = false) {
    super();

    this.shortcutOptions = shortcuts;
    this.verbose = verbose;
  }

  private _verbose(e: KeyboardEvent, activeShortcut: Shortcut | undefined, callback: () => void) {
    if (!this.verbose) callback();
    else {
      const isLogActivateInfo = activeShortcut && activeShortcut !== this.activeShortcut?.shortcut;

      const activateKeys = isLogActivateInfo
        ? [activeShortcut.combinationKeys, activeShortcut.key]
        : [COMBINATION_KEYS.filter((i) => e[`${i}Key`]), { Control: 'ctrl' }[e.key] ?? e.key];
      const activateInfo = [
        ...new Set(
          activateKeys
            .flat(Infinity)
            .map((i) => (i as string).toUpperCase())
            .filter(Boolean),
        ),
      ].join(' + ');

      console.groupCollapsed(
        `%cVizPath Shortcut Event: ${e.type} > ${activateInfo.toUpperCase()}`,
        `color:${isLogActivateInfo ? 'lightgreen' : 'gray'}`,
      );

      console.groupCollapsed('Keyboard Event');
      console.log(e);
      console.groupEnd();

      if (this.activeShortcut && this.activeShortcut.shortcut !== activeShortcut) {
        console.groupCollapsed('Deactivate Shortcut');
        console.log(this.activeShortcut.shortcut);
        console.groupEnd();
      }

      if (isLogActivateInfo) {
        console.groupCollapsed('Activate Shortcut');
        console.log(activeShortcut);
        console.groupEnd();
      }

      console.groupCollapsed('Other Logs');
      callback();
      console.groupEnd();
      console.groupEnd();
    }
  }

  private _tryGetValidShortcut(shortcut: ShortcutOptions) {
    if (!shortcut.onActivate && !shortcut.onDeactivate) return;
    if (!shortcut.key && !shortcut.combinationKeys) return;

    const _shortcut = {
      onActivate: shortcut.onActivate,
      onDeactivate: shortcut.onDeactivate,
    } as Shortcut;

    _shortcut.key = shortcut.key;

    if (!shortcut.combinationKeys) _shortcut.combinationKeys = [];
    else _shortcut.combinationKeys = [...shortcut.combinationKeys];

    _shortcut.key;
    _shortcut.combinationKeys.sort();

    return _shortcut;
  }

  private _handlePageDeactivate(e: FocusEvent) {
    if (this.activeShortcut) {
      this.activeShortcut.shortcut.onDeactivate?.(e as any, this.activeShortcut.returnValue);
      this.activeShortcut = undefined;
    }
  }

  private _checkIfEventSame(newEvent: KeyboardEvent, oldEvent: KeyboardEvent) {
    if (newEvent.type !== oldEvent.type) return false;
    if (newEvent.key !== oldEvent.key) return false;
    return COMBINATION_KEYS.every((key) => newEvent[key] === oldEvent[key]);
  }

  private _handleShortcutKey(e: KeyboardEvent) {
    if (this._preEvent && this._checkIfEventSame(e, this._preEvent)) return;

    const activateKeys = this.shortcuts.filter((shortcut) => {
      const { key, combinationKeys = [] } = shortcut;

      const activateKey =
        !key ||
        key.toUpperCase() === (e.key ?? '').toUpperCase() ||
        `KEY${key.toUpperCase()}` === e.code.toUpperCase();

      if (
        // 按下键的情况
        e.type === 'keydown' &&
        // 匹配快捷键
        activateKey &&
        // 匹配全部组合键
        combinationKeys.every((combinationPrefix) => e[`${combinationPrefix}Key`])
      ) {
        return true;
      }

      if (
        // 松开键的情况
        e.type === 'keyup' &&
        // 匹配空快捷键
        !key &&
        // 匹配全部组合键
        combinationKeys.every((combinationPrefix) => e[`${combinationPrefix}Key`])
      ) {
        return true;
      }

      return false;
    });

    activateKeys.sort((a, b) => {
      if (a.key && !b.key) return -1;
      return (b.combinationKeys?.length ?? 0) - (a.combinationKeys?.length ?? 0);
    });

    const shortcut = activateKeys[0];
    this._verbose(e, shortcut, () => {
      if (shortcut && this.activeShortcut?.shortcut === activateKeys[0]) return;
      if (this.activeShortcut?.shortcut) {
        const deactivateShortcut = this.activeShortcut;
        deactivateShortcut.shortcut.onDeactivate?.(e, this.activeShortcut.returnValue);
      }
      if (shortcut) {
        this.activeShortcut = { shortcut, returnValue: shortcut.onActivate(e) };
      } else {
        this.activeShortcut = undefined;
      }
    });

    this._preEvent = e;
  }

  add(shortcut: ShortcutOptions) {
    const _shortcut = this._tryGetValidShortcut(shortcut);
    if (!_shortcut) return;

    const index = this.shortcuts.findIndex((item) => {
      isEqual(item.key, _shortcut.key) && isEqual(item.combinationKeys, _shortcut.combinationKeys);
    });
    if (index !== -1) {
      this.shortcuts.splice(index, 1, _shortcut);
    } else {
      this.shortcuts.push(_shortcut);
    }
  }

  remove(key: string, combinationKeys: string[] = []) {
    const index = this.shortcuts.findIndex((item) => {
      isEqual(item.key, [key].flat(1).sort()) &&
        isEqual(item.combinationKeys, combinationKeys.sort());
    });
    if (index !== -1) {
      this.shortcuts.splice(index, 1);
    }
  }

  unload(editor: VizPathEditor): void {
    editor.events.global.off('keydown', this._handleShortcutKey.bind(this));
    editor.events.global.off('keyup', this._handleShortcutKey.bind(this));
    editor.events.global.off('blur', this._handlePageDeactivate.bind(this));

    this.shortcuts.length = 0;
    this.activeShortcut = undefined;
    this._preEvent = undefined;
  }

  load(editor: VizPathEditor) {
    this.shortcuts = (this.shortcutOptions ?? [])
      .map(this._tryGetValidShortcut.bind(this))
      .filter(Boolean) as typeof this.shortcuts;

    editor.events.global.on('keydown', this._handleShortcutKey.bind(this));
    editor.events.global.on('keyup', this._handleShortcutKey.bind(this));
    editor.events.global.on('blur', this._handlePageDeactivate.bind(this));
  }
}

export default EditorShortcut;
