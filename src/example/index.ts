import { fabric } from 'fabric';
import {
  VizPathCreator,
  Editor,
  EditorBackground,
  EditorUI,
  EditorShortcut,
  EditorBezier,
} from 'fabric-path-editor';
import defaultTheme from 'fabric-path-editor/dist/themes/default';

const EXAMPLE_PATH_D = {
  arc: 'M 88.827 199.088 Q 258.533 199.088 258.533 368.794',
  point: 'M 100 100 z',
  polyline: 'M 40 40 L 160 40 L 40 100 L 160 100 L 40 160 L 160 160',
  circle:
    'M91 26.5C91 62.1223 62.1223 91 26.5 91S-38 62.1223 -38 26.5S-9.1223 -38 26.5 -38S91 -9.1223 91 26.5z',
  bubble:
    'M5 -39c-29.8233 0 -54 24.1767 -54 54c0 22.3749 13.6084 41.5716 33 49.7646V93L16.0001 69H50c29.8233 0 54 -24.1767 54 -54S79.8233 -39 50 -39H5z',
  shapes:
    'L-188.7846 -47L-100.923 97H-256.3538 z M91 26.5C91 62.1223 62.1223 91 26.5 91S-38 62.1223 -38 26.5S-9.1223 -38 26.5 -38S91 -9.1223 91 26.5z',
  heart:
    'M,-108.5,-211.5 C,-175.5,-211.5,-228.5,-157.5,-228.5,-91.5 C,-228.5,43.5,-92.5,78.5,-0.5,211.5 C,87.5,79.5,228.5,38.5,228.5,-91.5 C,228.5,-157.5,174.5,-211.5,108.5,-211.5 C,60.5,-211.5,18.5,-183.5,-0.5,-142.5 C,-19.5,-183.5,-60.5,-211.5,-108.5,-211.5 z',
  banana:
    'M 8,223 c 0,0 143,3 185,-181 c 2,-11 -1,-20 1,-33 h 16 c 0,0 -3,17 1,30 c 21,68 -4,242 -204,196 L 8,223 z M 8,230 c 0,0 188,40 196,-160',
  test: 'M -150 50 z M 0 0 Q 50 0 50 50 Q 50 100 0 100 Q -50 100 -50 50 Q -50 0 0 0 z M 80 0 L 180 0 L 80 50 L 180 50 L 80 100 L 180 100',
  favicon:
    'M 295.233 250.642 L 390.393 281.854 C 391.402 282.189 392.1 283.112 392.145 284.174 C 392.191 285.236 391.575 286.216 390.598 286.636 L 346.157 305.682 L 326.998 350.39 C 326.586 351.364 325.619 351.985 324.562 351.953 C 323.506 351.921 322.578 351.243 322.226 350.247 L 288.823 257.237 C 288.163 255.397 288.609 253.342 289.971 251.94 C 291.334 250.539 293.375 250.035 295.233 250.642 L 295.233 250.642 Z M 346.72 156.24 C 362.4 156.244 375.375 168.438 376.351 184.088 C 377.327 199.738 365.967 213.449 350.408 215.401 C 334.85 217.353 320.456 206.872 317.536 191.465 C 278.386 195.181 245.902 223.319 236.64 261.538 C 249.18 267.502 255.91 281.363 252.842 294.906 C 249.773 308.449 237.726 318.055 223.84 318.032 C 208.938 318.053 196.329 307.026 194.362 292.256 C 192.396 277.485 201.68 263.543 216.068 259.664 C 226.553 210.348 269.336 172.951 321.232 170.678 C 326.595 161.716 336.275 156.232 346.72 156.24 Z M 223.84 277.072 C 219.816 277.072 216.097 279.219 214.085 282.704 C 212.073 286.189 212.073 290.483 214.085 293.968 C 216.097 297.453 219.816 299.6 223.84 299.6 C 230.061 299.6 235.104 294.557 235.104 288.336 C 235.104 282.115 230.061 277.072 223.84 277.072 Z M 346.72 174.672 C 342.696 174.672 338.977 176.819 336.965 180.304 C 334.953 183.789 334.953 188.083 336.965 191.568 C 338.977 195.053 342.696 197.2 346.72 197.2 C 352.941 197.2 357.984 192.157 357.984 185.936 C 357.984 179.715 352.941 174.672 346.72 174.672 L 346.72 174.672 Z',
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

  // fabricCanvas.setViewportTransform([0.5, 0, 0, 0.5, 100, 100]);

  const path = new fabric.Path(EXAMPLE_PATH_D.arc, {
    objectCaching: false,
    noScaleCache: false,
    fill: '#e1e1e1',
    strokeWidth: 2,
    originX: 'center',
    originY: 'center',
    left: fabricCanvas.getWidth() / 2,
    top: fabricCanvas.getHeight() / 2,
    // angle: 45,
    scaleX: 1.2,
    scaleY: 1.2,
  });
  fabricCanvas.add(path);

  // let pathText = new fabric.Text(
  //   'The shortest way to do many things is to only one thing at a time.',
  //   {
  //     fontSize: 20,
  //     // @ts-ignore
  //     path: path as any,
  //     pathAlign: 'center',
  //     pathSide: 'left',
  //     left: fabricCanvas.getWidth() / 2,
  //     top: fabricCanvas.getHeight() / 2,
  //     originX: 'center',
  //     originY: 'center',
  //     objectCaching: false,
  //     noScaleCache: false,
  //     // backgroundColor: 'pink',
  //     // angle: 45,
  //     // scaleX: 0.5,
  //     // scaleY: 0.5,
  //   }
  // );
  // fabricCanvas.add(pathText);

  fabricCanvas.renderAll();

  const vizpath = new VizPathCreator({
    refreshPathTriggerTime: 'auto',
    refreshDeferDuration: 10,
  });

  const editor = new Editor(fabricCanvas, true);

  const operator = await vizpath
    .use(editor)
    .use(new EditorBackground())
    .use(new EditorBezier())
    .use(
      new EditorUI(
        defaultTheme,
        {
          hoverNode: null,
          hoverPoint: null,
          hoverLine: null,
          selectedNodes: [],
          selectedPoint: null,
          selectedLine: null,
        },
        (state) => {
          // 监听状态变化
        },
      ),
    )
    .use(
      new EditorShortcut([]),
    )
    .initialize();

  // // ① 通过路径指令直接绘制
  // const path1 = VizPath.parsePathData(EXAMPLE_PATH_D.test, {
  //   left: pathText.left,
  //   top: pathText.top,
  //   originX: pathText.originX,
  //   originY: pathText.originY,
  //   angle: pathText.angle,
  //   scaleX: pathText.scaleX,
  //   scaleY: pathText.scaleY,
  // });
  // operator.draw(path1);

  // operator.on('update', () => {
  //   const d = operator.getPathData(operator.paths);

  //   // 更新旧的路径信息
  //   path.initialize(d as any);
  //   pathText.initialize(pathText.text as any);

  //   // 创建参考路径对象并设置新的对象位置
  //   const referencePath = new fabric.Path(d);
  //   pathText.setPositionByOrigin(
  //     referencePath.getCenterPoint(),
  //     'center',
  //     'center'
  //   );
  //   // 提取出的路径信息会将缩放和旋转数据一并计算在内，所以需要重置状态
  //   pathText.set({
  //     scaleX: 1,
  //     scaleY: 1,
  //     angle: 0,
  //   })

  //   fabricCanvas.requestRenderAll();
  // });

  // ② 通过路径对象绘制
  const path2 = VizPathCreator.parseFabricPath(path);
  operator.draw(path2);

  operator.on('update', () => {
    const d = operator.getPathData(operator.paths);

    path.set({
      scaleX: 1,
      scaleY: 1,
      angle: 0,
    });
    path.initialize(d as any);

    path.canvas?.renderAll();

    // const d = operator.getPathData(operator.paths);

    // // 更新旧的路径信息
    // path.initialize(d as any);

    // // 创建参考路径对象并设置新的对象位置
    // const referencePath = new fabric.Path(d);
    // path.setPositionByOrigin(
    //   referencePath.getCenterPoint(),
    //   'center',
    //   'center'
    // );
    // // 提取出的路径信息会将缩放和旋转数据一并计算在内，所以需要重置状态
    // path.set({
    //   scaleX: 1,
    //   scaleY: 1,
    //   angle: 0,
    // })

    // fabricCanvas.renderAll();
  });

  // ③ 通过URL绘制
  // const svgURL = 'https://storage.sunzi.cool/image-template/2100d3fa-fbf0-4e7e-aa32-7afcf764fb62.svg';
  // const svgURL = 'https://sunzi-cool.maiyuan.online/image-template/d306e5f3-2c30-4599-b8a5-5348de226350.svg';
  // const paths = await VizPath.parsePathFile(svgURL, {
  //   left: fabricCanvas.getWidth() / 2,
  //   top: fabricCanvas.getHeight() / 2,
  //   originX: 'center',
  //   originY: 'center',
  //   scaleX: 1.2,
  //   scaleY: 1.2
  // });
  // paths?.forEach((path) => {
  //   operator.draw(path);
  // })

  // ④ 快速使用
  // const path = VizPath.parsePathData(EXAMPLE_PATH_D.bubble, {
  //   left: fabricCanvas.getWidth() / 2,
  //   top: fabricCanvas.getHeight() / 2,
  //   originX: 'center',
  //   originY: 'center'
  // });
  // operator.draw(path);

  // 上传input
  uploader.onchange = async (e: Event) => {
    const file = ((e.target as HTMLInputElement)?.files ?? [])[0];
    if (!file) return;

    operator.clearAll();

    const url = URL.createObjectURL(file);
    const paths = await VizPathCreator.parsePathFile(url, {
      left: fabricCanvas.getWidth() / 2,
      top: fabricCanvas.getHeight() / 2,
      originX: 'center',
      originY: 'center',
    });
    paths?.forEach((path) => {
      operator.draw(path);
    });
  };

  // 操作测试
  // const editorNode = vizpath.find(EditorNode);
  // if (!editorNode) return;

  // editorNode.focus(editorNode.nodes[3]);

  // const object = editorNode.add({ left: 100, top: 100 });
  // editorNode.focus(object);

  // editorNode.remove();

  // operator.move(operator.paths[0][0].node, { x: 200, y: 200 })

  // operator.insert(operator.paths[0].segment[0].node!, { x: 100, y: 100 }, true);
})();
