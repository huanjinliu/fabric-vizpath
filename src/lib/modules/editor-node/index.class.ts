import { fabric } from 'fabric';
import { v4 as uuid } from 'uuid';
import EditorModule from '../base.class';
import Editor from '../editor/index.class';
import type VizPath from '../../vizpath.class';
import EditorPath from '../editor-path/index.class';
import { InstructionType, type PathwayNode } from '../..';
import { observe, transform } from '../../utils';
import type { ResponsiveCrood } from '../../vizpath.class';

/** 创建默认控制点 */
export const CREATE_DEFAULT_POINTER = () => {
  const object = new fabric.Circle({
    strokeWidth: 4,
    radius: 6,
    fill: '#ffffff',
    stroke: '#4b4b4b',
    originX: 'center',
    originY: 'center',
  });

  return object;
};

/** 创建默认线条 */
export const CREATE_DEFAULT_LINE = () =>
  new fabric.Line([0, 0, 0, 0], {
    // stroke: '#bebebe',
    stroke: '#f00',
    strokeWidth: 1,
    strokeDashArray: [4, 3],
    strokeUniform: true,
    selectable: false,
    evented: false,
    originX: 'center',
    originY: 'center',
  });

/** 创建默认默认左右侧拓展点 */
export const CREATE_DEFAULT_TRIGGER = () => {
  const object = new fabric.Circle({
    radius: 4,
    stroke: '#bebebe',
    strokeWidth: 2,
    fill: '#bebebe',
    originX: 'center',
    originY: 'center',
  });
  return object;
};

class EditorNode extends EditorModule {
  static ID = Symbol('editor-node');

  vizPath: VizPath | null = null;

  editor: Editor | null = null;

  nodes: fabric.Group[] = [];

  controllers: {
    points: fabric.Group[];
    lines: fabric.Line[];
  } = {
    points: [],
    lines: [],
  };

  nodeMap: WeakMap<fabric.Group, PathwayNode<ResponsiveCrood>> = new WeakMap(
    []
  );

  private _cancelSelectEvent = false;

  private _initPathNodes(vizPath: VizPath) {
    const editorPath = vizPath.context.find(EditorPath);
    if (!editorPath) return [];

    const nodes: fabric.Group[] = [];

    // 创建路径关键点的操作点（即实际路径上的节点，而非曲线上的虚拟点）
    vizPath.pathway.forEach((section) => {
      section.forEach((item, index) => {
        const { node } = item;
        if (!node) return;

        // 如果下一个指令是闭合点，则不添加关键点
        // 因为路径补丁的时候遇到闭合点会添加一条到起始点的路径，所以当前关键点正好和起始点一致
        if (section[index + 1]?.instruction?.[0] === InstructionType.CLOSE)
          return;

        const object = new fabric.Group([CREATE_DEFAULT_POINTER()], {
          name: uuid(),
          originX: 'center',
          originY: 'center',
          // 选中时不出现选中框
          hasBorders: false,
          hasControls: false,
        });

        // 响应指令的直接修改
        node.observe(
          (x, y) => {
            const position = editorPath.calcAbsolutePosition({ x, y });
            if (object.group) {
              const relativePosition = editorPath.calcRelativeCrood(
                position,
                object.group.calcTransformMatrix()
              );
              object
                .set({
                  left: relativePosition.x,
                  top: relativePosition.y,
                })
                .setCoords();
              object.group.addWithUpdate();
            } else {
              object.set(position).setCoords();
            }
          },
          {
            id: object.name,
            immediate: true,
          }
        );

        const position = editorPath.calcAbsolutePosition(node);
        object.set(position).setCoords();
        nodes.push(object);

        this.nodeMap.set(object, item);
      });
    });

    return nodes;
  }

  private _initPathControllers() {
    const lines: fabric.Line[] = [];
    const points: fabric.Group[] = [];

    const editorPath = this.vizPath?.context.find(EditorPath);
    const pathway = this.vizPath?.pathway;

    if (editorPath && pathway) {
      pathway.forEach((section) => {
        section.forEach((item) => {
          const { node, controllers = {} } = item;
          if (!node) return;

          const { pre, next } = controllers;

          [pre, next].forEach((controller) => {
            if (!controller) return;

            /**
             * 创建指令控制点
             */
            const object = new fabric.Group([CREATE_DEFAULT_TRIGGER()], {
              name: uuid(),
              originX: 'center',
              originY: 'center',
              // 选中时不出现选中框
              hasBorders: false,
              hasControls: false,
            });

            // 建立相互响应，指令的数据和元素的位置更改会相互同步
            controller.observe(
              (x, y) => {
                if (object.canvas?.getActiveObject() === object) return;
                const position = editorPath.calcAbsolutePosition({ x, y });
                object.set(position).setCoords();
              },
              {
                immediate: true,
                id: object.name,
              }
            );

            observe(object, ['left', 'top'], ({ left, top }) => {
              if (object.canvas?.getActiveObject() !== object) return;
              const crood = editorPath.calcRelativeCrood({
                left: left!,
                top: top!,
              });
              controller.set(crood, [object.name]);
            });

            /**
             * 创建控制点和节点的连线
             */
            const line = CREATE_DEFAULT_LINE();

            line.set({ name: uuid() });

            // 建立响应式，让连线随时跟随指令的值进行变化
            node.observe(
              (x, y) => {
                const position = editorPath.calcAbsolutePosition({ x, y });
                line.set({ x1: position.left, y1: position.top });
              },
              {
                immediate: true,
                id: line.name,
              }
            );
            controller.observe(
              (x, y) => {
                const position = editorPath.calcAbsolutePosition({ x, y });
                line.set({ x2: position.left, y2: position.top });
              },
              {
                immediate: true,
                id: line.name,
              }
            );

            points.push(object);
            lines.push(line);
          });
        });
      });
    }

    return { points, lines };
  }

  private _initSelectEvents() {
    if (!this.editor) return;

    this.editor.on('canvas', 'selection:created', (e) => {
      if (this._cancelSelectEvent) return;
      this.focus(...e.selected);
    });
    this.editor.on('canvas', 'selection:updated', (e) => {
      if (this._cancelSelectEvent) return;
      this.focus(...e.selected);
    });
    this.editor.on('canvas', 'selection:cleared', () => {
      if (this._cancelSelectEvent) return;
      this.focus();
    });
  }

  move(
    object: fabric.Group,
    position: {
      left: number;
      top: number;
    }
  ) {
    const pathwayNode = this.nodeMap.get(object);
    if (!pathwayNode) return;

    const { node, section, controllers = {} } = pathwayNode;

    const editorPath = this.vizPath?.context.find(EditorPath);
    if (!editorPath) return [];

    const selectionGroup = object.group;

    const {
      scaleX: preScaleX = 1,
      scaleY: preScaleY = 1,
      angle: preAngle = 0,
    } = object;
    const {
      scaleX: newScaleX,
      scaleY: newScaleY,
      angle: newAngle,
    } = selectionGroup
      ? {
          scaleX: 1 / selectionGroup.scaleX!,
          scaleY: 1 / selectionGroup.scaleY!,
          angle: -selectionGroup.angle!,
        }
      : { scaleX: 1, scaleY: 1, angle: 0 };

    object
      .set({
        scaleX: newScaleX,
        scaleY: newScaleY,
        angle: newAngle,
      })
      .setCoords();

    const newCrood = editorPath.calcRelativeCrood(position);
    // 需要跟随变化的曲线控制点
    const followCroods: ResponsiveCrood[] = [];
    const followTransform = {
      translate: {
        x: newCrood.x - node!.x,
        y: newCrood.y - node!.y,
      },
      rotate: preAngle - newAngle,
      scale: {
        x: preScaleX / newScaleX,
        y: preScaleY / newScaleY,
      },
    };

    node!.set(newCrood, [object?.name]);
    if (controllers.pre) followCroods.push(controllers.pre);
    if (controllers.next) followCroods.push(controllers.next);

    // 如果『路径自动闭合（带有z指令）』，首尾两个节点需要同步操作
    if (
      section[section.length - 1]?.instruction?.[0] === InstructionType.CLOSE &&
      section.length > 2
    ) {
      if (section[0].node === node) {
        const { node, controllers = {} } = section[section.length - 2];
        node!.set(newCrood);
        if (controllers.pre) followCroods.push(controllers.pre);
        if (controllers.next) followCroods.push(controllers.next);
      }
      // 闭合节点不可能存在可视操作节点
      // if (section[section.length - 2].node === node) {}
    }

    // 控制点跟随
    followCroods.forEach((controller) => {
      if (!controller) return;
      const {
        translate = { x: 0, y: 0 },
        scale = { x: 1, y: 1 },
        rotate = 0,
      } = followTransform;
      const relativeDiff = transform(
        {
          x: controller.x - newCrood.x,
          y: controller.y - newCrood.y,
        },
        [{ translate }, { scale }, { rotate }]
      );
      controller.x = newCrood.x + relativeDiff.x;
      controller.y = newCrood.y + relativeDiff.y;
    });

    object.canvas?.renderAll();
  }

  focus(...selectedNodes: fabric.Group[]) {
    const canvas = this.editor?.canvas;
    if (!canvas) return;

    const focusNodes: fabric.Group[] = selectedNodes.filter((i) =>
      this.nodes.includes(i)
    );
    const focusControllerPoints: fabric.Group[] = selectedNodes.filter((i) =>
      this.controllers.points.includes(i)
    );

    if (focusNodes.length === 0 && focusControllerPoints.length == 0) return;

    this._cancelSelectEvent = true;

    // 添加活跃组的响应式变化
    const addActiveSelectionObserve = (group: fabric.ActiveSelection) => {
      observe(group, ['left', 'top', 'angle'], () => {
        (group._objects as fabric.Group[]).forEach((object: fabric.Group) => {
          if (!this.nodes.includes(object)) return;

          const decomposeMatrix = fabric.util.qrDecompose(
            object.calcTransformMatrix()
          );
          const left = decomposeMatrix.translateX;
          const top = decomposeMatrix.translateY;

          this.move(object, { left, top });
        });
      });
    };

    // 添加单个活跃对象的响应式变化
    const addActivePointObserve = (object: fabric.Group) => {
      observe(object, ['left', 'top'], ({ left, top }) => {
        if (object.group) return;

        this.move(object, { left: left!, top: top! });
      });
    };

    if (focusNodes.length) {
      // 取消画布选中重新构造选中对象
      canvas.discardActiveObject();
      if (focusNodes.length > 1) {
        const activeSelection = new fabric.ActiveSelection(focusNodes, {
          canvas,
          lockScalingFlip: true,
          // TODO: 暂不允许旋转，后续计算会出现精度问题导致多次变换后无法正确呈现位置
          lockRotation: true,
          originX: 'center',
          originY: 'center',
        });
        activeSelection.setControlVisible('mtr', false);
        canvas.setActiveObject(activeSelection);
        addActiveSelectionObserve(activeSelection);
      } else {
        canvas.setActiveObject(focusNodes[0]);
        addActivePointObserve(focusNodes[0]);
      }
    }

    canvas.renderAll();

    this._cancelSelectEvent = false;
  }

  load(vizPath: VizPath) {
    this.vizPath = vizPath;

    const editor = vizPath.context.find(Editor);
    if (!editor) return;

    const editorPath = vizPath.context.find(EditorPath);
    if (!editorPath) return;

    this.editor = editor;

    this._initSelectEvents();

    vizPath.on('draw', async () => {
      const canvas = editor.canvas;
      if (!canvas) return;

      // 由于需要多次添加关键点和控制点，如果不设置该配置，每次添加和移除都会渲染一次画布，设置为false后可以控制为1次渲染
      canvas.renderOnAddRemove = false;

      // 移除旧对象
      canvas.remove(
        ...this.controllers.lines,
        ...this.controllers.points,
        ...this.nodes
      );

      // 初始路径关键点
      this.nodes = this._initPathNodes(vizPath);

      // 初始路径控制点
      this.controllers = this._initPathControllers();

      // 添加新对象
      canvas.add(
        ...this.controllers.lines,
        ...this.controllers.points,
        ...this.nodes
      );

      canvas.renderOnAddRemove = true;

      canvas.renderAll();
    });
  }
}

export default EditorNode;
