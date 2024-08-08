/**
 * 计算相对位置点
 *
 * @example
 *
 * calcRelativeCoord({ x: 0, y: 0 }, { x: 100, y: 0 }, 20) // { x: 20, y: 0 }
 */
const calcRelativeCoord = (p0: Coord, p1: Coord, value: number) => {
  const coord = { ...p0 };
  const d = {
    x: p1.x - p0.x,
    y: p1.y - p0.y,
  };
  if (d.x === 0 && d.y === 0) return coord;
  if (d.x === 0) coord.y += value * Math.sign(d.y);
  else if (d.y === 0) coord.x += value * Math.sign(d.x);
  else {
    const distance = Math.sqrt(d.x ** 2 + d.y ** 2);
    coord.x += d.x * (value / distance);
    coord.y += d.y * (value / distance);
  }
  return coord;
};

export default calcRelativeCoord;
