import { fabric } from 'fabric';
import { v4 as uuid } from 'uuid';
import { observe, transform } from '@utils';
import EditorModule from '../base.class';
import Editor from '../editor/index.class';
import VizPath, { VizPathSymbalType } from '../../vizpath.class';
import EditorPath from '../editor-path/index.class';
import { InstructionType, type Instruction, type PathwayNode } from '../..';
import type { ResponsiveCrood } from '../../vizpath.class';
import EditorUI from '../editor-ui/index.class';

class EditorNode extends EditorModule {
  static ID = Symbol('editor-node');

  vizPath: VizPath | null = null;

  editor: Editor | null = null;

  nodes: fabric.Group[] = [];

  controllers: {
    type: 'pre' | 'next';
    node: PathwayNode<ResponsiveCrood>;
    point: fabric.Group;
    line: fabric.Line;
  }[] = [];

  objectNodeMap: WeakMap<fabric.Group, PathwayNode<ResponsiveCrood>> =
    new WeakMap([]);

  nodeObjectMap: WeakMap<PathwayNode<ResponsiveCrood>, fabric.Group> =
    new WeakMap([]);

  activeNodes: fabric.Group[] = [];

  activePoint: fabric.Group | null = null;

  private _cancelSelectEvent = false;

  private _initPathNodes() {
    const vizPath = this.vizPath;
    if (!vizPath) return [];

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

          _object[VizPath.symbol] = VizPathSymbalType.NODE;

          // 加入画布时添加自动响应
          _object.on('added', () => {
            node.observe(
              (x, y) => {
                const position = editorPath.calcAbsolutePosition(
                  { x, y },
                  editorPath.nodePathMap.get(node)!.originPath
                );
                if (_object.group) {
                  const relativePosition = editorPath.calcRelativeCrood(
                    position,
                    _object.group
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

        let object = this.nodeObjectMap.get(item) ?? (ui?.options.node ?? EditorUI.noneUI.node)(
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
      this.vizPath?.onceRerenderOriginPath(() => {
        for (const object of group._objects as fabric.Group[]) {
          const decomposeMatrix = fabric.util.qrDecompose(
            object.calcTransformMatrix(false)
          );
          const left = decomposeMatrix.translateX;
          const top = decomposeMatrix.translateY;

          this.move(object, { left, top });
        }
      })
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

    const neighboringNodes = this.vizPath.getMoreNeighboringNodes(pathwayNode);

    neighboringNodes.forEach(([type, pathwayNode]) => {
      const pos = type.split('-')[1] as 'pre' | 'next';
      // 已存在的节点直接复用
      const existIdx = this.controllers.findIndex((i) => {
        return i.node === pathwayNode && i.type === pos;
      });
      if (existIdx !== -1) {
        controllers.push(this.controllers[existIdx]);
        return;
      }

      const node = pathwayNode.node;
      const controller = pathwayNode.controllers![pos];
      if (!node || !controller) return;

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

        _object[VizPath.symbol] = VizPathSymbalType.CONTROLLER_POINT;

        // 建立相互响应，指令的数据和元素的位置更改会相互同步
        _object.on('added', () => {
          controller.observe(
            (x, y) => {
              if (_object.canvas?.getActiveObject() === _object) return;
              const position = editorPath.calcAbsolutePosition(
                { x, y },
                editorPath.nodePathMap.get(node)!.originPath
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
            editorPath.nodePathMap.get(node)!.originPath
          );
          controller.setCrood(crood, [_object.name]);
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

        _line[VizPath.symbol] = VizPathSymbalType.CONTROLLER_LINE;

        // 建立响应式，让连线随时跟随指令的值进行变化
        _line.on('added', () => {
          node.observe(
            (x, y) => {
              const position = editorPath.calcAbsolutePosition(
                { x, y },
                editorPath.nodePathMap.get(node)!.originPath
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
                editorPath.nodePathMap.get(node)!.originPath
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
        type: pos,
        node: pathwayNode,
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
      canvas.insertAt(i.line, editorPath.paths.length + idx, false);
      canvas.insertAt(i.point, editorPath.paths.length + idx + 1, false);
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
      // this.focus();
    });
    // 选中路径段时自动选中路线段内的所有指令关键点
    this.editor.on('canvas', 'mouse:dblclick', (e) => {
      if (e.target !== null) return;

      const editorPath = this.vizPath?.context.find(EditorPath);
      if (!editorPath) return;

      let focusPath: typeof editorPath.paths[number] | undefined;
      for (let i = editorPath.paths.length - 1; i >= 0; i--) {
        const path = editorPath.paths[i];
        if (path.originPath.containsPoint(e.pointer)) {
          focusPath = path;
          break;
        }
      }
      if (focusPath) {
        this.focus(
          ...this.nodes.filter((node) => (
            editorPath.nodePathMap.get(this.objectNodeMap.get(node)!.node!) ===
            focusPath
          ))
        )
      }
    })
  }

  private _initDrawEvents() {
    if (!this.vizPath) return;

    const editor = this.vizPath.context.find(Editor);
    if (!editor) return;

    const editorPath = this.vizPath.context.find(EditorPath);
    if (!editorPath) return;

    const updateNodes = () => {
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
      this.nodes = this._initPathNodes();

      // 添加新对象
      canvas.add(...this.nodes);

      canvas.renderOnAddRemove = true;

      canvas.renderAll();
    }

    this.vizPath.on('draw', updateNodes);
    this.vizPath.on('clear', updateNodes);
  }

  private _initClearEvents() {
    if (!this.vizPath) return;

    const editor = this.vizPath.context.find(Editor);
    if (!editor) return;

    this.vizPath.on('clearAll', () => {
      const canvas = editor.canvas;
      if (!canvas) return;
      canvas.remove(
        ...this.nodes,
        ...this.controllers.map((i) => [i.point, i.line]).flat(1)
      );
      this.nodes = [];
      this.controllers = [];
      this.activeNodes = [];
      this.activePoint = null;
    });
  }

  // private _initAddEvents() {
  //   if (!this.editor) return;

  //   const editorPath = this.vizPath?.context.find(EditorPath);
  //   if (!editorPath) return;

  //   let newNode: PathwayNode<ResponsiveCrood> | undefined;
  //   let newNodeObject: fabric.Group | undefined;
  //   let upgradeInstruction: Instruction | undefined;
  //   this.editor.on('canvas', 'mouse:down:before', (event) => {
  //     const { e, target } = event;

  //     if (target) return;

  //     // 判断是否是添加
  //     // if (!this._inbuiltStatus.awaitAdd) return;

  //     const node = this.activeNodes[0];

  //     const pathwayNode = this.objectNodeMap.get(node);
  //     if (!pathwayNode) return;

  //     const position = { left: e.offsetX, top: e.offsetY };
  //     const newCrood = editorPath.calcRelativeCrood(
  //       position,
  //       editorPath.nodePathMap.get(pathwayNode.node!)!.originPath
  //     );

  //     newNode = this.vizPath?.insert(pathwayNode.node!, newCrood);
  //   });
  //   this.editor.on('canvas', 'mouse:down', () => {
  //     if (!newNode) return;
  //     newNodeObject = this.nodeObjectMap.get(newNode)!;
  //     if (newNodeObject) {
  //       this.focus(newNodeObject);
  //       this.editor!.canvas!.selection = false;
  //     }
  //   });
  //   this.editor.on('canvas', 'mouse:move', (event) => {
  //     const { e } = event;

  //     if (newNode && newNodeObject) {
  //       // 如果鼠标还在点上不触发控制曲线作用，当移出后才触发，避免触发敏感
  //       if (newNodeObject.containsPoint(event.pointer)) return;

  //       const position = { left: e.offsetX, top: e.offsetY };
  //       const mirrorPosition = {
  //         left: newNodeObject.left! - (e.offsetX - newNodeObject.left!),
  //         top: newNodeObject.top! - (e.offsetY - newNodeObject.top!)
  //       }
  //       const newCrood = editorPath.calcRelativeCrood(
  //         mirrorPosition,
  //         editorPath.nodePathMap.get(newNode.node!)!.originPath
  //       );

  //       newNode = this.vizPath?.update(newNode.node!, [
  //         InstructionType.QUADRATIC_CURCE,
  //         newCrood.x,
  //         newCrood.y,
  //         newNode.node?.x,
  //         newNode.node?.y
  //       ] as Instruction);

  //       // next instruction
  //       const { next } = this.vizPath?.getNeighboringNodes(newNode!) ?? {};
  //       if (next) {
  //         const nextHandlerCrood = editorPath.calcRelativeCrood(
  //           position,
  //           editorPath.nodePathMap.get(next.node!)!.originPath
  //         );
  //         const _nextNode = this.vizPath?.update(next.node!, [
  //           InstructionType.QUADRATIC_CURCE,
  //           nextHandlerCrood.x,
  //           nextHandlerCrood.y,
  //           next.node?.x,
  //           next.node?.y
  //         ] as Instruction);
  //         const { pre } = this.vizPath?.getNeighboringNodes(_nextNode!) ?? {};
  //         newNode = pre;
  //       }
  //       newNodeObject = this.nodeObjectMap.get(newNode!)!;
  //       this.focus(newNodeObject);



  //       // if (upgradeInstruction[0] === InstructionType.QUADRATIC_CURCE) {
  //       //   upgradeInstruction[1] = newCrood.x;
  //       //   upgradeInstruction[2] = newCrood.y;
  //       // } else {
  //       //   upgradeInstruction[0] = InstructionType.QUADRATIC_CURCE;
  //       //   upgradeInstruction.splice(1, 0, newCrood.x, newCrood.y);
  //       // }
  //       // this._updatePointHandlers();
  //     }
  //   });
  //   this.editor.on('canvas', 'mouse:up', () => {
  //     upgradeInstruction = undefined;
  //     newNodeObject = undefined;
  //     newNode = undefined;
  //     this.editor!.canvas!.selection = true;
  //     // this._fire('update');
  //   });
  // }

  remove(...objects: fabric.Group[]) {
    const canvas = this.editor?.canvas;
    if (!canvas) return;

    const removeNodes: ResponsiveCrood[] = [];
    objects.forEach(object => {
      if (object[VizPath.symbol] !== VizPathSymbalType.NODE) return;

      const { node } = this.objectNodeMap.get(object)!;
      if (!node) return;

      removeNodes.push(node);
    })
    this.vizPath?.remove(...removeNodes);

    canvas.remove(...objects);
    canvas.requestRenderAll();
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

    const { node, section } = pathwayNode;

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
      editorPath.nodePathMap.get(node!)!.originPath
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

    node!.setCrood(newCrood, [object!.name]);

    const list = this.vizPath?.getMoreNeighboringNodes(pathwayNode);
    list?.forEach(([type, node]) => {
      if (type === 'cur-pre' || type === 'cur-next') {
        followCroods.push(node.controllers![type.split('-')[1]]!);
      }
    });

    // 如果『路径自动闭合（带有z指令）』，首尾两个节点需要同步操作
    if (
      section[section.length - 1]?.instruction?.[0] === InstructionType.CLOSE &&
      section.length > 2
    ) {
      if (section[0].node === node) {
        const { node } = section[section.length - 2];
        node!.setCrood(newCrood);
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

  add(position: {
    left: number;
    top: number;
  }) {
    if (this.activeNodes.length !== 1) return;

    const editorPath = this.vizPath?.context.find(EditorPath);
    if (!editorPath) return [];

    const node = this.activeNodes[0];

    const pathwayNode = this.objectNodeMap.get(node);
    if (!pathwayNode) return;

    const newCrood = editorPath.calcRelativeCrood(
      position,
      editorPath.nodePathMap.get(pathwayNode.node!)!.originPath
    );

    const newPathwayNode = this.vizPath?.insert(pathwayNode.node!, newCrood);
    this.focus(this.nodeObjectMap.get(newPathwayNode!)!);
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
      const object = this.nodeObjectMap.get(node) ?? this.nodeObjectMap.get(node.section[0]);
      if (object) focusNodes.push(object);
    }

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

    this.activeNodes = focusNodes;
    this.activePoint = focusControllerPoints[0] ?? null;
    this._cancelSelectEvent = false;
  }

  load(vizPath: VizPath) {
    const editor = vizPath.context.find(Editor);
    if (!editor) return;

    this.vizPath = vizPath;
    this.editor = editor;

    this._initSelectEvents();
    this._initDrawEvents();
    this._initClearEvents();
    // this._initAddEvents();
  }
}

export default EditorNode;
