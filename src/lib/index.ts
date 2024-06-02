import { fabric } from 'fabric';
import cloneDeep from 'lodash-es/cloneDeep';
import defaults from 'lodash-es/defaults';
import VizPath from './vizpath.class';
import {
  clearPathOffset,
  getCubicFromQuadratic,
  loadSVGToPathFromURL,
  parsePathJSON,
  repairPath,
} from '@utils';
import type EditorModule from './modules/base.class';

/** 指令类型 */
export enum InstructionType {
  START = 'M',
  LINE = 'L',
  QUADRATIC_CURCE = 'Q',
  BEZIER_CURVE = 'C',
  CLOSE = 'Z',
}

export type Instruction = [InstructionType, ...number[]];

export type PathwayNode<T extends Crood = Crood> = {
  section: PathwayNode<T>[];
  instruction: Instruction;
  node?: T;
  controllers?: Partial<{
    pre: T;
    next: T;
  }>;
};

export type Pathway = {
  section: PathwayNode[];
  originPath: fabric.Path;
}[];

type VizPathOptions = {
  /**
   * 触发路径更新状态的时机
   * @default 'auto' 自动更新，defer会延迟更新，比自动更新性能好，但是状态不完全同步，manual则完全不更新等待手动更新
   */
  refreshPathTriggerTime?: 'auto' | 'manual' | 'defer';
  /**
   * 延迟更新时的延迟时间/ms，仅当[refreshPathTriggerTime='defer']时生效
   * @default 100
   */
  refreshDeferDuration?: number;
};

/**
 * VizPath
 */
class VizPathContext {
  options: Required<VizPathOptions> = {
    refreshPathTriggerTime: 'auto',
    refreshDeferDuration: 100,
  };

  /**
   * 增强模块列表
   */
  modules: EditorModule[] = [];

  constructor(options: VizPathOptions = {}) {
    this.options = defaults(options, this.options);
  }

  /**
   * 通过fabric.Path对象解析路径信息
   *
   * @param path farbic路径对象
   * @example
   *
   * const pathway = getPathwayFromObject(new fabric.Path());
   */
  static parsePathFromObject(path: fabric.Path) {
    const { layout, styles } = parsePathJSON(path);

    /**
     * 第一步：拆分组合路径， 如 new fabric.Path('M 0 0 L 10 10 z M 20 20 L 40 40 z')
     */
    const instructions = cloneDeep(path.path as unknown as Instruction[]);
    const sections = VizPath.getPathSections(instructions).map((section) => {
      // 为每个子路径分配新建的路径对象
      const originPath = new fabric.Path((fabric.util as any).joinPath(section), styles);

      originPath.path = section as unknown as fabric.Point[];

      return { section, originPath };
    });

    // 建立组并销毁组是为了保持子路径对象的正确尺寸和位置
    new fabric.Group(
      sections.map((i) => i.originPath),
      layout,
    ).destroy();

    /**
     * 第二步：组合pathway
     */
    const pathway: Pathway = sections.map(({ section, originPath }) => {
      // ① 清除组合元素对路径的偏移影响
      clearPathOffset(originPath);
      repairPath(originPath);

      // ② 修正头指令，头指令必须是M开始指令，其他的也没效果
      if (section[0][0] !== InstructionType.START) {
        section[0] = [
          InstructionType.START,
          ...section[0].slice(section[0].length - 2),
        ] as Instruction;
      }

      // ③ 闭合指令的字母全改为大小以保证统一处理
      if (section[section.length - 1][0].toUpperCase() === InstructionType.CLOSE) {
        section[section.length - 1][0] = InstructionType.CLOSE;
      }

      // ④ 小于两个点的闭合路径直接解除闭合
      if (section.length <= 2 && section[section.length - 1][0] === InstructionType.CLOSE) {
        section.pop();
      }

      // ⑤ 闭合的路径如果在闭合指令前没有回到起始点，补充一条回到起始点的指令
      const isAutoClose = section[section.length - 1][0] === InstructionType.CLOSE;
      if (isAutoClose) {
        const startPoint = section[0].slice(section[0].length - 2);
        const endPoint = section[section.length - 2].slice(section[section.length - 2].length - 2);
        if (
          // 如果路径只有一个起始点且闭合[M,Z]
          section[0] === section[section.length - 2] ||
          // 或者路径闭合但是最后一个路径节点不完全等于起始点
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

      // ⑤ 创建pathway
      const _section: PathwayNode[] = [];
      section.forEach((instruction) => {
        _section.push({
          section: _section,
          instruction,
        });
      });

      return {
        section: _section,
        originPath,
      };
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
  static parsePathFromPathD(d: string, options: fabric.IObjectOptions = {}) {
    const path = new fabric.Path(
      d,
      defaults(options, {
        left: 0,
        top: 0,
      }),
    );
    return this.parsePathFromObject(path);
  }

  /**
   * 通过svg文件链接加载并获取Editor路径信息
   *
   * @param d 路径指令信息
   * @example
   *
   * const pathway = getPathwayFromPathD('M 0 0 L 100 100');
   */
  static async parsePathFromURL(url: string, options: fabric.IObjectOptions = {}) {
    const object = await loadSVGToPathFromURL(url);
    if (!object) return;

    const pathGroup = new fabric.Group([object]);

    if (options) pathGroup.set({ ...options });

    const pathways: Pathway[] = [];

    const extract = (group: fabric.Group) => {
      const children = group.getObjects();
      group.destroy();
      children.forEach((child) => {
        if (child.type === 'group') {
          extract(child as fabric.Group);
        } else if (child.type === 'path') {
          pathways.push(VizPathContext.parsePathFromObject(child as fabric.Path));
        }
      });
    };
    extract(pathGroup);

    return pathways;
  }

  /**
   * 添加拓展模块
   */
  use(module: EditorModule) {
    const index = this.modules.findIndex(
      (item) => (item.constructor as any).ID === (module.constructor as any).ID,
    );
    if (index !== -1) {
      this.modules.splice(index, 1);
    }

    this.modules.push(module);

    return this;
  }

  /**
   * 查找模块
   */
  find<Module extends Constructor>(moduleConstructor: Module) {
    return this.modules.find(
      (module) => (module.constructor as any).ID === (moduleConstructor as any).ID,
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
        const module = this.modules[next];
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
