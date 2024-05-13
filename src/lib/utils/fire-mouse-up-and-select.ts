import { fabric } from "fabric";

/**
 * 手动模拟触发fabric Canvas的鼠标选择事件，以实现在选中操作对象时更改操作对象
 * 
 * @note 请注意这会触发画布mouse:down/mouse:down等画布事件
 */
const fireMouseUpAndSelect = (object: fabric.Object) => {
  const canvas = object.canvas;
  if (!canvas) return;

  const canvasElement = canvas.getSelectionElement();
  if (!canvasElement) return;

  const manualMouseUp = () => {
    const event = new MouseEvent("mouseup");
    // TODO：浏览器触发不生效，调用fabric的私有方法替代，暂时没发现副作用
    // canvasElement.dispatchEvent(event);
    (canvas as any)._onMouseUp(event);
  };

  const manualMouseDown = () => {
    // 计算对象正确的鼠标位置
    const objectBoundRect = object.getBoundingRect();
    const canvasElementBoundRect = canvasElement.getBoundingClientRect();
    const event = new MouseEvent("mousedown", {
      clientX: canvasElementBoundRect.left + objectBoundRect.left + objectBoundRect.width / 2,
      clientY: canvasElementBoundRect.top + objectBoundRect.top + objectBoundRect.height / 2,
    });
    (canvas as any)._onMouseDown(event);
  };

  if (canvas.getActiveObject() !== object) {
    canvas.setActiveObject(object);
  }

  manualMouseUp();
  manualMouseDown();
};

export default fireMouseUpAndSelect;
