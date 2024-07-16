/**
 * 计算两点间的距离
 */
const calcCoordsDistance = (a: Coord, b: Coord) => {
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
};

export default calcCoordsDistance;
