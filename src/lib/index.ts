import { fabric } from 'fabric';
import VizPath from './vizpath.class';
import type EditorModule from './modules/base.class';
import { getCubicFromQuadratic, transform } from './utils';
import cloneDeep from 'lodash-es/cloneDeep';

/** 指令类型 */
export enum InstructionType {
  START = 'M',
  LINE = 'L',
  QUADRATIC_CURCE = 'Q',
  BEZIER_CURVE = 'C',
  CLOSE = 'z',
}

export type Instruction = [InstructionType, ...number[]];

export type PathwayNode<Node extends Crood = Crood> = {
  section: PathwayNode<Node>[];
  instruction: Instruction;
  node?: Node;
  controllers?: Partial<{
    pre: Node;
    next: Node;
  }>;
};

export type Pathway<Node extends Crood = Crood> = PathwayNode<Node>[][];

/**
 * VizPath
 */
class VizPathContext {
  /**
   * 增强模块列表
   */
  private _modules: EditorModule[] = [];

  /**
   * 通过fabric.Path对象获取Editor路径信息
   *
   * @param path farbic路径对象
   * @example
   *
   * const pathway = getPathwayFromObject(new fabric.Path());
   */
  static getPathwayFromObject(path: fabric.Path) {
    // ① 清除路径自带偏移，如果不消除，后续的所有关键点、控制点的编辑都要额外处理路径自身的偏移
    const instructions = cloneDeep(path.path as unknown as Instruction[]);
    instructions.forEach((item, pathIdx) => {
      const [, ...croods] = item as unknown as [
        type: string,
        ...croods: number[]
      ];
      for (let i = 0; i < croods.length; i += 2) {
        const { x, y } = transform(
          {
            x: instructions[pathIdx][i + 1] as number,
            y: instructions[pathIdx][i + 2] as number,
          },
          [{
            translate: {
              x: -path.pathOffset.x,
              y: -path.pathOffset.y,
            },
          }]
        );
        instructions[pathIdx][i + 1] = x;
        instructions[pathIdx][i + 2] = y;
      }
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
      const _section: PathwayNode[] = [];
      section.forEach((instruction, idx) => {
        const node = VizPath.getInstructionNodeCrood(instruction);
        const nextInstruction = section[idx + 1];
        _section.push({
          section: _section,
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
                    ? ({
                        x: nextInstruction[1],
                        y: nextInstruction[2],
                      } as Crood)
                    : undefined,
              }
            : undefined,
        });
      });
      return _section;
    });

    return pathway;
  }

  /**
   * 通过路径指令获取Editor路径信息
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
   * 添加拓展模块
   */
  use(module: EditorModule) {
    const index = this._modules.findIndex(
      (item) => (item.constructor as any).ID === (module.constructor as any).ID
    );
    if (index !== -1) {
      this._modules.splice(index, 1);
    }

    this._modules.push(module);

    return this;
  }

  /**
   * 查找模块
   */
  find<Module extends Constructor>(moduleConstructor: Module) {
    return this._modules.find(
      (module) =>
        (module.constructor as any).ID === (moduleConstructor as any).ID
    ) as InstanceType<Module> | undefined;
  }

  /**
   * 初始可视路径编辑器
   */
  async initialize() {
    const vizPath = new VizPath(this);

    return new Promise<VizPath>((resolve) => {
      let next = 0;

      const loadModule = async () => {
        const module = this._modules[next];
        if (!module) {
          resolve(vizPath);
          return;
        }

        await module.prepare();
        await Promise.resolve(module.load(vizPath));

        next++;
        loadModule();
      };

      loadModule();
    });
  }
}

export default VizPathContext;
