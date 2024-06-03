import { fabric } from 'fabric';
import calcCanvasCrood from './calc-canvas-crood';

/**
 * 手动模拟触发fabric Canvas的鼠标选择事件，以实现在选中操作对象时更改操作对象
 *
 * @note 请注意这会触发画布mouse:up/mouse:down等画布事件
 */
const fireMouseUpAndSelect = (object: fabric.Object) => {
  const canvas = object.canvas;
  if (!canvas) return;

  const canvasElement = canvas.getSelectionElement();
  if (!canvasElement) return;

  const dispatchMouseUpEvent = () => {
    const event = new MouseEvent('mouseup', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    canvasElement.dispatchEvent(event);
  };

  const dispatchMouseDownEvent = () => {
    const objectBoundRect = object.getBoundingRect();
    const canvasElementBoundRect = canvasElement.getBoundingClientRect();
    const event = new MouseEvent('mousedown', {
      clientX: canvasElementBoundRect.left + objectBoundRect.left + objectBoundRect.width / 2,
      clientY: canvasElementBoundRect.top + objectBoundRect.top + objectBoundRect.height / 2,
    });
    canvasElement.dispatchEvent(event);
  };

  if (canvas.getActiveObject() !== object) {
    canvas.setActiveObject(object);
  }

  dispatchMouseUpEvent();
  dispatchMouseDownEvent();
};

export default fireMouseUpAndSelect;
