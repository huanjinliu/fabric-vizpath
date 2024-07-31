import { fabric } from 'fabric';

/**
 * 画布真实坐标转变换后坐标
 */
const calcCanvasCoord = (canvas: fabric.Canvas, point: fabric.Point) => {
  const matrix = canvas.viewportTransform ?? [1, 0, 0, 1, 0, 0];
  return fabric.util.transformPoint(point, fabric.util.invertTransform(matrix));
};

export default calcCanvasCoord;
