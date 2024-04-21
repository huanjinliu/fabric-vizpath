import { fabric } from 'fabric';
import defaults from 'lodash-es/defaults';
import transformPath from './utils/transform-path';
import { getCubicFromQuadratic } from './utils';

/** 指令类型 */
export enum InstructionType {
  START = 'M',
  LINE = 'L',
  QUADRATIC_CURCE = 'Q',
  BEZIER_CURVE = 'C',
  CLOSE = 'z',
}

export type Instruction = [InstructionType, ...number[]];

export type Pathway = {
  instruction: Instruction;
  node?: Crood;
  controllers?: Partial<{
    pre: Crood;
    next: Crood;
  }>
}[][];

interface VizPathOptions {}

/**
 * VizPath (Visualization Path，可视化路径)
 */
class VizPath {
  /**
   * 交互所在fabric画布
   */
  private _canvas: fabric.Canvas | fabric.StaticCanvas | null = null;

  /**
   * 编辑器配置
   */
  private _options = {};

  /**
   * 可视化路径
   */
  path: fabric.Path | null = null;

  /**
   * 路径信息（包含路径分段、路径指令、关键点及控制点信息）
   */
  pathway: Pathway = [];

  /**
   * 构造函数
   * @param options 更多配置
   */
  constructor(options: VizPathOptions = {}) {
    this._options = defaults(options, this._options);
  }

  /**
   * 获取指令中的关键节点
   *
   * @note 闭合指令无关键节点
   */
  static getInstructionNodeCrood(instruction: Instruction) {
    if (instruction[0] === InstructionType.CLOSE) return;
    return {
      x: instruction[instruction.length - 2],
      y: instruction[instruction.length - 1],
    } as Crood;
  }

  /**
   * 获取路径中的路径分段
   * @param instructions 路径指令列表
   * @returns 路径分段
   */
  static getPathSections(instructions: Instruction[]) {
    const sections = instructions.reduce(
      (paths, instruction, idx, arr) => {
        if (!instruction) return paths;
        if (
          instruction[0] === InstructionType.START &&
          paths[paths.length - 1].length
        )
          paths.push([]);
        paths[paths.length - 1].push(instruction);
        if (instruction[0] === InstructionType.CLOSE && idx !== arr.length - 1)
          paths.push([]);
        return paths;
      },
      [[]] as Instruction[][]
    );
    return sections;
  }

  /**
   * 通过fabric.Path对象获取VizPath路径信息
   *
   * @param path farbic路径对象
   * @example
   *
   * const pathway = getPathwayFromObject(new fabric.Path());
   */
  static getPathwayFromObject(path: fabric.Path) {
    // ① 清除路径自带偏移，如果不消除，后续的所有关键点、控制点的编辑都要额外处理路径自身的偏移
    const instructions = transformPath(path.path as unknown as Instruction[], {
      translate: {
        x: -path.pathOffset.x,
        y: -path.pathOffset.y,
      },
    });

    // ② 闭合的路径如果在闭合指令前没有回到起始点，补充一条回到起始点的指令
    const sections = VizPath.getPathSections(instructions);
    for (const section of sections) {
      // 修正头指令，头指令必须是M开始指令，其他的也没效果
      if (section[0][0] !== InstructionType.START) {
        section[0] = [
          InstructionType.START,
          ...section[0].slice(section[0].length - 2),
        ] as Instruction;
      }

      // 如果是二阶曲线全部升级为三阶曲线便于处理
      for (let i = 1; i < section.length; i++) {
        const instruction = section[i];
        const preInstruction = section[i - 1];
        if (instruction[0] === InstructionType.QUADRATIC_CURCE) {
          instruction.splice(
            0,
            instruction.length,
            ...getCubicFromQuadratic(
              VizPath.getInstructionNodeCrood(preInstruction)!,
              instruction
            )
          );
        }
      }

      const isAutoClose =
        section[section.length - 1][0] === InstructionType.CLOSE;
      if (isAutoClose) {
        const startPoint = section[0].slice(section[0].length - 2);
        const endPoint = section[section.length - 2].slice(
          section[section.length - 2].length - 2
        );
        if (
          // 如果路径只有一个起始点且闭合[M,Z]
          section[0] === section[section.length - 2] ||
          // 或者路径闭合但是最后一个关键点不完全等于起始点
          endPoint[0] !== startPoint[0] ||
          endPoint[1] !== startPoint[1]
        ) {
          section.splice(section.length - 1, 0, [
            InstructionType.LINE,
            startPoint[0],
            startPoint[1],
          ] as Instruction);
        }
      }
    }

    // ③ 创建pathway（包含路径分段、关键点、控制点信息的对象）
    const pathway: Pathway = sections.map((section) => {
      return section.map((instruction, idx) => {
        const node = VizPath.getInstructionNodeCrood(instruction);
        const nextInstruction = section[idx + 1];
        return {
          instruction,
          node,
          controllers: node
            ? {
                pre:
                  instruction[0] === InstructionType.BEZIER_CURVE
                    ? ({ x: instruction[3], y: instruction[4] } as Crood)
                    : undefined,
                next:
                  nextInstruction?.[0] === InstructionType.BEZIER_CURVE
                    ? ({ x: instruction[1], y: instruction[2] } as Crood)
                    : undefined,
              }
            : undefined,
        };
      });
    });

    return pathway;
  }

  /**
   * 通过路径指令获取VizPath路径信息
   *
   * @param d 路径指令信息
   * @example
   *
   * const pathway = getPathwayFromPathD('M 0 0 L 100 100');
   */
  static getPathwayFromPathD(d: string) {
    const path = new fabric.Path(d);
    return this.getPathwayFromObject(path);
  }

  /**
   * 转化为响应式更改的点对象
   * @param crood 点
   * @param callback 响应式更改回调
   * @returns 
   */
  private _toBindCrood(
    crood: Crood,
    callback: Record<keyof Crood, (val: number) => void>
  ) {
    const proxy = new Proxy(crood, {
      set: (target: Crood, p: string, newValue: any, receiver: any) => {
        callback[p](newValue);
        return Reflect.set(target, p, newValue, receiver);
      },
    });
    return proxy;
  }

  /**
   * 写入路径，建立节点与指令的关联关系，使之可以通过直接控制控制路径及点位信息来控制指令变化
   * @param pathway 路径信息
   */
  write(pathway: Pathway) {
    const _pathway = pathway.map((section) => {
      return section.map((item, idx) => {
        const proxyItem: typeof item = {
          instruction: item.instruction,
        };
        if (item.node) {
          const node = this._toBindCrood(item.node, {
            x: (val: number) =>
              (item.instruction[item.instruction.length - 2] = val),
            y: (val: number) =>
              (item.instruction[item.instruction.length - 1] = val),
          });
          proxyItem.node = node;
        }
        if (item.controllers) {
          const controllers = { ...item.controllers };
          const nextInstruction = section[idx + 1];
          const { pre, next } = controllers;
          if (pre) {
            controllers.pre = this._toBindCrood(pre, {
              x: (val: number) => (item.instruction[3] = val),
              y: (val: number) => (item.instruction[4] = val),
            });
          }
          if (next && nextInstruction) {
            controllers.next = this._toBindCrood(next, {
              x: (val: number) => (nextInstruction.instruction[1] = val),
              y: (val: number) => (nextInstruction.instruction[2] = val),
            });
          }
          proxyItem.controllers = controllers;
        }
        return proxyItem;
      });
    });

    this.pathway = _pathway;
  }

  /**
   * 移动控制点
   */
  move(target: Crood, crood: Crood) {
    target.x = crood.x;
    target.y = crood.y;
  }

  /**
   * 输出路径
   */
  toPath() {
    return this.pathway.map(section => section.map(i => i.instruction)).flat(1);
  }

  /**
   * 输出路径指令
   */
  toPathD() {
    return (fabric.util as any).joinPath(this.toPath());
  }
}

export default VizPath;
