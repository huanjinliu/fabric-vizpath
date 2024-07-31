import { InstructionType, type Instruction } from '../path.class';

/**
 * 反转路径
 */
const reversePath = (path: Instruction[]) => {
  const _path: Instruction[] = [];

  let isClosedSegment = false;

  for (let i = path.length - 1; i >= 0; i--) {
    const instruction = path[i];

    const preInstruction = path[i - 1];
    const preInstructionCoord = preInstruction?.slice(preInstruction.length - 2) as number[];

    if (i === path.length - 1) {
      if (instruction[0] === InstructionType.CLOSE) {
        _path.push([InstructionType.START, ...preInstructionCoord] as Instruction);
      } else {
        _path.push([
          InstructionType.START,
          ...instruction.slice(instruction.length - 2),
        ] as Instruction);
      }
    }

    switch (instruction[0]) {
      case InstructionType.START:
        if (isClosedSegment) _path.push([InstructionType.CLOSE]);
        break;
      case InstructionType.LINE:
        _path.push([InstructionType.LINE, ...preInstructionCoord]);
        break;
      case InstructionType.QUADRATIC_CURCE:
        _path.push([
          InstructionType.QUADRATIC_CURCE,
          instruction[1],
          instruction[2],
          ...preInstructionCoord,
        ]);
        break;
      case InstructionType.BEZIER_CURVE:
        _path.push([
          InstructionType.BEZIER_CURVE,
          instruction[3],
          instruction[4],
          instruction[1],
          instruction[2],
          ...preInstructionCoord,
        ]);
        break;
      case InstructionType.CLOSE:
        isClosedSegment = true;
        break;
      default:
        break;
    }
  }

  return _path;
};

export default reversePath;
