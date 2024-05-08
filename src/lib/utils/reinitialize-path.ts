import { fabric } from "fabric";
import type { Instruction } from "..";


/**
 * 重新修正路径的尺寸和位置
 *
 * @param path 路径对象
 *
 * @note
 *
 * fabric.Path对象直接改内部路径指令，只能更新其路径渲染师正确的，但对象本身的尺寸和偏移信息都是错误的，
 * 需要使用initialize重新初始化路径，获取正确的尺寸，但是偏移是错的，该方法同时修正偏移。
 */
const reinitializePath = (path: fabric.Path) => {
  // 记录旧的路径信息
  const oldInfo = {
    left: path.left!,
    top: path.top!,
    width: path.width!,
    height: path.height!,
    pathOffset: { ...path.pathOffset },
  };

  // 持有旧的指令后恢复避免丢失引用
  const instructions = path.path;
  const d = (fabric.util as any).joinPath(
    instructions as unknown as Instruction[]
  );

  // 更新路径尺寸
  path.initialize(d);
  path.path = instructions;

  // 计算路径偏移差值
  const distance = fabric.util.transformPoint(
    new fabric.Point(
      path.pathOffset.x -
      (path.width! - oldInfo.width) / 2 -
      oldInfo.pathOffset.x,
      path.pathOffset.y -
      (path.height! - oldInfo.height) / 2 -
      oldInfo.pathOffset.y
    ),
    [...path.calcOwnMatrix().slice(0, 4), 0, 0]
  );

  // 设置回正确的偏移位置
  path.set({
    left: oldInfo.left + distance.x,
    top: oldInfo.top + distance.y,
  });

  path.setCoords();
}

export default reinitializePath;