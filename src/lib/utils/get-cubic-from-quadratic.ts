import cloneDeep from 'lodash-es/cloneDeep';
import type { Instruction } from '../vizpath.class';

/**
 * 获取二阶曲线的三阶表现
 */
const getCubicFromQuadratic = (p0: Coord, instruction: Instruction) => {
  // 如果不是二阶直接返回
  if (instruction[0] !== 'Q') return cloneDeep(instruction);

  // 解析输入字符串
  const points = Array.from({ length: 2 }).map((_, i) => ({
    x: instruction[i * 2 + 1],
    y: instruction[i * 2 + 2],
  })) as Coord[];

  // 二阶贝塞尔曲线的点
  const [p1, p2] = points;

  // 计算三阶贝塞尔曲线的曲线变换器
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

export default getCubicFromQuadratic;
