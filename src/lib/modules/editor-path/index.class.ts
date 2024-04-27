import { fabric } from 'fabric';
import { v4 as uuid } from 'uuid';
import round from 'lodash-es/round';
import VizPath from '../../vizpath.class';
import EditorModule from '../base.class';
import Editor from '../editor/index.class';
import type { Instruction } from '../..';
import EditorUI from '../editor-ui/index.class';

class EditorPath extends EditorModule {
  static ID = Symbol('editor-path');

  paths: fabric.Path[] = [];

  /**
   * 来源路径，路径的变换和中心将作为该模块创建的参考值
   */
  originPath: fabric.Path | undefined;

  /**
   * 视图变换
   */
  editorTransformMatrix = [1, 0, 0, 1, 0, 0];

  constructor(originPath?: fabric.Path) {
    super();

    this.originPath = originPath;
  }

  /**
   * 将相对坐标点转化为带元素本身变换的偏移位置
   */
  calcAbsolutePosition(
    crood: Crood,
    matrix = this.editorTransformMatrix
  ): Position {
    const point = fabric.util.transformPoint(
      new fabric.Point(crood.x, crood.y),
      matrix
    );

    return { left: point.x, top: point.y };
  }

  /**
   * 移除元素本身变换，将实际偏移转化为路径相对坐标
   */
  calcRelativeCrood(
    position: Position,
    matrix = this.editorTransformMatrix
  ): Crood {
    const point = fabric.util.transformPoint(
      new fabric.Point(position.left, position.top),
      fabric.util.invertTransform(matrix)
    );

    return {
      x: round(point.x, 4),
      y: round(point.y, 4),
    };
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
  reinitializePath(path: fabric.Path) {
    // 记录旧的路径信息
    const oldInfo = {
      left: path.left!,
      top: path.top!,
      width: path.width!,
      height: path.height!,
      pathOffset: { ...path.pathOffset },
    };

    // 持有旧的指令后恢复避免丢失引用
    const instructions = path.path;
    // 更新路径尺寸
    path.initialize(
      (fabric.util as any).joinPath(instructions as unknown as Instruction[])
    );
    path.path = instructions;

    // 计算路径偏移差值
    const matrix = [...this.editorTransformMatrix];
    matrix[4] = 0;
    matrix[5] = 0;
    const distance = fabric.util.transformPoint(
      new fabric.Point(
        path.pathOffset.x -
          (path.width! - oldInfo.width) / 2 -
          oldInfo.pathOffset.x,
        path.pathOffset.y -
          (path.height! - oldInfo.height) / 2 -
          oldInfo.pathOffset.y
      ),
      matrix
    );

    // 设置回正确的偏移位置
    path.set({
      left: oldInfo.left + distance.x,
      top: oldInfo.top + distance.y,
    });

    path.setCoords();
  }

  load(vizPath: VizPath) {
    const editor = vizPath.context.find(Editor);
    if (!editor) {
      return;
    }

    const canvas = editor.canvas;
    if (!canvas) {
      return;
    }

    vizPath.on('draw', async () => {
      const ui = vizPath.context.find(EditorUI);

      const paths = vizPath.pathway.map(({ info }, index, arr) => {
        const decorator = (_path: fabric.Path) => {
          _path.initialize(vizPath.toPathD([arr[index]]));

          _path.path = vizPath
            .toPaths([arr[index]])
            .flat(1) as unknown as fabric.Point[];

          _path.set({
            name: uuid(),
            // 路径本身不可选中，后续通过操纵点和线条来更改路径
            selectable: false,
            // 不触发事件
            evented: false,
            // 防止因为缓存没有显示正确的路径
            objectCaching: false,
          });

          _path[VizPath.symbol] = true;

          return _path;
        };
        let path = (ui?.options.path ?? EditorUI.defaultUI.path)(
          decorator,
          info
        );
        if (!path[VizPath.symbol]) path = decorator(path);

        return path;
      });

      const {
        originX = 'center',
        originY = 'center',
        left = canvas.getWidth() / 2,
        top = canvas.getHeight() / 2,
        angle = 0,
        scaleX = 1,
        scaleY = 1,
      } = this.originPath ?? {};
      const group = new fabric.Group(paths, {
        originX,
        originY,
        left,
        top,
        angle,
        scaleX,
        scaleY,
      });
      // 记录路径在编辑器中的变换值
      this.editorTransformMatrix = group.calcOwnMatrix();

      group.destroy();

      // 移除旧的路径对象并添加新的路径对象
      canvas.renderOnAddRemove = true;
      this.paths.forEach((path) => {
        canvas.remove(path);
      });
      paths.forEach((path) => {
        canvas.add(path);
      });
      canvas.renderOnAddRemove = false;
      canvas.renderAll();

      this.paths = paths;
    });

    vizPath.on('update', () => {
      this.paths.forEach((path) => {
        this.reinitializePath(path);
      });
    });
  }
}

export default EditorPath;
