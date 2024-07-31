import { fabric } from 'fabric';

/**
 * 手动模拟触发fabric Canvas的鼠标mouse:up事件
 *
 * @note 注意: 会触发画布mouse:up相关画布监听事件
 */
const fireFabricMouseUp = (canvas: fabric.Canvas) => {
  const canvasElement = canvas.getSelectionElement();
  if (!canvasElement) return;

  const event = new MouseEvent('mouseup', {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  canvasElement.dispatchEvent(event);
};

export default fireFabricMouseUp;
