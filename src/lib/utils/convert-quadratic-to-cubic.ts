import { InstructionType, type Instruction } from '../vizpath.class';

/**
 * 将二阶曲线转换为三阶贝塞尔曲线
 */
const convertQuadraticToCubic = (p0: Crood, instruction: Instruction) => {
  // 如果不是二阶直接返回
  if (instruction[0] !== InstructionType.QUADRATIC_CURCE) return instruction;

  // 解析输入字符串
  const points = Array.from({ length: 2 }).map((_, i) => ({
    x: instruction[i * 2 + 1],
    y: instruction[i * 2 + 2],
  })) as Crood[];

  // 二阶贝塞尔曲线的点
  const [p1, p2] = points;

  // 计算三阶贝塞尔曲线的控制点
  const q1 = {
    x: (2 / 3) * p1.x + (1 / 3) * p0.x,
    y: (2 / 3) * p1.y + (1 / 3) * p0.y,
  };
  const q2 = {
    x: (2 / 3) * p1.x + (1 / 3) * p2.x,
    y: (2 / 3) * p1.y + (1 / 3) * p2.y,
  };
  const q3 = p2;

  // 创建三阶贝塞尔曲线指令
  return ['C', q1.x, q1.y, q2.x, q2.y, q3.x, q3.y] as Instruction;
};

export default convertQuadraticToCubic;
