import { fabric } from 'fabric';
import { v4 as uuid } from 'uuid';
import { observe, transform } from '@utils';
import EditorModule from '../base.class';
import Editor from '../editor/index.class';
import VizPath from '../../vizpath.class';
import EditorPath from '../editor-path/index.class';
import { InstructionType, type PathwayNode } from '../..';
import type { ResponsiveCrood } from '../../vizpath.class';
import EditorUI from '../editor-ui/index.class';

class EditorNode extends EditorModule {
  static ID = Symbol('editor-node');

  vizPath: VizPath | null = null;

  editor: Editor | null = null;

  nodes: fabric.Group[] = [];

  controllers: {
    type: 'pre' | 'next';
    point: fabric.Group;
    line: fabric.Line;
    node: fabric.Group;
  }[] = [];

  objectNodeMap: WeakMap<fabric.Group, PathwayNode<ResponsiveCrood>> =
    new WeakMap([]);

  nodeObjectMap: WeakMap<PathwayNode<ResponsiveCrood>, fabric.Group> =
    new WeakMap([]);

  private _cancelSelectEvent = false;

  private _initPathNodes(vizPath: VizPath) {
    const editorPath = vizPath.context.find(EditorPath);
    if (!editorPath) return [];

    const ui = vizPath.context.find(EditorUI);

    const nodes: fabric.Group[] = [];

    // 创建路径关键点的操作点（即实际路径上的节点，而非曲线上的虚拟点）
    vizPath.pathway.forEach(({ section }) => {
      section.forEach((item, index) => {
        const { node } = item;
        if (!node) return;

        // 如果下一个指令是闭合点，则不添加关键点
        // 因为路径补丁的时候遇到闭合点会添加一条到起始点的路径，所以当前关键点正好和起始点一致
        if (section[index + 1]?.instruction?.[0] === InstructionType.CLOSE)
          return;

        const decorator = (innerObject: fabric.Object) => {
          const _object = new fabric.Group([innerObject], {
            name: uuid(),
            // 选中时不出现选中框
            hasBorders: false,
            hasControls: false,
            // 保持居中
            originX: 'center',
            originY: 'center',
          });

          _object[VizPath.symbol] = true;

          // 加入画布时添加自动响应
          _object.on('added', () => {
            node.observe(
              (x, y) => {
                const position = editorPath.calcAbsolutePosition(
                  { x, y },
                  editorPath.nodePathMap.get(node)!.matrix
                );
                if (_object.group) {
                  const relativePosition = editorPath.calcRelativeCrood(
                    position,
                    _object.group.calcTransformMatrix()
                  );
                  _object
                    .set({
                      left: relativePosition.x,
                      top: relativePosition.y,
                    })
                    .setCoords();
                  _object.group.addWithUpdate();
                } else {
                  _object.set(position).setCoords();
                }
              },
              {
                id: _object.name,
                immediate: true,
              }
            );
          });
          // 移除时结束自动响应
          _object.on('removed', () => node.unobserve(_object));

          return _object;
        };

        let object = (ui?.options.node ?? EditorUI.noneUI.node)(
          decorator
        ) as fabric.Group;

        if (!object[VizPath.symbol]) object = decorator(object);

        nodes.push(object);

        this.objectNodeMap.set(object, item);
        this.nodeObjectMap.set(item, object);
      });
    });

    return nodes;
  }

  // 添加活跃组的响应式变化
  private _addActiveSelectionObserve(group: fabric.ActiveSelection) {
    observe(group, ['left', 'top', 'angle'], () => {
      for (const object of group._objects as fabric.Group[]) {
        const decomposeMatrix = fabric.util.qrDecompose(
          object.calcTransformMatrix(false)
        );
        const left = decomposeMatrix.translateX;
        const top = decomposeMatrix.translateY;

        this.move(object, { left, top });
      }
    });
  }

  // 添加单个活跃对象的响应式变化
  private _addActivePointObserve(object: fabric.Group) {
    observe(object, ['left', 'top'], ({ left, top }) => {
      if (object.group) return;
      this.move(object, { left: left!, top: top! });
    });
  }

  // 移除当前控制点
  private _removeCurrentControllers() {
    const editor = this.vizPath?.context.find(Editor);
    editor?.canvas?.remove(
      ...this.controllers.map((i) => [i.point, i.line]).flat(1)
    );
  }

  // 添加活跃节点的周围控制点
  private _addActivePointControllers(nodeObject: fabric.Group) {
    const canvas = nodeObject.canvas;
    if (!canvas) return;

    if (!this.vizPath) return;

    const pathwayNode = this.objectNodeMap.get(nodeObject);
    if (!pathwayNode) return;

    const editorPath = this.vizPath.context.find(EditorPath);
    if (!editorPath) return;

    const ui = this.vizPath.context.find(EditorUI);

    if (!pathwayNode.node) return;

    const controllers: typeof this.controllers = [];

    const cur = pathwayNode;
    const { pre, next } = this.vizPath.getAroundPathwayNodes(pathwayNode);

    const list: [PathwayNode<ResponsiveCrood>, 'pre' | 'next'][] = [];

    if (pre?.controllers?.next) list.push([pre, 'next']);
    if (cur.controllers?.pre) list.push([cur, 'pre']);
    if (cur.controllers?.next) list.push([cur, 'next']);
    if (next?.controllers?.pre) list.push([next, 'pre']);

    // 如果是开始指令且闭合需要特殊处理
    if (
      cur.instruction[0] === InstructionType.START &&
      this.vizPath.isClosePath(cur.section) &&
      pre
    ) {
      const { pre: prePre } = this.vizPath.getAroundPathwayNodes(pre);
      if (prePre?.controllers?.next) list.unshift([prePre, 'next']);
    }

    list.forEach(([pathwayNode, controllerPos]) => {
      // 已存在的节点直接复用
      const existIdx = this.controllers.findIndex(
        (i) =>
          this.objectNodeMap.get(i.node) === pathwayNode &&
          i.type === controllerPos
      );
      if (existIdx !== -1) {
        controllers.push(this.controllers[existIdx]);
        return;
      }

      const node = pathwayNode.node!;
      const controller = pathwayNode.controllers![controllerPos]!;

      /**
       * 创建指令控制点
       */
      const pointDecorator = (innerObject: fabric.Object) => {
        const _object = new fabric.Group([innerObject], {
          name: uuid(),
          // 选中时不出现选中框
          hasBorders: false,
          hasControls: false,
          // 保持居中
          originX: 'center',
          originY: 'center',
        });

        _object[VizPath.symbol] = true;

        // 建立相互响应，指令的数据和元素的位置更改会相互同步
        _object.on('added', () => {
          controller.observe(
            (x, y) => {
              if (_object.canvas?.getActiveObject() === _object) return;
              const position = editorPath.calcAbsolutePosition(
                { x, y },
                editorPath.nodePathMap.get(node)!.matrix
              );
              _object.set(position).setCoords();
            },
            {
              immediate: true,
              id: _object.name,
            }
          );
        });
        _object.on('removed', () => controller.unobserve(_object));

        observe(_object, ['left', 'top'], ({ left, top }) => {
          if (_object.canvas?.getActiveObject() !== _object) return;
          const crood = editorPath.calcRelativeCrood(
            {
              left: left!,
              top: top!,
            },
            editorPath.nodePathMap.get(node)!.matrix
          );
          controller.set(crood, [_object.name]);
        });

        return _object;
      };

      let point = (
        ui?.options.controllerPoint ?? EditorUI.noneUI.controllerPoint
      )(pointDecorator) as fabric.Group;

      if (!point[VizPath.symbol]) point = pointDecorator(point);

      /**
       * 创建控制点和节点的连线
       */
      const lineDecorator = (_line: fabric.Line) => {
        _line.set({
          name: uuid(),
          // 保持比例
          strokeUniform: true,
          // 不允许选中
          selectable: false,
          evented: false,
          // 保持居中
          originX: 'center',
          originY: 'center',
        });

        _line[VizPath.symbol] = true;

        // 建立响应式，让连线随时跟随指令的值进行变化
        _line.on('added', () => {
          node.observe(
            (x, y) => {
              const position = editorPath.calcAbsolutePosition(
                { x, y },
                editorPath.nodePathMap.get(node)!.matrix
              );
              _line.set({ x1: position.left, y1: position.top });
            },
            {
              immediate: true,
              id: _line.name,
            }
          );
          controller.observe(
            (x, y) => {
              const position = editorPath.calcAbsolutePosition(
                { x, y },
                editorPath.nodePathMap.get(node)!.matrix
              );
              _line.set({ x2: position.left, y2: position.top });
            },
            {
              immediate: true,
              id: _line.name,
            }
          );
        });
        _line.on('removed', () => {
          node.unobserve(_line);
          controller.unobserve(_line);
        });

        return _line;
      };
      let line = (ui?.options.controllerLine ?? EditorUI.noneUI.controllerLine)(
        lineDecorator
      );

      if (!line[VizPath.symbol]) line = lineDecorator(line);

      controllers.push({
        type: controllerPos,
        node: this.nodeObjectMap.get(pathwayNode)!,
        point,
        line,
      });
    });

    // 由于需要多次添加关键点和控制点，如果不设置该配置，每次添加和移除都会渲染一次画布，设置为false后可以控制为1次渲染
    canvas.renderOnAddRemove = false;

    // 移除旧对象
    canvas.remove(...this.controllers.map((i) => [i.point, i.line]).flat(1));

    // 初始路径控制点
    this.controllers = controllers;

    // 添加新对象
    this.controllers.forEach((i, idx) => {
      canvas.insertAt(i.line, idx, false);
      canvas.insertAt(i.point, idx + 1, false);
    });

    canvas.renderOnAddRemove = true;

    canvas.requestRenderAll();
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
    const pathwayNode = this.objectNodeMap.get(object);
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

    const newCrood = editorPath.calcRelativeCrood(
      position,
      editorPath.nodePathMap.get(node!)!.matrix
    );
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

    object.canvas?.requestRenderAll();
  }

  focus(...selectedObjects: fabric.Object[]) {
    const canvas = this.editor?.canvas;
    if (!canvas) return;

    const editorPath = this.vizPath?.context.find(EditorPath);
    if (!editorPath) return;

    const focusNodes = selectedObjects.filter((i) =>
      this.nodes.includes(i as fabric.Group)
    ) as fabric.Group[];
    const focusControllerPoints = selectedObjects.filter((i) =>
      this.controllers.find(({ point }) => point === i)
    ) as fabric.Group[];

    // 优先判断是否聚焦关键点
    if (focusNodes.length) {
      // 聚焦多个时只保留关键点
      focusControllerPoints.length = 0;
    }
    // 没有聚焦关键点再考虑是否只有一个控制点聚焦情况
    else if (focusControllerPoints.length === 1) {
      const { node } = this.controllers.find(
        (i) => i.point === focusControllerPoints[0]
      )!;
      // 控制点所在的关键点需要先选中
      focusNodes.push(node);
    }
    // else if (selectedObjects.length == 1) {
    //   const focusPath = editorPath.paths.find(
    //     (i) => i.path === selectedObjects[0]
    //   );
    //   if (focusPath) {
    //     focusNodes.push(
    //       ...this.nodes.filter((node) => {
    //         return (
    //           editorPath.nodePathMap.get(this.objectNodeMap.get(node)!.node!) ===
    //           focusPath
    //         );
    //       })
    //     );
    //   }
    // }

    this._cancelSelectEvent = true;

    // 取消画布选中重新构造只包含关键点的选中框对象
    canvas.discardActiveObject();

    if (focusNodes.length === 1) {
      const focusNode = focusNodes[0];
      this._addActivePointObserve(focusNode);
      this._addActivePointControllers(focusNode);
      canvas.setActiveObject(focusControllerPoints[0] ?? focusNode);
    } else if (focusNodes.length > 1) {
      const activeSelection = new fabric.ActiveSelection(focusNodes, {
        canvas,
        lockScalingFlip: true,
        // TODO: 暂不允许旋转，后续计算会出现精度问题导致多次变换后无法正确呈现位置
        lockRotation: true,
        originX: 'center',
        originY: 'center',
      });
      if (activeSelection.lockRotation) {
        activeSelection.setControlVisible('mtr', false);
      }
      this._addActiveSelectionObserve(activeSelection);
      this._removeCurrentControllers();
      canvas.setActiveObject(activeSelection);
    } else {
      this._removeCurrentControllers();
    }

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

      // 失去当前选中状态
      canvas.discardActiveObject();

      // 由于需要多次添加关键点和控制点，如果不设置该配置，每次添加和移除都会渲染一次画布，设置为false后可以控制为1次渲染
      canvas.renderOnAddRemove = false;

      // 移除旧对象
      canvas.remove(
        ...this.nodes,
        ...this.controllers.map((i) => [i.point, i.line]).flat(1)
      );

      // 初始路径关键点
      this.nodes = this._initPathNodes(vizPath);

      // 添加新对象
      canvas.add(...this.nodes);

      canvas.renderOnAddRemove = true;

      canvas.renderAll();
    });

    vizPath.on('clean', () => {
      const canvas = editor.canvas;
      if (!canvas) return;
      canvas.remove(
        ...this.nodes,
        ...this.controllers.map((i) => [i.point, i.line]).flat(1)
      );
    });
  }
}

export default EditorNode;
