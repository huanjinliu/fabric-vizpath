import { fabric } from 'fabric';
import type { Theme } from 'src/lib/modules/editor-ui/index.class';

const createNode: Theme['node'] = (decorator) => {
  const rect = new fabric.Rect({
    width: 6,
    height: 6,
    fill: '#ffffff',
    stroke: '#1784ec',
    strokeWidth: 1,
  });

  return decorator(rect, (context, object) => {
    object.on('selected', () => {
      rect.set({
        fill: '#1884ec',
      });
      object.canvas?.requestRenderAll();
    });

    object.on('deselected', () => {
      rect.set({
        fill: '#ffffff',
      });
      object.canvas?.requestRenderAll();
    });
  });
};

export default createNode;
