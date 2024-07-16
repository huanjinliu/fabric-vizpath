import isEqual from 'lodash-es/isEqual';
import type VizPath from '../../vizpath.class';
import VizPathModule from '../../vizpath-module.class';

type CombinationKey = 'alt' | 'ctrl' | 'shift' | 'meta';

type Shortcut<ReturnValue = any> = {
  key?: string;
  combinationKeys: CombinationKey[];
  onActivate: (e: KeyboardEvent) => ReturnValue;
  onDeactivate?: (e: KeyboardEvent, returnValue: ReturnValue) => void;
};

type ShortcutOptions<ReturnValue = any> = Partial<Shortcut<ReturnValue>>;

class EditorShortcut extends VizPathModule {
  static ID = 'editor-shortcut';

  shortcuts: Shortcut[] = [];

  shortcutOptions: ShortcutOptions[];

  activeShortcut?: {
    shortcut: Shortcut;
    returnValue: any;
  };

  constructor(options: ShortcutOptions[] = []) {
    super();

    this.shortcutOptions = options;
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

  private _handlePageDeactivate(e: KeyboardEvent) {
    if (this.activeShortcut) {
      this.activeShortcut.shortcut.onDeactivate?.(e, this.activeShortcut.returnValue);
      this.activeShortcut = undefined;
    }
  }

  private _handleShortcutKey(e: KeyboardEvent) {
    // 寻找所有匹配的按键
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
    if (shortcut) {
      if (this.activeShortcut?.shortcut === activateKeys[0]) return;
      this.activeShortcut = { shortcut, returnValue: shortcut.onActivate(e) };
    } else {
      this.activeShortcut?.shortcut.onDeactivate?.(e, this.activeShortcut.returnValue);
      this.activeShortcut = undefined;
    }
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

  unload(vizpath: VizPath): void {
    const editor = vizpath.editor;
    if (!editor) return;

    editor.events.global.off('keydown', this._handleShortcutKey.bind(this));
    editor.events.global.off('keyup', this._handleShortcutKey.bind(this));
    editor.events.global.off('blur', this._handlePageDeactivate.bind(this));

    this.shortcuts.length = 0;
    this.activeShortcut = undefined;
  }

  load(vizpath: VizPath) {
    const editor = vizpath.editor;
    if (!editor) return;

    this.shortcuts = (this.shortcutOptions ?? [])
      .map(this._tryGetValidShortcut.bind(this))
      .filter(Boolean) as typeof this.shortcuts;

    editor.events.global.on('keydown', this._handleShortcutKey.bind(this));
    editor.events.global.on('keyup', this._handleShortcutKey.bind(this));
    editor.events.global.on('blur', this._handlePageDeactivate.bind(this));
  }
}

export default EditorShortcut;
