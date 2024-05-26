import { fabric } from 'fabric';

/**
 * 使用新的路径信息并初始化路径对象
 */
export const reinitializePath = (path: fabric.Path, d: string) => {
  const { left, top } = path;

  // 更新路径尺寸
  path.initialize(d as any);

  // 设置回正确的偏移位置
  path.set({ left, top });

  path.setCoords();
};


export default reinitializePath;
