import { fabric } from 'fabric';
import { Bezier } from 'bezier-js';
import type Vizpath from '../../vizpath.class';
import EditorModule from '../base.class';
import EditorNode from '../editor-node/index.class';
import Editor from '../editor/index.class';
import { InstructionType, type Instruction } from 'src/lib';
import { convertQuadraticToCubic } from '@utils';

/**
 * 编辑器 —— 曲线操作模块：1.双击实现指令升降级 2.实现路径选点拆分
 */
class EditorBezier extends EditorModule {
  static ID = 'editor-bezier';

  /**
   * 根据路径指令上的一点拆分路径指令
   */
  private _splitInstruction(points: Crood[], point: Crood) {
    if (points.length === 2) {
      return {
        pre: [InstructionType.LINE, point.x, point.y] as Instruction,
        next: [InstructionType.LINE, points[1].x, points[1].y] as Instruction,
      };
    } else {
      const curve = new Bezier(points);
      curve.derivative(100);
      const { t } = curve.project(point);
      const splitCurves = curve.split(t!);
      const path = new fabric.Path(splitCurves.left.toSVG() + splitCurves.right.toSVG())
        .path! as unknown as Instruction[];

      return {
        pre: convertQuadraticToCubic({ x: path[0][1], y: path[0][2] }, path[1]),
        next: convertQuadraticToCubic({ x: path[2][1], y: path[2][2] }, path[3]),
      };
    }
  }

  unload() {
    // TODO: module unload
  }

  load(vizpath: Vizpath) {
    const editor = vizpath.context.find(Editor);
    if (!editor) return;

    const editorNode = vizpath.context.find(EditorNode);
    if (!editorNode) return;

    editor.canvas?.on('mouse:dblclick', (event) => {
      const { target } = event;

      if (!target || !editorNode.nodes.includes(target)) return;

      const curveDots = editorNode.curveDots.filter((i) => i.node === target);

      // 如果有控制点直接降级为直线
      if (curveDots.length) {
        editorNode.degrade(target, 'both', true);
        return;
      }
      // 否则则升级为曲线
      const pathNode = editorNode.objectNodeMap.get(target)!;
      const { pre, next } = vizpath.getNeighboringNodes(pathNode);

      if (pre && next) {
        const points = [pre, pathNode, next].map((item) => item.node!);
        // 这里使用quadraticFromPoints，是使三个点组合成曲线路径（点都在曲线上）
        const splitCurves = this._splitInstruction(
          (Bezier as any).quadraticFromPoints(...points).points,
          points[1],
        );
        const neighboringInstructions = vizpath.getNeighboringInstructions(pathNode);
        vizpath.replace(
          pathNode.instruction[0] === InstructionType.START
            ? neighboringInstructions.pre!
            : pathNode,
          splitCurves.pre,
        );
        vizpath.replace(neighboringInstructions.next!, splitCurves.next);
      }
    });
  }
}

export default EditorBezier;
