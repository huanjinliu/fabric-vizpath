import { fabric } from 'fabric';
import type { Instruction } from '..';

/**
 * 重新修正路径的尺寸和位置
 *
 * @param path 路径对象
 *
 * @note
 *
 * fabric.Path对象直接改内部路径指令，其路径会渲染正确的，但却保持其原尺寸和偏移信息，导致对象信息错误，
 * 该方法使用initialize重新初始化路径，使其获取正确的尺寸，但偏移是错的，该方法同时修正偏移。
 */
const repairPath = (path: fabric.Path) => {
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
  const _d = (fabric.util as any).joinPath(instructions as unknown as Instruction[]);

  // 更新路径尺寸
  path.initialize(_d);
  path.path = instructions;

  // 计算路径偏移差值
  const inverse = (value: number, inverse = false) => value * (-1) ** Number(inverse);
  const repairOffset = fabric.util.transformPoint(
    new fabric.Point(
      path.pathOffset.x -
        inverse(path.width! - oldInfo.width, path.flipX) / 2 -
        oldInfo.pathOffset.x,
      path.pathOffset.y -
        inverse(path.height! - oldInfo.height, path.flipY) / 2 -
        oldInfo.pathOffset.y,
    ),
    [...path.calcOwnMatrix().slice(0, 4), 0, 0],
  );

  // 设置回正确的偏移位置
  path.set({
    left: oldInfo.left + repairOffset.x,
    top: oldInfo.top + repairOffset.y,
  });

  path.setCoords();

  return repairOffset;
};

export default repairPath;
