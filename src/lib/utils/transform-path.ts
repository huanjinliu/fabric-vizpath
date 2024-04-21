import cloneDeep from 'lodash-es/cloneDeep';
import { Instruction } from '..';

/**
 * 路径变换
 * @param path 路径
 * @param options 变换配置
 */
const transformPath = (
  instructions: Instruction[],
  transform: {
    translate?: { x: number; y: number };
    scale?: { x: number; y: number };
    rotate?: number;
  },
) => {
  const { translate, scale, rotate } = transform;

  const _instructions = cloneDeep(instructions);
  _instructions?.forEach((item, pathIdx) => {
    const [, ...croods] = item as unknown as [
      type: string,
      ...croods: number[]
    ];
    for (let i = 0; i < croods.length; i += 2) {
      let x = _instructions[pathIdx][i + 1] as number;
      let y = _instructions[pathIdx][i + 2] as number;

      if (scale !== undefined) {
        x *= scale.x;
        y *= scale.y;
      }

      if (rotate !== undefined) {
        x =
          Math.cos((rotate * Math.PI) / 180) * x -
          Math.sin((rotate * Math.PI) / 180) * y;
        y =
          Math.sin((rotate * Math.PI) / 180) * x +
          Math.cos((rotate * Math.PI) / 180) * y;
      }

      if (translate !== undefined) {
        x += translate.x;
        y += translate.y;
      }

      _instructions[pathIdx][i + 1] = x;
      _instructions[pathIdx][i + 2] = y;
    }
  });
  return _instructions;
};

export default transformPath;