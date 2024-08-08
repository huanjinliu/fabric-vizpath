import { fabric } from 'fabric';
import VizPathModule from '../../vizpath-module.class';
import {
  calcCoordsAngle,
  calcCoordsDistance,
  calcPerpendicularIntersection,
  calcPerpendicularSymmetricalCoord,
  calcRelativeCoord,
  calcRotateCoord,
  calcSymmetricalCoord,
} from '@utils';
import VizPathEditor from '../../vizpath-editor.class';

export interface EditorQuickCurveOptions {
  /**
   * 曲线的程度，越大弯曲程度越大，最小为0则不弯曲
   * @default 0.5522
   */
  curveDegree?: number;
}

/** 默认内容区配置 */
const DEFAUlT_OPTIONS: Required<EditorQuickCurveOptions> = {
  curveDegree: 0.5522,
};

/**
 * 编辑器快速曲线模块，实现双击节点可切换所在指令的形状（直线与曲线）
 */
class EditorQuickCurve extends VizPathModule {
  static ID = 'editor-quick-curve';

  private _options: Required<EditorQuickCurveOptions>;

  constructor(options: EditorQuickCurveOptions = {}) {
    super();
    this._options = {
      ...DEFAUlT_OPTIONS,
      ...options,
    };
  }

  /**
   * 直线化
   */
  straighten(...objects: fabric.Object[]) {
    const editor = this.editor;
    if (!editor) return;

    const vizpath = editor.vizpath;
    if (!vizpath) return;

    editor.rerender(() => {
      objects.forEach((object) => {
        const node = editor.objectNodeMap.get(object);
        if (!node) return;

        vizpath.degrade(node, 'both', true);
      });
    });
  }

  /**
   * 曲线化
   */
  curve(...objects: fabric.Object[]) {
    const editor = this.editor;
    if (!editor) return;

    const vizpath = editor.vizpath;
    if (!vizpath) return;

    const curveDegree = Math.max(0, this._options.curveDegree);

    editor.rerender(() => {
      objects.forEach((object) => {
        const node = editor.objectNodeMap.get(object);
        if (!node) return;

        const neighboringNodes = vizpath.getNeighboringNodes(node);
        const p0 = node.node!;
        const p1 = neighboringNodes.pre?.node;
        const p2 = neighboringNodes.next?.node;

        // 两边没有节点，意味当前就只有一个路径点，无需生成变换器
        if (!p1 && !p2) return;

        // 两边都有节点，生成对称的平行变换器
        if (p1 && p2) {
          const center = {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2,
          };
          const curveP1 = {
            x: p0.x - center.x + (p1.x + center.x) * curveDegree,
            y: p0.y - center.y + (p1.y + center.y) * curveDegree,
          };
          const curveP2 = {
            x: p0.x - center.x + (p2.x + center.x) * curveDegree,
            y: p0.y - center.y + (p2.y + center.y) * curveDegree,
          };
          vizpath.upgrade(node, 'pre', false, [curveP1]);
          vizpath.upgrade(node, 'next', false, [curveP2]);
          return;
        }

        // 没有变换器
        if (!node.deformers) {
          // 单边节点
          const p = (p1 ?? p2)!;
          const center = {
            x: (p.x + p0.x) / 2,
            y: (p.y + p0.y) / 2,
          };
          const distance = calcCoordsDistance(p, p0);

          const direction = p1 ? 'pre' : 'next';
          const oppositeDirection = {
            next: 'pre',
            pre: 'next',
          }[direction] as 'next' | 'pre';
          const neighboringNode = neighboringNodes[direction]!;
          const preNeighboringNode = vizpath.getNeighboringNodes(neighboringNode)[direction];
          const rCoord =
            neighboringNode.deformers?.[direction] ??
            preNeighboringNode?.deformers?.[oppositeDirection] ??
            preNeighboringNode?.node ??
            calcRotateCoord(center, p, -90);
          const angle = (360 - calcCoordsAngle(rCoord, p, p0) - 180) % 360;

          const curveP1 = calcRelativeCoord(
            p,
            rCoord,
            (-distance / (2 / curveDegree)) * (1 + angle / 90),
          );
          const curveP2 = calcPerpendicularSymmetricalCoord(p0, p, curveP1);

          vizpath.upgrade(node, direction, true, [curveP1, curveP2]);
          vizpath.addNodeDeformer(node, oppositeDirection, calcSymmetricalCoord(curveP2, p0));
          return;
        }

        // 两边都有变换器无法再升级
        if (node.deformers.pre && node.deformers.next) return;

        // 只有单边有变换器升级对边变换器
        const direction = Object.keys(node.deformers)[0];
        const oppositeDirection = {
          next: 'pre',
          pre: 'next',
        }[direction] as 'next' | 'pre';
        const curveP2 = calcSymmetricalCoord(node.deformers[direction], p0);
        if (neighboringNodes[oppositeDirection]) {
          vizpath.upgrade(node, oppositeDirection, false, [curveP2]);
        } else {
          vizpath.addNodeDeformer(node, oppositeDirection, curveP2);
        }
      });
    });
  }

  /**
   * 切换所在指令的形状（直线与曲线）
   * @param object 路径节点画布对象
   *
   * @note
   * 临近边只要存在曲线时则临近边都变为直线；临近边都为直线时则同时变为曲线边。
   */
  trigger(object: fabric.Object) {
    if (!this.editor) return;

    const vizpath = this.editor.vizpath;
    if (!vizpath) return;

    const node = this.editor.objectNodeMap.get(object);
    if (!node) return;

    const { pre, next } = vizpath.getNeighboringNodes(node);
    if (node.deformers || pre?.deformers?.next || next?.deformers?.pre) {
      this.straighten(object);
    } else {
      this.curve(object);
    }
  }

  unload(editor: VizPathEditor) {}

  load(editor: VizPathEditor) {
    editor.canvas?.on('mouse:dblclick', (event) => {
      const { target } = event;

      if (!target || !editor.nodes.includes(target)) return;

      this.trigger(target);
    });
  }
}

export default EditorQuickCurve;
