import { fabric } from 'fabric';
import EditorNode from 'src/lib/modules/editor-node/index.class';
import type { Theme } from 'src/lib/modules/editor-ui/index.class';

const createPoint: Theme['controllerPoint'] = (decorator) => {
  const circle = new fabric.Circle({
    radius: 3,
    fill: '#ffffff',
    stroke: '#1884ec',
    strokeWidth: 1,
  });

  return decorator(circle, (context, object) => {
    const getBelongNode = () => {
      const editorNode = context.find(EditorNode);
      if (!editorNode) return;

      const controller = editorNode.controllers.find((i) => i.point === object)!;
      return controller?.node;
    };

    object.on('selected', () => {
      circle.set({
        fill: '#1884ec',
      });

      const node = getBelongNode();
      if (node) node.set({ fill: '#1884ec' });

      object.canvas?.requestRenderAll();
    });

    object.on('deselected', () => {
      circle.set({
        fill: '#ffffff',
      });

      const node = getBelongNode();
      if (node) {
        node.set({
          fill: node.canvas?.getActiveObject() === node ? '#1884ec' : '#ffffff',
        });
      }

      object.canvas?.requestRenderAll();
    });
  });
};

export default createPoint;
