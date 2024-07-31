import { Bezier } from 'bezier-js';
import { fabric } from 'fabric';
import { InstructionType, type Instruction } from '../path.class';

/**s
 * 根据路径指令上的一点拆分路径指令
 */
const splitInstruction = (points: Coord[], point: Coord) => {
  if (points.length === 2) {
    return {
      pre: [InstructionType.LINE, point.x, point.y] as Instruction,
      next: [InstructionType.LINE, points[1].x, points[1].y] as Instruction,
    };
  } else {
    const curve = new Bezier(points);
    const { t } = curve.project(point);
    const splitCurves = curve.split(t!);
    const path = new fabric.Path(splitCurves.left.toSVG() + splitCurves.right.toSVG())
      .path! as unknown as Instruction[];

    return { pre: path[1], next: path[3] };
  }
};

export default splitInstruction;
