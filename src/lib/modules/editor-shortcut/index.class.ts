import cloneDeep from 'lodash-es/cloneDeep';
import isEqual from 'lodash-es/isEqual';
import EditorModule from '../base.class';
import Editor from '../editor/index.class';
import type VizPath from '../../vizpath.class';

type CombinationKey = 'alt' | 'ctrl' | 'shift' | 'meta';

type Shortcut = {
  key?: string;
  combinationKeys: CombinationKey[];
  onActivate: (e: KeyboardEvent) => void;
  onDeactivate?: (e: KeyboardEvent) => void;
};

type ShortcutOptions = {
  key?: string;
  combinationKeys?: CombinationKey[];
  onActivate?: (e: KeyboardEvent) => void;
  onDeactivate?: (e: KeyboardEvent) => void;
};

class EditorShortcut extends EditorModule {
  static ID = 'editor-shortcut';

  shortcuts: Shortcut[] = [];

  activeShortcut: Shortcut | undefined;

  constructor(shortcuts: ShortcutOptions[] = []) {
    super();
    this.shortcuts = shortcuts
      .map(this._tryGetValidShortcut.bind(this))
      .filter(Boolean) as typeof this.shortcuts;
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
      this.activeShortcut.onDeactivate?.(e);
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
    if (this.activeShortcut === shortcut) {
      this.activeShortcut?.onActivate(e);
      return;
    }

    this.activeShortcut?.onDeactivate?.(e);

    this.activeShortcut = shortcut;

    this.activeShortcut?.onActivate(e);
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

  unload(vizPath: VizPath): void {
    const editor = vizPath.context.find(Editor);
    if (!editor) return;

    editor.removeGlobalEvent('keydown', this._handleShortcutKey.bind(this));
    editor.removeGlobalEvent('keyup', this._handleShortcutKey.bind(this));
    editor.removeGlobalEvent('blur', this._handlePageDeactivate.bind(this));

    this.shortcuts.length = 0;
    this.activeShortcut = undefined;
  }

  load(vizPath: VizPath) {
    const editor = vizPath.context.find(Editor);
    if (!editor) return;

    editor.addGlobalEvent('keydown', this._handleShortcutKey.bind(this));
    editor.addGlobalEvent('keyup', this._handleShortcutKey.bind(this));
    editor.addGlobalEvent('blur', this._handlePageDeactivate.bind(this));
  }
}

export default EditorShortcut;
