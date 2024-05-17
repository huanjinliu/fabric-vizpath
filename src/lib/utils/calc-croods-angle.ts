/**
 * 计算三点间的夹角，b为相交点
 */
const calcCroodsAngle = (a: Crood, b: Crood, c: Crood) => {
  const angleA = Math.atan2(b.y - a.y, b.x - a.x);
  const angleC = Math.atan2(b.y - c.y, b.x - c.x);
  let angle = Math.abs(angleA - angleC) * (180 / Math.PI);
  if (angle > 180) {
    angle = 360 - angle;
  }
  return angle;
}

export default calcCroodsAngle;