import { fabric } from 'fabric';
import { calcCanvasCoord, deepIterateGroup, fabricOnceRender } from '@utils';
import VizPathModule from '../../vizpath-module.class';
import VizPathTheme from '../../vizpath-theme.class';
import type { ThemeDecorator } from '../editor-theme/index.class';
import VizPathEditor, { EditorObjectID } from '../../vizpath-editor.class';
import { InstructionType } from '../../vizpath.class';

/**
 * 路径轨迹模块，编辑器添加模式下显示预添加的路径段轨迹
 */
class EditorTrack extends VizPathModule {
  static ID = 'editor-track';

  virtualPath: fabric.Path | null = null;

  virtualNode: fabric.Object | null = null;

  themes = new VizPathTheme({
    virtualNode: (decorator: ThemeDecorator<fabric.Object>) => {
      const circle = new fabric.Circle({
        radius: 3,
        fill: '#ffffff',
        stroke: '#4b4b4b',
        strokeWidth: 1,
      });

      return circle;
    },
    virtualPath: (decorator: ThemeDecorator<fabric.Path>) => {
      const path = new fabric.Path('M 0 0', {
        fill: 'transparent',
        stroke: '#bebebe',
        strokeWidth: 1,
      });

      return path;
    },
  });

  // 创建虚拟节点
  private _createVirtualNode(): fabric.Object {
    let decorated = false;

    const decorator: ThemeDecorator<fabric.Object> = (customObject, callback) => {
      customObject.set({
        // 选中时不出现选中框
        hasBorders: false,
        hasControls: false,
        // 不给选中
        evented: false,
        selectable: false,
        // 保持居中
        originX: 'center',
        originY: 'center',
      });

      // 不做另外的画布缓存
      deepIterateGroup(customObject, (object) => {
        object.set({
          objectCaching: false,
        });
      });

      decorated = true;

      return customObject;
    };

    let object: fabric.Object = this.themes.create('virtualNode')(decorator);
    if (!decorated) object = decorator(object);

    return object;
  }

  // 创建虚拟参考路径线
  private _createVirtualPath(): fabric.Path {
    let decorated = false;

    const decorator: ThemeDecorator<fabric.Path> = (customPath, callback) => {
      customPath.set({
        // 选中时不出现选中框
        hasBorders: false,
        hasControls: false,
        // 不给选中
        evented: false,
        selectable: false,
        // 保持居中
        originX: 'center',
        originY: 'center',
        // 不做另外的画布缓存
        objectCaching: false,
      });

      decorated = true;

      return customPath;
    };

    let path = this.themes.create('virtualPath')(decorator);
    if (!decorated) path = decorator(path);

    return path;
  }

  // 清除虚拟画布对象
  private _clearVirtualObjects = () => {
    const canvas = this.editor?.canvas;
    if (!canvas) return;
    fabricOnceRender(canvas, () => {
      if (this.virtualPath) canvas.remove(this.virtualPath);
      if (this.virtualNode) canvas.remove(this.virtualNode);
    });
  };

  unload() {
    this._clearVirtualObjects();

    this.virtualNode = null;
    this.virtualPath = null;
  }

  load(editor: VizPathEditor) {
    const canvas = editor.canvas;
    if (!canvas) return;

    let cacheEvent: fabric.IEvent<MouseEvent> | undefined;

    const renderVirtualObjects = (
      activeNode: fabric.Object,
      position: Position,
      hideVirtualNode = false,
    ) => {
      if (editor.get('mode') !== 'add') return;

      const vizpath = editor.vizpath;
      if (!vizpath) return;

      const node = editor.objectNodeMap.get(activeNode);
      if (!node) return;

      if (!vizpath.isTerminalNode(node)) return;

      fabricOnceRender(canvas, () => {
        this.virtualNode = this.virtualNode ?? this._createVirtualNode();
        this.virtualPath = this.virtualPath ?? this._createVirtualPath();
        this.virtualNode.set(position);

        const curvePoint = node === node.segment[0] ? node.deformers?.pre : node.deformers?.next;
        if (curvePoint) {
          const { left, top } = vizpath.calcAbsolutePosition(curvePoint);
          this.virtualPath.initialize([
            [InstructionType.START, activeNode.left, activeNode.top],
            [InstructionType.QUADRATIC_CURCE, left, top, position.left, position.top],
          ] as any);
        } else {
          this.virtualPath.initialize([
            [InstructionType.START, activeNode.left, activeNode.top],
            [InstructionType.LINE, position.left, position.top],
          ] as any);
        }

        const baseIndex = canvas._objects.indexOf(vizpath.path) + 1;
        if (!hideVirtualNode && !canvas.contains(this.virtualNode)) {
          canvas.insertAt(this.virtualNode, baseIndex, false);
        }
        if (!canvas.contains(this.virtualPath)) {
          canvas.insertAt(this.virtualPath, baseIndex, false);
        }
      });
    };

    const renderTrackHandler = (e: fabric.IEvent<MouseEvent>) => {
      this._clearVirtualObjects();

      // 缓存事件对象，以应对编辑器模式变更
      cacheEvent = e;

      const vizpath = editor.vizpath;
      if (!vizpath) return;

      const { target, pointer } = e;
      if (!pointer) return;

      const activeNode = editor.activeNodes.length === 1 ? editor.activeNodes[0] : undefined;
      if (!activeNode) return;

      if (target) {
        if (
          target[VizPathEditor.symbol] === EditorObjectID.NODE &&
          vizpath.isLinkableNodes(
            editor.objectNodeMap.get(activeNode)!,
            editor.objectNodeMap.get(target)!,
          )
        ) {
          const centerPoint = target.getCenterPoint();
          renderVirtualObjects(activeNode, { left: centerPoint.x, top: centerPoint.y }, true);
        }
      } else {
        const coord = calcCanvasCoord(editor.canvas!, pointer);
        renderVirtualObjects(activeNode, { left: coord.x, top: coord.y });
      }
    };

    editor.events.canvas.on('mouse:move', renderTrackHandler);
    editor.events.canvas.on('mouse:down', () => {
      this._clearVirtualObjects();
    });
    editor.events.on('set', () => {
      cacheEvent && renderTrackHandler(cacheEvent);
    });
  }
}

export default EditorTrack;
