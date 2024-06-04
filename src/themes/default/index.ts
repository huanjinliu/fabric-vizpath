import { fabric } from 'fabric';
import type { Theme } from 'src/lib/modules/editor-ui/index.class';

export type ThemeShareState = {
  hoverObject?: fabric.Object;
  selectedNodes?: fabric.Object[];
  selectedPoint?: fabric.Object;
};

export default {
  path: (pathObject) => {
    pathObject.set({
      stroke: '#333',
      strokeWidth: 4,
      fill: 'transparent',
      strokeUniform: true,
    });
  },
  node: (decorator, shareState) => {
    const object = new fabric.Circle({
      strokeWidth: 4,
      radius: 6,
      fill: '#ffffff',
      stroke: '#4b4b4b',
    });

    object.on('mouseover', () => {
      shareState.hoverObject = object;
      object.canvas?.requestRenderAll();
    });

    object.on('mouseout', () => {
      shareState.hoverObject = undefined;
      object.canvas?.requestRenderAll();
    });

    return decorator(object, () => {
      object.set({
        fill: shareState.selectedNodes?.includes(object)
          ? '#29ca6e'
          : shareState.hoverObject === object
            ? '#7ef4ad'
            : '#ffffff',
      });
    });
  },
  dot: (decorator, shareState) => {
    const circle = new fabric.Circle({
      radius: 4,
      fill: '#bebebe',
      stroke: '#bebebe',
      strokeWidth: 2,
    });

    circle.on('mouseover', () => {
      shareState.hoverObject = circle;
      circle.canvas?.requestRenderAll();
    });

    circle.on('mouseout', () => {
      shareState.hoverObject = undefined;
      circle.canvas?.requestRenderAll();
    });

    return decorator(circle, () => {
      circle.set({
        stroke: shareState.selectedPoint === circle ? '#333' : '#bebebe',
      });
    });
  },
  line: () => {
    const line = new fabric.Line([0, 0, 0, 0], {
      stroke: '#bebebe',
      strokeWidth: 1,
      strokeDashArray: [4, 3],
    });

    return line;
  },
} as Theme<ThemeShareState>;
