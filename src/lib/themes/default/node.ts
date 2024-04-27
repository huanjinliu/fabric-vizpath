import { fabric } from 'fabric';
import type { Theme } from '..';

const createDefaultNode: Theme['node'] = (decorator) => {
  const object = new fabric.Circle({
    strokeWidth: 4,
    radius: 6,
    fill: "#ffffff",
    stroke: "#4b4b4b"
  });
  
  const group = decorator(object);
  group.on("mouseover", () => {
    object.set({ fill: "#7ef4ad" });
    group.canvas?.renderAll();
  });

  group.on("mouseout", () => {
    object.set({
      fill: group.canvas?.getActiveObject() === group ? "#29ca6e" : "#ffffff"
    });
    group.canvas?.renderAll();
  });

  group.on("selected", () => {
    object.set({ fill: "#29ca6e" });
    group.canvas?.renderAll();
  });

  group.on("deselected", () => {
    object.set({ fill: "#ffffff" });
    group.canvas?.renderAll();
  });

  return group;
};

export default createDefaultNode;
