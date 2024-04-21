import { fabric } from 'fabric';
import VizPath from 'fabric-path-editor';

// 单路径
// const d = 'M 50 50z';
// const d = 'M26.7846 -47 L109.923 97';
// const d = 'M26.7846 -47L109.923 97H-56.3538z';
// const d = 'M 26.7846 -47 Q 88.3538 5 109.923 97';
// const d = 'M91 26.5C91 62.1223 62.1223 91 26.5 91S-38 62.1223 -38 26.5S-9.1223 -38 26.5 -38S91 -9.1223 91 26.5z';
// const d = 'M 91 26.5 C 91 62.1223 62.1223 91 26.5 91 C -9.122300000000003 91 -38 62.1223 -38 26.5 C -38 -9.122300000000003 -9.1223 -38 26.5 -38 C 62.122299999999996 -38 91 -9.1223 91 26.5 z';
const d =
  'M5 -39c-29.8233 0 -54 24.1767 -54 54c0 22.3749 13.6084 41.5716 33 49.7646V93L16.0001 69H50c29.8233 0 54 -24.1767 54 -54S79.8233 -39 50 -39H5z';

// 复合路径
// const d = 'L-188.7846 -47L-100.923 97H-256.3538 z M91 26.5C91 62.1223 62.1223 91 26.5 91S-38 62.1223 -38 26.5S-9.1223 -38 26.5 -38S91 -9.1223 91 26.5z';
// const d = 'L-188.7846 -47L-100.923 97H-256.3538 M91 26.5C91 62.1223 62.1223 91 26.5 91S-38 62.1223 -38 26.5S-9.1223 -38 26.5 -38S91 -9.1223 91 26.5';
// const d = 'M 50 50 L 100 100 Q 150 50 100 0 Q 0 0 50 50'
// const d = 'M 50 50 L 100 100 Q 150 50 100 0 C 80 -50 0 0 50 50z'
// const d = 'M 50 50 L 100 100 L 100 0 C 80 -50 0 0 50 50z'

(() => {
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
  const fabricCanvas = new fabric.StaticCanvas(canvas, {
    width: container.clientWidth,
    height: container.clientHeight,
    // selection: false,
  });

  const path = new fabric.Path(d, {
    originX: 'center',
    originY: 'center',
    left: fabricCanvas.getWidth() / 2,
    top: fabricCanvas.getHeight() / 2,
    objectCaching: false,
    noScaleCache: false,
    fill: 'transparent',
    stroke: '#333',
    strokeWidth: 2,
  });

  fabricCanvas.add(path);
  fabricCanvas.renderAll();

  // 添加可视化路径
  const vizPath = new VizPath();

  vizPath.write(VizPath.getPathwayFromObject(path));

  // path.path = vizPath.toPath() as unknown as fabric.Point[];
  // fabricCanvas.renderAll();

  // console.log(vizPath.toPathD())
})();
