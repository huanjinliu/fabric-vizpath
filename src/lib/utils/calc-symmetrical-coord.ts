/**
 * 计算点对于另一个点的对称点坐标
 */
const calcSymmetricalCoord = (p1: Coord, p0: Coord) => {
  return {
    x: p0.x - (p1.x - p0.x),
    y: p0.y - (p1.y - p0.y),
  };
};

export default calcSymmetricalCoord;
