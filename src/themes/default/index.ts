import { fabric } from 'fabric';
import type { ThemeConfigurator } from '../../lib/modules/editor-ui/index.class';

export type ThemeShareState = {
  hoverNode: fabric.Object | null;
  hoverPoint: fabric.Object | null;
  hoverLine: fabric.Line | null;
  selectedNodes: fabric.Object[];
  selectedPoint: fabric.Object | null;
  selectedLine: fabric.Line | null;
};

export default ((editor, shareState) => {
  editor.on('selected', (nodes: fabric.Object[], point: fabric.Object | null) => {
    shareState.selectedNodes = nodes;
    shareState.selectedPoint = point;
    if (point) {
      shareState.selectedLine = editor.curveDots.find((i) => i.point === point)?.line ?? null;
    }
  });

  editor.on('deselected', () => {
    shareState.selectedNodes = [];
    shareState.selectedPoint = null;
    shareState.selectedLine = null;
  });

  return {
    path: (decorator, pathObject) => {
      pathObject.set({
        stroke: '#333',
        strokeWidth: 4,
        fill: 'transparent',
        strokeUniform: true,
      });
    },
    node: (decorator) => {
      const object = new fabric.Circle({
        strokeWidth: 4,
        radius: 6,
        fill: '#ffffff',
        stroke: '#4b4b4b',
      });

      object.on('mouseover', () => {
        shareState.hoverNode = object;
        object.canvas?.requestRenderAll();
      });

      object.on('mouseout', () => {
        shareState.hoverNode = null;
        object.canvas?.requestRenderAll();
      });

      return decorator(object, () => {
        object.set({
          fill: shareState.selectedNodes.includes(object)
            ? '#29ca6e'
            : shareState.hoverNode === object
              ? '#7ef4ad'
              : '#ffffff',
        });
      });
    },
    dot: (decorator) => {
      const circle = new fabric.Circle({
        radius: 4,
        fill: '#bebebe',
        stroke: '#bebebe',
        strokeWidth: 2,
      });

      circle.on('mouseover', () => {
        shareState.hoverPoint = circle;
        shareState.hoverLine = editor.curveDots.find((i) => i.point === circle)?.line ?? null;
        circle.canvas?.requestRenderAll();
      });

      circle.on('mouseout', () => {
        shareState.hoverPoint = null;
        shareState.hoverLine = null;
        circle.canvas?.requestRenderAll();
      });

      return decorator(circle, () => {
        circle.set({
          stroke: shareState.selectedPoint === circle ? '#333' : '#bebebe',
        });
      });
    },
    line: (decorator) => {
      const line = new fabric.Line([0, 0, 0, 0], {
        stroke: '#bebebe',
        strokeWidth: 1,
        strokeDashArray: [4, 3],
      });

      return decorator(line, () => {
        line.set({
          stroke: shareState.selectedLine === line ? '#333' : '#bebebe',
        });
      });
    },
  };
}) as ThemeConfigurator<ThemeShareState>;
