import { fabric } from 'fabric';
import type { Theme } from '..';

const createDefaultNode: Theme['node'] = (decorator) => {
  const rect = new fabric.Rect({
    width: 6,
    height: 6,
    fill: "#ffffff",
    stroke: "#1784ec",
    strokeWidth: 1,
  });

  const object = decorator(rect);
  object.on('selected', () => {
    rect.set({
      fill: '#1884ec',
    });
    object.canvas?.renderAll();
  });

  object.on('deselected', () => {
    rect.set({
      fill: '#ffffff',
    });
    object.canvas?.renderAll();
  });

  return object;
};

export default createDefaultNode;
