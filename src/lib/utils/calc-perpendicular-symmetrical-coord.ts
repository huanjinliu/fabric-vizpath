import calcPerpendicularIntersection from './calc-perpendicular-intersection';

/**
 * 计算点对于某线段中心垂直线的对称点坐标
 */
const calcPerpendicularSymmetricalCoord = (p1: Coord, p2: Coord, p0: Coord) => {
  const p = calcPerpendicularIntersection(p1, p2, p0);
  const sp = {
    x: p2.x - (p.x - p1.x),
    y: p2.y - (p.y - p1.y),
  };
  return {
    x: sp.x + (p0.x - p.x),
    y: sp.y + (p0.y - p.y),
  };
};

export default calcPerpendicularSymmetricalCoord;
