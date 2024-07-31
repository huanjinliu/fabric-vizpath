/**
 * 变换
 * @param coord 路径
 * @param process 变换流程
 */
const transform = (
  coord: Coord,
  process: ({ translate: Coord } | { scale: number | Coord } | { rotate: number })[],
) => {
  let { x, y } = coord;

  process.forEach((item) => {
    const { translate, scale, rotate } = item as Partial<Transform>;
    if (scale !== undefined) {
      x *= typeof scale === 'number' ? scale : scale.x;
      y *= typeof scale === 'number' ? scale : scale.y;
    }

    if (rotate !== undefined) {
      const _x = x;
      const _y = y;
      x = Math.cos((rotate * Math.PI) / 180) * _x - Math.sin((rotate * Math.PI) / 180) * _y;
      y = Math.sin((rotate * Math.PI) / 180) * _x + Math.cos((rotate * Math.PI) / 180) * _y;
    }

    if (translate !== undefined) {
      x += translate.x;
      y += translate.y;
    }
  });

  return { x, y };
};

export default transform;
