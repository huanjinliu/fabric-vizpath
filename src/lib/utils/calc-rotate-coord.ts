/**
 * 计算一个点绕另一个点旋转特定角度后的新坐标
 */
const calcRotateCoord = (p1: Coord, p0: Coord, angle: number) => {
  const radians = (angle * Math.PI) / 180; // 角度转弧度
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  const x = cos * (p1.x - p0.x) - sin * (p1.y - p0.y) + p0.x;
  const y = sin * (p1.x - p0.x) + cos * (p1.y - p0.y) + p0.y;

  return { x, y };
};

export default calcRotateCoord;
