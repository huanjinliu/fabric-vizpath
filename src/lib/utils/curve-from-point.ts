/**
 * 通过点与点实现曲线化
 */
const curveFromPoint = (point0: Crood, point: Crood) => {
  const centerPoint = {
    x: (point.x + point0.x) / 2,
    y: (point.y + point0.y) / 2,
  };
  const dx = point.x - centerPoint.x;
  const dy = point.y - centerPoint.y;
  const midPoint = {
    x: centerPoint.x - dy,
    y: centerPoint.y + dx,
  };
  return midPoint as Crood;
};

export default curveFromPoint;
