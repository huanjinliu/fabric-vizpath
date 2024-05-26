import { fabric } from "fabric";
import { v4 as uuid } from "uuid";
import VizPath, {
  VizPathSymbalType,
  type ResponsiveCrood,
  type ResponsivePathway,
} from "../../vizpath.class";
import EditorModule from "../base.class";
import Editor from "../editor/index.class";
import EditorUI, { type ThemeDecorator } from "../editor-ui/index.class";
import { parsePathJSON, repairPath } from "@utils";

class EditorPath extends EditorModule {
  static ID = "editor-path";

  paths: ResponsivePathway = [];

  nodePathMap = new WeakMap<ResponsiveCrood, ResponsivePathway[number]>([]);

  /**
   * 将画布坐标转化为特定路径的相对指令坐标位置
   */
  calcAbsolutePosition(crood: Crood, object: fabric.Object): Position {
    const matrix = [...object.calcOwnMatrix()];

    // 路径如果带有偏移则需要移除偏移带来的影响
    if (object.type === "path") {
      const offset = fabric.util.transformPoint(
        (object as fabric.Path).pathOffset,
        [...matrix.slice(0, 4), 0, 0]
      );

      matrix[4] -= offset.x;
      matrix[5] -= offset.y;
    }

    const point = fabric.util.transformPoint(
      new fabric.Point(crood.x, crood.y),
      matrix
    );

    return { left: point.x, top: point.y };
  }

  /**
   * 将路径内的相对指令坐标位置转为所在画布的坐标位置
   */
  calcRelativeCrood(position: Position, object: fabric.Object): Crood {
    const matrix = [...object.calcOwnMatrix()];

    if (object.type === "path") {
      const offset = fabric.util.transformPoint(
        (object as fabric.Path).pathOffset,
        [...matrix.slice(0, 4), 0, 0]
      );

      matrix[4] -= offset.x;
      matrix[5] -= offset.y;
    }

    const point = fabric.util.transformPoint(
      new fabric.Point(position.left, position.top),
      fabric.util.invertTransform(matrix)
    );

    return point;
  }

  /**
   * 重新修正路径的尺寸和位置
   *
   * @param path 路径对象
   *
   * @note
   *
   * fabric.Path对象直接改内部路径指令，只能更新其路径渲染师正确的，但对象本身的尺寸和偏移信息都是错误的，
   * 需要使用initialize重新初始化路径，获取正确的尺寸，但是偏移是错的，该方法同时修正偏移。
   */
  updatePathStatus(path: fabric.Path) {
    repairPath(path);

    path.canvas?.requestRenderAll();
  }

  /**
   * 初始化路径绘制监听
   */
  private _initDrawListener(vizPath: VizPath) {
    const editor = vizPath.context.find(Editor);
    if (!editor) {
      return;
    }

    const canvas = editor.canvas;
    if (!canvas) {
      return;
    }

    const handler = (pathway: ResponsivePathway) => {
      const ui = vizPath.context.find(EditorUI);

      pathway.forEach((item) => {
        const { originPath } = item;

        // 如果已经带有标志则是已经添加进画布的路径
        if (originPath[VizPath.symbol]) return;

        const decorator: ThemeDecorator<fabric.Path> = (
          customPath,
          callback
        ) => {
          customPath.set({
            name: uuid(),
            // 路径本身不可选中，后续通过操纵点和线条来更改路径
            selectable: false,
            // 不触发事件
            evented: false,
            // 防止因为缓存没有显示正确的路径
            objectCaching: false,
          });

          customPath[VizPath.symbol] = VizPathSymbalType.PATH;

          if (callback) callback(vizPath.context, customPath);

          return customPath;
        };
        (ui?.options.path ?? EditorUI.noneUI.path)(
          decorator,
          originPath
        );
        if (!originPath[VizPath.symbol]) decorator(item.originPath);
      });

      // 添加新的路径对象
      canvas.renderOnAddRemove = true;
      pathway.forEach(({ originPath }) => {
        if (!canvas.contains(originPath)) canvas.add(originPath);
      });
      canvas.renderOnAddRemove = false;
      canvas.requestRenderAll();

      this.paths.push(...pathway);

      // 建立映射关系，便于减少后续计算
      this.paths.forEach((item) => {
        item.section.forEach(({ node }) => {
          if (node) this.nodePathMap.set(node, item);
        });
      });
    };
    vizPath.on("draw", handler);
  }

  /**
   * 初始化路径清除监听
   */
  private _initClearListener(vizPath: VizPath) {
    const editor = vizPath.context.find(Editor);
    if (!editor) {
      return;
    }

    const canvas = editor.canvas;
    if (!canvas) {
      return;
    }

    const handler = (pathway: ResponsivePathway) => {
      canvas.remove(...pathway.map((i) => i.originPath));

      this.paths = this.paths.filter((i) => pathway.includes(i));

      // 清除映射
      pathway.forEach((item) => {
        item.section.forEach(({ node }) => {
          if (node) this.nodePathMap.delete(node);
        });
      });
    };
    vizPath.on("clear", handler);
    vizPath.on("clearAll", () => {
      canvas.remove(...this.paths.map(i => i.originPath));
      this.paths.forEach((item) => {
        item.section.forEach(({ node }) => {
          if (node) this.nodePathMap.delete(node);
        });
      });
      this.paths = [];
    });
  }

  load(vizPath: VizPath) {
    this._initClearListener(vizPath);
    this._initDrawListener(vizPath);
  }
}

export default EditorPath;
