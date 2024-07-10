/**
 * 变换
 * @param crood 路径
 * @param process 变换流程
 */
const transform = (
  crood: Crood,
  process: ({ translate: Crood } | { scale: number | Crood } | { rotate: number })[],
) => {
  let { x, y } = crood;

  process.forEach((item) => {
    const { translate, scale, rotate } = item as Partial<Transform>;
    if (scale !== undefined) {
      x *= typeof scale === 'number' ? scale : scale.x;
      y *= typeof scale === 'number' ? scale : scale.y;
    }

    if (rotate !== undefined) {
      x = Math.cos((rotate * Math.PI) / 180) * x - Math.sin((rotate * Math.PI) / 180) * y;
      y = Math.sin((rotate * Math.PI) / 180) * x + Math.cos((rotate * Math.PI) / 180) * y;
    }

    if (translate !== undefined) {
      x += translate.x;
      y += translate.y;
    }
  });

  return { x, y };
};

export default transform;
