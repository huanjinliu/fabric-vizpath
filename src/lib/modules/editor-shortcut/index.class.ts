import cloneDeep from 'lodash-es/cloneDeep';
import isEqual from 'lodash-es/isEqual';
import EditorModule from '../base.class';
import Editor from '../editor/index.class';
import type VizPath from "../../vizpath.class";

type Shortcut = {
  key: string[];
  combinationKeys: string[];
  onActivate: () => void;
  onDeactivate?: () => void;
}

type ShortcutOptions = {
  key?: string;
  combinationKeys?: string[];
  onActivate?: () => void;
  onDeactivate?: () => void;
}

class EditorShortcut extends EditorModule {
  static ID = Symbol('editor-shortcut');

  shortcuts: Shortcut[] = [];

  activeShortcut: Shortcut | undefined;

  constructor(shortcuts: ShortcutOptions[] = []) {
    super();
    this.shortcuts = shortcuts.map(this._tryGetValidShortcut.bind(this)).filter(Boolean) as typeof this.shortcuts;
  }

  private _tryGetValidShortcut(shortcut: ShortcutOptions) {
    if (!shortcut.onActivate && !shortcut.onDeactivate) return;
    if (!shortcut.key && !shortcut.combinationKeys) return;

    const _shortcut = {
      onActivate: shortcut.onActivate,
      onDeactivate: shortcut.onDeactivate,
    } as Shortcut;

    if (!shortcut.key) _shortcut.key = [];
    else _shortcut.key = _shortcut.key = shortcut.key.split('|');

    if (!shortcut.combinationKeys) _shortcut.combinationKeys = [];
    else _shortcut.combinationKeys = [...shortcut.combinationKeys];
    
    _shortcut.key.sort();
    _shortcut.combinationKeys.sort();

    return _shortcut;
  }

  private _handlePageDeactivate() {
    if (this.activeShortcut) {
      this.activeShortcut.onDeactivate?.();
      this.activeShortcut = undefined;
    }
  }

  private _handleShortcutKey(e: KeyboardEvent) {
    // 寻找所有匹配的按键
    const activateKeys = this.shortcuts.filter((shortcut) => {
      const { key: keys = [], combinationKeys = [] } = shortcut;

      const validKey = keys.find(key => (
        key.toUpperCase() === (e.key ?? '').toUpperCase() ||
        `KEY${key.toUpperCase()}` === e.code.toUpperCase()
      ))
      if (e.type === 'keyup' && validKey) return false;

      if (
        // 没有匹配任何快捷键
        !validKey ||
        // 没有匹配任何组合键
        combinationKeys.some(
          (combinationPrefix) => !e[`${combinationPrefix}Key`]
        )
      ) {
        return false;
      }

      return true;
    });

    activateKeys.sort((a, b) => {
      if (a.key && !b.key) return -1;
      return (
        (b.combinationKeys?.length ?? 0) - (a.combinationKeys?.length ?? 0)
      );
    });

    const shortcut = activateKeys[0];
    if (this.activeShortcut === shortcut) return;

    this.activeShortcut?.onDeactivate?.();

    this.activeShortcut = shortcut;

    this.activeShortcut?.onActivate();
  };

  add(shortcut: ShortcutOptions) {
    const _shortcut = this._tryGetValidShortcut(shortcut);
    if (!_shortcut) return;

    const index = this.shortcuts.findIndex(item => {
      isEqual(item.key, _shortcut.key) && isEqual(item.combinationKeys, _shortcut.combinationKeys)
    });
    if (index !== -1) {
      this.shortcuts.splice(index, 1, _shortcut);
    } else {
      this.shortcuts.push(_shortcut);
    }
  }

  remove(key: string, combinationKeys: string[] = []) {
    const index = this.shortcuts.findIndex(item => {
      isEqual(item.key, [key].flat(1).sort()) && isEqual(item.combinationKeys, combinationKeys.sort())
    });
    if (index !== -1) {
      this.shortcuts.splice(index, 1);
    }
  }

  unload(vizPath: VizPath): void {
    const editor = vizPath.context.find(Editor);
    if (!editor) return;

    editor.off('global', 'keydown', this._handleShortcutKey.bind(this));
    editor.off('global', 'keyup', this._handleShortcutKey.bind(this));
    editor.off('global', 'blur', this._handlePageDeactivate.bind(this));

    this.shortcuts.length = 0;
    this.activeShortcut = undefined;
  }

  load(vizPath: VizPath) {
    const editor = vizPath.context.find(Editor);
    if (!editor) return;

    editor.on('global', 'keydown', this._handleShortcutKey.bind(this));
    editor.on('global', 'keyup', this._handleShortcutKey.bind(this));
    editor.on('global', 'blur', this._handlePageDeactivate.bind(this));
  }
}

export default EditorShortcut;
