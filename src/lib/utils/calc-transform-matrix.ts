import calcMultiplyMatrix from './calc-multiply-matrix';

/**
 * 变换
 * @param coord 路径
 * @param transformQueue 变换流程
 */
const calcTransformMatrix = (transformQueue: Split<Transform>[]) => {
  return transformQueue.reduce(
    (matrix, transfrom) => {
      const { translate, scale, rotate, flip, skew } = transfrom as Partial<Transform>;
      if (scale !== undefined) {
        return calcMultiplyMatrix(matrix, [
          typeof scale === 'number' ? scale : scale.x,
          0,
          0,
          typeof scale === 'number' ? scale : scale.y,
          0,
          0,
        ]);
      }

      if (rotate !== undefined) {
        const radians = (rotate * Math.PI) / 180;
        const cosAngle = Math.cos(radians);
        const sinAngle = Math.sin(radians);
        return calcMultiplyMatrix(matrix, [cosAngle, sinAngle, -sinAngle, cosAngle, 0, 0]);
      }

      if (skew !== undefined) {
        const skewX = Math.tan(skew.x * (Math.PI / 180));
        const skewY = Math.tan(skew.y * (Math.PI / 180));
        return calcMultiplyMatrix(matrix, [1, skewX, skewY, 1, 0, 0]);
      }

      if (translate !== undefined) {
        return calcMultiplyMatrix(matrix, [1, 0, 0, 1, translate.x, translate.y]);
      }

      if (flip !== undefined) {
        return calcMultiplyMatrix(matrix, [flip?.x ? -1 : 1, 0, 0, flip?.y ? -1 : 1, 0, 0]);
      }

      return matrix;
    },
    [1, 0, 0, 1, 0, 0] as Matrix,
  );
};

export default calcTransformMatrix;
