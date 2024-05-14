import { fabric } from "fabric";
import EditorNode from "src/lib/modules/editor-node/index.class";
import type { Theme } from "src/lib/modules/editor-ui/index.class";

const createPoint: Theme["controllerPoint"] = (decorator) => {
  const circle = new fabric.Circle({
    radius: 4,
    fill: "#bebebe",
    stroke: "#bebebe",
    strokeWidth: 2,
  });

  return decorator(circle, (context, object) => {
    const getBelongNode = () => {
      const editorNode = context.find(EditorNode);
      if (!editorNode) return;

      const controller = editorNode.controllers.find(
        (i) => i.point === object
      )!;
      return controller.node;
    };

    object.on("selected", () => {
      circle.set({ stroke: "#333" });

      const node = getBelongNode();
      if (node) node.set({ fill: "#29ca6e" });

      object.canvas?.requestRenderAll();
    });

    object.on("deselected", () => {
      circle.set({ stroke: "#bebebe" });

      const node = getBelongNode();
      if (node) {
        node.set({
          fill: node.canvas?.getActiveObject() === node ? "#29ca6e" : "#ffffff"
        });
      }

      object.canvas?.requestRenderAll();
    });
  });
};

export default createPoint;
