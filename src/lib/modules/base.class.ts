import type VizPath from "../vizpath.class";

abstract class EditorModule {
  static ID: string;

  async prepare() {
  }

  unload(vizPath: VizPath) {
  }

  load(vizPath: VizPath) {
  }
}

export default EditorModule;