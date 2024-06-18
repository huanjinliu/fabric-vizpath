import { Bezier } from 'bezier-js';

/**
 * 通过线与点实现曲线化
 */
const curveFromLine = (line: [start: Crood, end: Crood], point: Crood, t = 0.5) => {
  const [start, end] = line;
  // const curvePoint = {
  //   x: end.x + (point.x - start.x) / 2,
  //   y: end.y + (point.y - start.y) / 2,
  // };
  // const curve = (Bezier as any).quadraticFromPoints(...[end, curvePoint, point].flat(1), t);
  // return curve.points[1] as Crood;
  return {
    x: end.x - (start.x - end.x),
    y: end.y - (start.y - end.y),
  };
};

export default curveFromLine;
