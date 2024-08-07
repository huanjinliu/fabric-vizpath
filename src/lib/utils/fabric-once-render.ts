/**
 * 控制fabric画布只渲染一次，在多次添加或删除画布对象时，如果不设置renderOnAddRemove配置，每次添加和移除都会渲染一次画布，设置为false后可以控制为1次渲染
 * @param canvas 画布对象
 * @param callback 执行回调
 */
const fabricOnceRender = <T extends fabric.Canvas | fabric.StaticCanvas, Q>(
  canvas: T,
  callback: (canvas: T) => Q,
) => {
  canvas.renderOnAddRemove = false;
  const result = callback(canvas);
  canvas.renderOnAddRemove = true;
  canvas.requestRenderAll();
  return result;
};

export default fabricOnceRender;
