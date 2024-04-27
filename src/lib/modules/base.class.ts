import type VizPath from "../vizpath.class";

abstract class EditorModule {
  static ID: symbol;

  async prepare() {
  }

  load(vizPath: VizPath) {
  }
}

export default EditorModule;