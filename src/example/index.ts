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
  circle:
    'M91 26.5C91 62.1223 62.1223 91 26.5 91S-38 62.1223 -38 26.5S-9.1223 -38 26.5 -38S91 -9.1223 91 26.5z',
  bubble:
    'M5 -39c-29.8233 0 -54 24.1767 -54 54c0 22.3749 13.6084 41.5716 33 49.7646V93L16.0001 69H50c29.8233 0 54 -24.1767 54 -54S79.8233 -39 50 -39H5z',
  shapes:
    'L-188.7846 -47L-100.923 97H-256.3538 z M91 26.5C91 62.1223 62.1223 91 26.5 91S-38 62.1223 -38 26.5S-9.1223 -38 26.5 -38S91 -9.1223 91 26.5z',
};

(async () => {
  // 取得上传文件输入框
  const uploader = document.getElementById('upload') as HTMLInputElement;

  // 取得容器节点
  const container = document.getElementsByTagName('main')[0];

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

  const path = new fabric.Path(EXAMPLE_PATH_D.bubble, {
    originX: 'center',
    originY: 'center',
    left: 100,
    top: 100,
    objectCaching: false,
    noScaleCache: false,
    fill: '#59d571',
    stroke: '#5c7461',
    strokeWidth: 2,
    // angle: 60,
    // scaleX: 1.5,
    // scaleY: 1.5
  });

  // fabricCanvas.add(path);
  // fabricCanvas.renderAll();

  const vizPath = new VizPath();

  const operator = await vizPath
    .use(new Editor(fabricCanvas))
    // .use(
    //   new EditorUI({
    //     // path: (decorator, originPath) => {
    //     //   return originPath;
    //     // },
    //   })
    // )
    .use(new EditorBackground())
    .use(new EditorPath({
      updateTriggerTime: 'auto'
    }))
    .use(new EditorNode())
    .initialize();

  // ① 通过路径指令直接绘制
  // const pathway1 = VizPath.parsePathFromPathD(EXAMPLE_PATH_D.shapes, {
  //   left: fabricCanvas.getWidth() / 2,
  //   top: fabricCanvas.getHeight() / 2,
  //   originX: 'center',
  //   originY: 'center',
  // });
  // operator.draw(pathway1);

  // ② 通过路径对象绘制
  // const pathway2 = VizPath.parsePathFromObject(path);
  // operator.draw(pathway2);

  // ③ 通过URL绘制
  const svgURL = 'https://sunzi-cool.maiyuan.online/image-template/d306e5f3-2c30-4599-b8a5-5348de226350.svg';
  const pathways = await VizPath.parsePathFromURL(svgURL, {
    left: fabricCanvas.getWidth() / 2,
    top: fabricCanvas.getHeight() / 2,
    originX: 'center',
    originY: 'center',
    scaleX: 2,
    scaleY: 2
  });
  pathways?.forEach((pathway) => {
    operator.draw(pathway);
  })

  // ④ 快速使用
  // const pathway = VizPath.parsePathFromPathD(EXAMPLE_PATH_D.bubble, {
  //   left: fabricCanvas.getWidth() / 2,
  //   top: fabricCanvas.getHeight() / 2,
  //   originX: 'center',
  //   originY: 'center'
  // });
  // operator.draw(pathway);

  // 上传input
  uploader.onchange = async (e: Event) => {
    const file = ((e.target as HTMLInputElement)?.files ?? [])[0];
    if (!file) return;

    operator.clean();

    const url = URL.createObjectURL(file);
    const pathways = await VizPath.parsePathFromURL(url, {
      left: fabricCanvas.getWidth() / 2,
      top: fabricCanvas.getHeight() / 2,
      originX: 'center',
      originY: 'center',
    });
    pathways?.forEach((pathway) => {
      operator.draw(pathway);
    })
  }

  // operator.move(operator.pathway[0][0].node, { x: 200, y: 200 })
})();
