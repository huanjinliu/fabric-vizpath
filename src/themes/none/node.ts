import { fabric } from 'fabric';
import type { Theme } from 'src/lib/modules/editor-ui/index.class';

const createNode: Theme['node'] = (decorator) => {
  const circle = new fabric.Circle({
    radius: 3,
    fill: '#ffffff',
    stroke: '#4b4b4b',
    strokeWidth: 1,
  });

  return decorator(circle, (context, object) => {
    object.on("selected", () => {
      object.set({ fill: "#4b4b4b", stroke: '#ffffff' });
      object.canvas?.requestRenderAll();
    });
  
    object.on("deselected", () => {
      object.set({ fill: "#ffffff", stroke: '#4b4b4b' });
      object.canvas?.requestRenderAll();
    });
  });
};

export default createNode;
