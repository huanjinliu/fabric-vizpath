import { fabric } from 'fabric';
import { v4 as uuid } from 'uuid';
import { deepIterateGroup, observe, transform } from '@utils';
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

  objectNodeMap: Map<fabric.Group, PathwayNode<ResponsiveCrood>> =
    new Map([]);

  nodeObjectMap: Map<PathwayNode<ResponsiveCrood>, fabric.Group> =
    new Map([]);

  activeNodes: fabric.Group[] = [];

  activePoint: fabric.Group | null = null;

  private _cancelSelectEvent = false;

  /**
   * 废弃的画布对象池，可用于复用减少创建消耗
   */
  private _abandonedPool: {
    nodes: fabric.Group[];
    points: fabric.Group[];
    lines: fabric.Line[];
  } = {
    nodes: [],
    points: [],
    lines: [],
  };

  private _initPathNodes() {
    const objects: fabric.Group[] = [];
    const objectNodeMap: typeof this.objectNodeMap = new Map();
    const nodeObjectMap: typeof this.nodeObjectMap = new Map();

    const vizPath = this.vizPath;
    const editorPath = vizPath?.context.find(EditorPath);
    if (!vizPath || !editorPath)
      return { objects, objectNodeMap, nodeObjectMap };

    const ui = vizPath?.context.find(EditorUI);

    /**
     * 创建关键点对应的fabric对象
     * @param node 关键点
     * @param originObject 来源对象
     */
    const createNodeObject = (
      node: ResponsiveCrood,
      originObject?: fabric.Group
    ) => {
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

        // 不做另外的画布缓存
        deepIterateGroup(_object, (object) => {
          object.set({
            objectCaching: false,
          });
        });

        _object[VizPath.symbol] = VizPathSymbalType.NODE;

        return _object;
      };

      let object =
        originObject ??
        ((ui?.options.node ?? EditorUI.noneUI.node)(decorator) as fabric.Group);

      if (!object[VizPath.symbol]) object = decorator(object);

      // 加入画布时添加自动响应
      const onAddedNode = () => {
        node.observe(
          (x, y) => {
            const position = editorPath.calcAbsolutePosition(
              { x, y },
              editorPath.nodePathMap.get(node)!.originPath
            );
            if (object.group) {
              const relativePosition = editorPath.calcRelativeCrood(
                position,
                object.group
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
      };

      // 移除时结束自动响应
      const onRemovedNode = () => {
        object.off('added', onAddedNode);
        object.off('removed', onRemovedNode);
        node.unobserve(object.name);
        observe(object, ['left', 'top'], () => {});
        this._abandonedPool.nodes.push(object);
      };

      object.on('added', onAddedNode);
      object.on('removed', onRemovedNode);

      return object;
    };

    // 第一轮遍历为了重用旧对象
    vizPath.pathway.forEach(({ section }) => {
      section.forEach((item, index) => {
        const { node } = item;
        if (!node) return;

        // 如果下一个指令是闭合点，则不添加关键点
        // 因为路径补丁的时候遇到闭合点会添加一条到起始点的路径，所以当前关键点正好和起始点一致
        if (section[index + 1]?.instruction?.[0] === InstructionType.CLOSE)
          return;

        const reuseObject = this.nodeObjectMap.get(item);
        if (reuseObject) {
          const object = createNodeObject(node, reuseObject);
          if (!object) return;

          objects.push(object);
          objectNodeMap.set(object, item);
          nodeObjectMap.set(item, object);
        }
      });
    });

    // 第二轮遍历则是为了创建新对象
    vizPath.pathway.forEach(({ section }) => {
      section.forEach((item, index) => {
        const { node } = item;
        if (!node) return;

        // 如果下一个指令是闭合点，则不添加关键点
        // 因为路径补丁的时候遇到闭合点会添加一条到起始点的路径，所以当前关键点正好和起始点一致
        if (section[index + 1]?.instruction?.[0] === InstructionType.CLOSE)
          return;

        if (nodeObjectMap.has(item)) return;

        let recycleObject: fabric.Group | undefined;
        do {
          recycleObject = this._abandonedPool.nodes.pop();
        } while (recycleObject && objectNodeMap.has(recycleObject));

        const object = createNodeObject(node, recycleObject);
        if (!object) return;

        objects.push(object);
        objectNodeMap.set(object, item);
        nodeObjectMap.set(item, object);
      });
    });

    return {
      objects,
      objectNodeMap,
      nodeObjectMap,
    };
  }

  /**
   * 添加活跃组的响应式变化
   */
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
      });
    });
  }

  /**
   * 添加单个活跃对象的响应式变化
   */
  private _addActivePointObserve(object: fabric.Group) {
    observe(object, ['left', 'top'], ({ left, top }) => {
      if (object.group) return;
      this.move(object, { left: left!, top: top! });
    });
  }

  /**
   * 移除当前控制点
   */
  private _removeCurrentControllers() {
    const editor = this.vizPath?.context.find(Editor);
    const canvas = editor?.canvas;
    if (!canvas) return;

    canvas.renderOnAddRemove = false;
    this.controllers.forEach((i) => {
      canvas.remove(i.point, i.line);
    });
    this.controllers = [];
    canvas.renderOnAddRemove = true;
    canvas.requestRenderAll();
  }

  /**
   * 添加活跃节点的周围控制点
   */
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

    // 控制1次渲染
    canvas.renderOnAddRemove = false;

    // 移除旧对象
    canvas.remove(...this.controllers.map((i) => [i.point, i.line]).flat(1));

    // 创建新的路径控制点
    const controllers: typeof this.controllers = [];

    const neighboringNodes = this.vizPath.getMoreNeighboringNodes(pathwayNode);

    neighboringNodes.forEach(([type, pathwayNode]) => {
      const pos = type.split('-')[1] as 'pre' | 'next';

      const node = pathwayNode.node;
      const controller = pathwayNode.controllers![pos];
      if (!node || !controller) return;

      // 已存在的节点直接复用避免丢失选中状态
      const existIdx = this.controllers.findIndex((i) => {
        return i.node === pathwayNode && i.type === pos;
      });
      const reuseController = this.controllers[existIdx];

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

        // 不做另外的画布缓存
        deepIterateGroup(_object, (object) => {
          object.set({
            objectCaching: false,
          });
        });

        _object[VizPath.symbol] = VizPathSymbalType.CONTROLLER_POINT;

        return _object;
      };

      let point =
        reuseController?.point ??
        this._abandonedPool.points.pop() ??
        ((ui?.options.controllerPoint ?? EditorUI.noneUI.controllerPoint)(
          pointDecorator
        ) as fabric.Group);

      if (!point[VizPath.symbol]) point = pointDecorator(point);

      // 建立相互响应，指令的数据和元素的位置更改会相互同步
      const onAddedPoint = () => {
        controller.observe(
          (x, y) => {
            if (point.canvas?.getActiveObject() === point) return;
            const position = editorPath.calcAbsolutePosition(
              { x, y },
              editorPath.nodePathMap.get(node)!.originPath
            );
            point.set(position).setCoords();
          },
          {
            immediate: true,
            id: point.name,
          }
        );
        observe(point, ['left', 'top'], ({ left, top }) => {
          if (point.canvas?.getActiveObject() !== point) return;
          const crood = editorPath.calcRelativeCrood(
            {
              left: left!,
              top: top!,
            },
            editorPath.nodePathMap.get(node)!.originPath
          );
          controller.setCrood(crood, [point.name]);
        });
      };
      const onRemovedPoint = () => {
        point.off('added', onAddedPoint);
        point.off('removed', onRemovedPoint);

        controller.unobserve(point.name);
        observe(point, ['left', 'top'], () => {});
        this._abandonedPool.points.push(point);
      };
      point.on('added', onAddedPoint);
      point.on('removed', onRemovedPoint);

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
          // 不做另外的画布缓存
          objectCaching: false,
        });

        _line[VizPath.symbol] = VizPathSymbalType.CONTROLLER_LINE;

        return _line;
      };

      let line =
        reuseController?.line ??
        this._abandonedPool.lines.pop() ??
        (ui?.options.controllerLine ?? EditorUI.noneUI.controllerLine)(
          lineDecorator
        );

      if (!line[VizPath.symbol]) line = lineDecorator(line);

      // 建立响应式，让连线随时跟随指令的值进行变化
      const onAddedLine = () => {
        node.observe(
          (x, y) => {
            const position = editorPath.calcAbsolutePosition(
              { x, y },
              editorPath.nodePathMap.get(node)!.originPath
            );
            line.set({ x1: position.left, y1: position.top });
          },
          {
            immediate: true,
            id: line.name,
          }
        );
        controller.observe(
          (x, y) => {
            const position = editorPath.calcAbsolutePosition(
              { x, y },
              editorPath.nodePathMap.get(node)!.originPath
            );
            line.set({ x2: position.left, y2: position.top });
          },
          {
            immediate: true,
            id: line.name,
          }
        );
      };
      const onRemovedLine = () => {
        line.off('added', onAddedLine);
        line.off('removed', onRemovedLine);

        node.unobserve(line.name);
        controller.unobserve(line.name);
        this._abandonedPool.lines.push(line);
      };
      line.on('added', onAddedLine);
      line.on('removed', onRemovedLine);

      // 如果是重用的控制点，从废弃池中拿出，避免其他对象错误使用
      if (reuseController) {
        this._abandonedPool.points = this._abandonedPool.points.filter(
          (p) => p !== point
        );
        this._abandonedPool.lines = this._abandonedPool.lines.filter(
          (l) => l !== line
        );
      }

      controllers.push({
        type: pos,
        node: pathwayNode,
        point,
        line,
      });
    });

    this.controllers = controllers;

    // 添加新对象
    this.controllers.forEach((i, idx) => {
      canvas.insertAt(i.line, editorPath.paths.length + idx, false);
      canvas.insertAt(i.point, editorPath.paths.length + idx + 1, false);
    });

    canvas.renderOnAddRemove = true;

    canvas.requestRenderAll();
  }

  /**
   * 初始画布节点选中事件
   */
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

      let focusPath: (typeof editorPath.paths)[number] | undefined;
      for (let i = editorPath.paths.length - 1; i >= 0; i--) {
        const path = editorPath.paths[i];
        if (path.originPath.containsPoint(e.pointer)) {
          focusPath = path;
          break;
        }
      }
      if (focusPath) {
        this.focus(
          ...this.nodes.filter(
            (node) =>
              editorPath.nodePathMap.get(
                this.objectNodeMap.get(node)!.node!
              ) === focusPath
          )
        );
      }
    });
  }

  /**
   * 初始路径绘制事件
   */
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
      this.blur();

      // 初始路径关键点
      const { objects, objectNodeMap, nodeObjectMap } = this._initPathNodes();

      // 由于需要多次添加关键点和控制点，如果不设置该配置，每次添加和移除都会渲染一次画布，设置为false后可以控制为1次渲染
      canvas.renderOnAddRemove = false;

      // 移除旧对象
      canvas.remove(...this.nodes);
      this.objectNodeMap.clear();
      this.nodeObjectMap.clear();

      // 添加新对象并重新建立映射关系
      this.nodes = objects;
      this.objectNodeMap = objectNodeMap;
      this.nodeObjectMap = nodeObjectMap;

      canvas.add(...objects);

      canvas.renderOnAddRemove = true;

      canvas.requestRenderAll();
    };

    this.vizPath.on('draw', updateNodes);
  }

  /**
   * 初始路径清除事件
   */
  private _initClearEvents() {
    if (!this.vizPath) return;

    const editor = this.vizPath.context.find(Editor);
    if (!editor) return;

    const canvas = editor.canvas;
    if (!canvas) return;

    this.vizPath.on('clear', (pathway) => {
      const removeObjects: fabric.Group[] = [];
      pathway.forEach(({ section }) => {
        section.forEach((node) => {
          const object = this.nodeObjectMap.get(node);
          if (object) removeObjects.push(object);
        });
      });

      this.blur();
      canvas.remove(...removeObjects);

      removeObjects.forEach((object) => {
        const node = this.objectNodeMap.get(object);
        if (node) {
          this.nodeObjectMap.delete(node);
          this.objectNodeMap.delete(object);
        }
      });
      this.nodes = this.nodes.filter((i) => !removeObjects.includes(i));
    });

    this.vizPath.on('clearAll', () => {
      this.blur();
      canvas.remove(...this.nodes);
      this.nodes = [];
      this.objectNodeMap.clear();
      this.nodeObjectMap.clear();
    });

    this.vizPath.on('destroy', () => {
      this._abandonedPool = {
        nodes: [],
        points: [],
        lines: [],
      };
    });
  }

  /**
   * 初始路径指令转换事件
   */
  private _initConvertEvents() {
    if (!this.editor) return;

    this.editor.on('canvas', 'mouse:dblclick', (event) => {
      const { target, pointer } = event;

      if (target) return;

      console.log(event);

      // 判断是否处于可添加状态
      // if (!this._inbuiltStatus.awaitAdd) return;

      // newNode = this.add({ left: pointer.x, top: pointer.y });
    });
  }

  /**
   * 初始路径点添加事件
   */
  // private _initAddEvents() {
  //   if (!this.editor) return;

  //   const editorPath = this.vizPath?.context.find(EditorPath);
  //   if (!editorPath) return;

  //   let newNode: PathwayNode<ResponsiveCrood> | undefined;
  //   let newNodeObject: fabric.Group | undefined;
  //   let upgradeInstruction: Instruction | undefined;
  //   this.editor.on('canvas', 'mouse:down:before', (event) => {
  //     const { target, pointer } = event;

  //     if (target) return;

  //     // 判断是否处于可添加状态
  //     // if (!this._inbuiltStatus.awaitAdd) return;

  //     newNode = this.add({ left: pointer.x, top: pointer.y });
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
  //     const { e, target, pointer } = event;

  //     if (newNode && newNodeObject) {
  //       // 如果鼠标还在点上不触发控制曲线作用，当移出后才触发，避免触发敏感
  //       if (newNodeObject.containsPoint(event.pointer)) return;

  //       const position = { left: pointer.x, top: pointer.y };
  //       const mirrorPosition = {
  //         left: newNodeObject.left! - (pointer.x - newNodeObject.left!),
  //         top: newNodeObject.top! - (pointer.y - newNodeObject.top!),
  //       };
  //       const newCrood = editorPath.calcRelativeCrood(
  //         mirrorPosition,
  //         editorPath.nodePathMap.get(newNode.node!)!.originPath
  //       );

  //       newNode = this.vizPath?.replace(newNode.node!, [
  //         InstructionType.QUADRATIC_CURCE,
  //         newCrood.x,
  //         newCrood.y,
  //         newNode.node?.x,
  //         newNode.node?.y,
  //       ] as Instruction);
  //       newNodeObject = this.nodeObjectMap.get(newNode!)!;

  //       // next instruction
  //       const { next } = this.vizPath?.getNeighboringNodes(newNode!) ?? {};
  //       if (next) {
  //         const nextHandlerCrood = editorPath.calcRelativeCrood(
  //           position,
  //           editorPath.nodePathMap.get(next.node!)!.originPath
  //         );
  //         this.vizPath?.replace(next.node!, [
  //           InstructionType.QUADRATIC_CURCE,
  //           nextHandlerCrood.x,
  //           nextHandlerCrood.y,
  //           next.node?.x,
  //           next.node?.y,
  //         ] as Instruction);
  //       }

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

    const _objects = objects.length ? objects : this.activeNodes;

    const removeNodes: ResponsiveCrood[] = [];
    _objects.forEach((object) => {
      if (object[VizPath.symbol] !== VizPathSymbalType.NODE) return;

      const { node } = this.objectNodeMap.get(object)!;
      if (!node) return;

      removeNodes.push(node);
    });

    this.vizPath?.remove(...removeNodes);
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

  add(position: { left: number; top: number }) {
    if (!this.vizPath) return;

    if (this.activeNodes.length !== 1) return;

    const editorPath = this.vizPath?.context.find(EditorPath);
    if (!editorPath) return;

    const node = this.activeNodes[0];

    const pathwayNode = this.objectNodeMap.get(node);
    if (!pathwayNode) return;

    const newCrood = editorPath.calcRelativeCrood(
      position,
      editorPath.nodePathMap.get(pathwayNode.node!)!.originPath
    );

    const addPathwayNode = this.vizPath.insert(pathwayNode.node!, newCrood);
    if (!addPathwayNode) return;

    return this.nodeObjectMap.get(addPathwayNode);
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
      const object =
        this.nodeObjectMap.get(node) ?? this.nodeObjectMap.get(node.section[0]);
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
      canvas.setActiveObject(activeSelection);
    } else {
      this._removeCurrentControllers();
    }

    this.activeNodes = focusNodes;
    this.activePoint = focusControllerPoints[0] ?? null;
    this._cancelSelectEvent = false;
  }

  blur() {
    this.focus();
  }

  load(vizPath: VizPath) {
    const editor = vizPath.context.find(Editor);
    if (!editor) return;

    this.vizPath = vizPath;
    this.editor = editor;

    this._initSelectEvents();
    this._initDrawEvents();
    this._initClearEvents();
    this._initConvertEvents();
    // this._initAddEvents();
  }
}

export default EditorNode;
