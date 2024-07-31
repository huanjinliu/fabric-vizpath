import { fabric } from 'fabric';
import fireFabricMouseDown from './fire-fabric-mouse-down';
import fireFabricMouseUp from './fire-fabric-mouse-up';

/**
 * 手动模拟触发fabric Canvas的鼠标选择事件，以实现在选中操作对象时更改操作对象
 *
 * @note 请注意这会触发画布mouse:up/mouse:down等画布事件
 */
const fireMouseUpAndSelect = (object: fabric.Object) => {
  const canvas = object.canvas;
  if (!canvas) return;

  const objectBoundRect = object.getBoundingRect();
  fireFabricMouseUp(canvas);
  fireFabricMouseDown(canvas, {
    x: objectBoundRect.left + objectBoundRect.width / 2,
    y: objectBoundRect.top + objectBoundRect.height / 2,
  });
};

export default fireMouseUpAndSelect;
