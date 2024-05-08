import { fabric } from 'fabric';
import { v4 as uuid } from 'uuid';
import round from 'lodash-es/round';
import defaults from 'lodash-es/defaults';
import VizPath, { VizPathSymbalType, type ResponsiveCrood } from '../../vizpath.class';
import EditorModule from '../base.class';
import Editor from '../editor/index.class';
import type { PathwayNode } from '../..';
import EditorUI from '../editor-ui/index.class';
import { parsePathJSON, reinitializePath } from '@utils';

type EditorPathOptions = {
  /**
   * 触发路径更新状态的时机
   * @default 'defer' 延迟自动更新，比auto性能好，但是状态不完全同步
   */
  updateTriggerTime?: 'auto' | 'manual' | 'defer';
};

class EditorPath extends EditorModule {
  static ID = Symbol('editor-path');

  options: Required<EditorPathOptions> = {
    updateTriggerTime: 'defer',
  };

  paths: {
    path: fabric.Path;
    section: PathwayNode<ResponsiveCrood>[];
  }[] = [];

  nodePathMap = new WeakMap<ResponsiveCrood, (typeof this.paths)[number]>([]);

  constructor(options: EditorPathOptions = {}) {
    super();

    this.options = defaults(options, this.options);
  }

  /**
   * 将相对坐标点转化为带元素本身变换的偏移位置
   */
  calcAbsolutePosition(crood: Crood, object: fabric.Object): Position {
    const matrix = [...object.calcOwnMatrix()];

    if (object.type === 'path') {
      matrix[4] -= (object as fabric.Path).pathOffset.x;
      matrix[5] -= (object as fabric.Path).pathOffset.y;
    }

    const point = fabric.util.transformPoint(
      new fabric.Point(crood.x, crood.y),
      matrix
    );

    return { left: point.x, top: point.y };
  }

  /**
   * 移除元素本身变换，将实际偏移转化为路径相对坐标
   */
  calcRelativeCrood(position: Position, object: fabric.Object): Crood {
    const matrix = [...object.calcOwnMatrix()];

    if (object.type === 'path') {
      matrix[4] -= (object as fabric.Path).pathOffset.x;
      matrix[5] -= (object as fabric.Path).pathOffset.y;
    }

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
  updatePathStatus(path: fabric.Path) {
    reinitializePath(path);

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

    const updatePaths = () => {
      const ui = vizPath.context.find(EditorUI);

      const paths = vizPath.pathway.map(({ section, originPath }) => {
        const decorator = (customPath: fabric.Path) => {
          const { layout, styles } = parsePathJSON(customPath);
          const _path = originPath;

          _path.set(layout);
          _path.set(styles);
          _path.set({
            name: uuid(),
            // 路径本身不可选中，后续通过操纵点和线条来更改路径
            selectable: false,
            // 不触发事件
            evented: false,
            // 防止因为缓存没有显示正确的路径
            objectCaching: false,
          });

          _path[VizPath.symbol] = VizPathSymbalType.PATH;

          return _path;
        };
        let path = (ui?.options.path ?? EditorUI.noneUI.path)(
          decorator,
          originPath
        );
        if (!path[VizPath.symbol]) path = decorator(path);

        return { path, section };
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

      // 建立映射关系，便于减少后续计算
      this.paths.forEach((item) => {
        item.section.forEach(({ node }) => {
          if (node) this.nodePathMap.set(node, item);
        });
      });
    }
    vizPath.on('draw', updatePaths);
    vizPath.on('clear', updatePaths);
  }

  /**
   * 初始化路径更新监听
   */
  private _initPathListener(vizPath: VizPath) {
    const debounceWeakMap = new WeakMap<(typeof this.paths)[number], number>(
      []
    );
    vizPath.on('update', (crood) => {
      const { updateTriggerTime } = this.options;
      if (updateTriggerTime === 'manual') return;

      const path = this.nodePathMap.get(crood);
      if (!path) return;

      if (updateTriggerTime === 'auto') {
        this.updatePathStatus(path.path);
      } else {
        const timeout = debounceWeakMap.get(path);
        if (timeout) clearTimeout(timeout);

        debounceWeakMap.set(
          path,
          setTimeout(() => {
            this.updatePathStatus(path.path);
            debounceWeakMap.delete(path);
          }, 60)
        );
      }
    });
  }

  load(vizPath: VizPath) {
    this._initDrawListener(vizPath);
    this._initPathListener(vizPath);
  }
}

export default EditorPath;
