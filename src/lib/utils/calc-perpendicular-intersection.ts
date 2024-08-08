/**
 * 计算点到线段的垂直线交点坐标
 */
const calcPerpendicularIntersection = (p1: Coord, p2: Coord, p0: Coord) => {
  if (p1.x === p2.x) return { x: p1.x, y: p0.y };
  if (p1.y === p2.y) return { x: p0.x, y: p1.y };
  // 计算p1/p2斜率
  const slope = (p2.y - p1.y) / (p2.x - p1.x);

  // 计算垂直线的斜率
  const slopePerpendicular = -1 / slope;

  // 通过代入法求交点
  // 计算垂直线的方程：y - p0.y = slopePerpendicular * (x - p0.x)
  // 计算p1-p2线段方程：y - p1.y = slope * (x - p1.x)
  // y = (slopePerpendicular * (x - p0.x) + p0.y) = slope * (x - p1.x) + p1.y
  // slopePerpendicular * (x - p0.x) + p0.y = slope * (x - p1.x) + p1.y
  // slopePerpendicular * x - slopePerpendicular * p0.x + p0.y = slope * x - slope * p1.x + p1.y
  // slopePerpendicular * x - slope * x =  - slope * p1.x + p1.y + slopePerpendicular * p0.x - p0.y
  // x = (-slope * p1.x + p1.y + slopePerpendicular * p0.x - p0.y) / (slopePerpendicular - slope)
  const x =
    (-slope * p1.x + p1.y + slopePerpendicular * p0.x - p0.y) / (slopePerpendicular - slope);
  const y = slope * (x - p1.x) + p1.y;
  return { x, y };
};

export default calcPerpendicularIntersection;
