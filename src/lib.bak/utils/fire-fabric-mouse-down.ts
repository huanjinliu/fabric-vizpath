import { fabric } from 'fabric';

/**
 * 手动模拟触发fabric Canvas的鼠标mouse:down
 *
 * @note 注意: 会触发画布mouse:down相关画布监听事件
 */
const fireFabricMouseDown = (canvas: fabric.Canvas, offset: { x: number; y: number }) => {
  const canvasElement = canvas.getSelectionElement();
  if (!canvasElement) return;

  const canvasElementBoundRect = canvasElement.getBoundingClientRect();
  const event = new MouseEvent('mousedown', {
    clientX: canvasElementBoundRect.left + offset.x,
    clientY: canvasElementBoundRect.top + offset.y,
  });

  canvasElement.dispatchEvent(event);
};

export default fireFabricMouseDown;
