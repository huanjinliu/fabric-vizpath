import calcTransformMatrix from './calc-transform-matrix';

/**
 * 变换
 * @param coord 路径
 * @param process 变换流程
 */
const transform = (coord: Coord, process: Split<Transform>[]) => {
  const { x, y } = coord;
  const [a, b, c, d, e, f] = calcTransformMatrix(process);
  return {
    x: a * x + c * y + e,
    y: b * x + d * y + f,
  };
};

export default transform;
