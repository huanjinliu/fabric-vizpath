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

  paths: {
    path: fabric.Path;
    matrix: number[];
  }[] = [];

  /**
   * 获取指令所在路径信息
   * @param instruction 指令
   * @returns 路径信息
   */
  getPath(instruction: Instruction) {
    return this.paths.find(({ path }) =>
      path.path?.includes(instruction as unknown as fabric.Point)
    );
  }

  /**
   * 将相对坐标点转化为带元素本身变换的偏移位置
   */
  calcAbsolutePosition(crood: Crood, matrix: number[]): Position {
    const point = fabric.util.transformPoint(
      new fabric.Point(crood.x, crood.y),
      matrix
    );

    return { left: point.x, top: point.y };
  }

  /**
   * 移除元素本身变换，将实际偏移转化为路径相对坐标
   */
  calcRelativeCrood(position: Position, matrix: number[]): Crood {
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
  reinitializePath(path: fabric.Path, matrix: number[]) {
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

      const paths = vizPath.pathway.map(({ originPath }, index, arr) => {
        const decorator = (customPath: fabric.Path) => {
          const _path = new fabric.Path();

          _path.set((customPath.toJSON()) as any);

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

          _path.path = vizPath
            .toPaths([arr[index]])
            .flat(1) as unknown as fabric.Point[];

          _path.pathOffset = new fabric.Point(0, 0);

          return _path;
        };
        let path = (ui?.options.path ?? EditorUI.noneUI.path)(
          decorator,
          originPath
        );
        if (!path[VizPath.symbol]) path = decorator(path);

        const matrix = path.calcOwnMatrix() as number[];

        return { path, matrix };
      });

      // 移除旧的路径对象并添加新的路径对象
      canvas.renderOnAddRemove = true;
      this.paths.forEach(({ path }) => {
        canvas.remove(path);
      });
      paths.forEach(({ path }) => {
        canvas.add(path);
      });
      canvas.renderOnAddRemove = false;
      canvas.renderAll();

      this.paths = paths;
    });

    vizPath.on('update', () => {
      this.paths.forEach(({ path, matrix }) => {
        this.reinitializePath(path, [...matrix.slice(0, 4), 0, 0] as number[]);
      });
    });
  }
}

export default EditorPath;
