import { fabric } from 'fabric';
import {
  VizPath,
  Editor,
  EditorBackground,
  EditorPath,
  EditorNode,
  EditorUI,
} from 'fabric-path-editor';

const EXAMPLE_PATH_D = {
  circle: 'M91 26.5C91 62.1223 62.1223 91 26.5 91S-38 62.1223 -38 26.5S-9.1223 -38 26.5 -38S91 -9.1223 91 26.5z',
  bubble: 'M5 -39c-29.8233 0 -54 24.1767 -54 54c0 22.3749 13.6084 41.5716 33 49.7646V93L16.0001 69H50c29.8233 0 54 -24.1767 54 -54S79.8233 -39 50 -39H5z',
  shapes: 'L-188.7846 -47L-100.923 97H-256.3538 z M91 26.5C91 62.1223 62.1223 91 26.5 91S-38 62.1223 -38 26.5S-9.1223 -38 26.5 -38S91 -9.1223 91 26.5z'
};

(async () => {
  // 取得容器节点
  const container = document.getElementById('container');
  if (!container) return;

  // 创建画布节点
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);

  // 添加容器尺寸更改监听
  new ResizeObserver(() => {
    fabricCanvas.setDimensions({
      width: container.clientWidth,
      height: container.clientHeight,
    });
    fabricCanvas.renderAll();
  }).observe(container);

  // 创建fabric画布
  const fabricCanvas = new fabric.Canvas(canvas, {
    width: container.clientWidth,
    height: container.clientHeight,
    selectionBorderColor: '#ccc',
    selectionColor: 'rgba(150, 150, 150, 0.3)',
    // selection: false,
  });

  fabricCanvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

  // const path = new fabric.Path(EXAMPLE_PATH_D.bubble, {
  //   originX: 'center',
  //   originY: 'center',
  //   left: 100,
  //   top: 100,
  //   objectCaching: false,
  //   noScaleCache: false,
  //   fill: 'transparent',
  //   stroke: '#333',
  //   strokeWidth: 2,
  //   // angle: 60,
  //   // scaleX: 1.5,
  //   // scaleY: 1.5
  // });

  // fabricCanvas.add(path);
  // fabricCanvas.renderAll();

  const vizPath = new VizPath();

  const operator = await vizPath
    .use(new Editor(fabricCanvas))
    .use(new EditorUI({
      // path: () => {
      //   const path = new fabric.Path('');

      //   path.set({
      //     fill: 'rgba(50, 50, 50, 0.8)',
      //     stroke: '#333',
      //     strokeWidth: 2,
      //   });

      //   return path;
      // }
    }))
    .use(new EditorBackground())
    .use(new EditorPath())
    .use(new EditorNode())
    .initialize();

  // operator.draw(VizPath.getPathwayFromObject(path));

  operator.draw(VizPath.getPathwayFromPathD(EXAMPLE_PATH_D.bubble), { label: 'bubble' });

  // operator.clean();

  // operator.move(operator.pathway[0][0].node, { x: 200, y: 200 })
  // editor.draw(VizPath.getPathwayFromObject(path));

  // vizPath.

  // path.path = vizPath.toPath() as unknown as fabric.Point[];
  // fabricCanvas.renderAll();

  // console.log(vizPath.toPathD())
})();
