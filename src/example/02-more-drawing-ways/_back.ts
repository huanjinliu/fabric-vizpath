// import { fabric } from 'fabric';
// import {
//   VizPathCreator,
//   Editor,
//   EditorBackground,
//   EditorTheme,
//   EditorShortcut,
//   EditorBezier,
// } from 'fabric-path-editor';
// import defaultTheme from 'fabric-path-editor/dist/themes/default';

// const EXAMPLE_PATH_D = {
//   arch: 'M0.5 53.8667C0.5 24.3763 23.5738 0.5 52 0.5C80.4262 0.5 103.5 24.3763 103.5 53.8667V143.5H0.5V53.8667Z',
//   lines:
//     'M28 0.5H80M14 13.5H94M0 26.5H108M0 39.5H108M78 52.5H108M0 52.5H30M78 65.5H108M0 65.5H30M78 78.5H108M0 78.5H30M78 91.5H108M0 91.5H30M78 104.5H108M0 104.5H30M0 117.5H108M0 130.5H108M14 143.5H94M28 156.5H80',
//   spiral:
//     'M85.7639 135.505C85.7639 135.505 85.7496 135.509 85.7438 135.511C81.8568 136.497 77.6534 137.475 73.2314 137.944C67.5574 138.549 61.6383 138.342 55.6328 137.328C44.6718 135.481 34.7338 131.085 26.0907 124.27C15.2863 115.748 7.77844 104.811 3.78356 91.7677L3.71981 91.5592C-1.6158 73.6286 -0.194072 56.0381 7.9484 39.2738C12.0117 30.9068 17.7201 23.4838 24.9102 17.2098C29.8374 12.9103 35.4839 9.29955 41.6925 6.47953C52.3821 1.61793 64.1597 -0.517597 76.6933 0.126985C84.7958 0.543356 92.9129 2.38332 100.82 5.59858C110.005 9.33143 118.366 14.8208 125.674 21.9111C130.611 26.7023 134.948 32.3393 138.559 38.6666C141.123 43.1579 143.352 48.2517 145.374 54.248C145.454 54.4866 145.328 54.7435 145.091 54.8222C144.86 54.9058 144.599 54.7732 144.52 54.5346C142.516 48.5962 140.311 43.5519 137.776 39.1149C134.207 32.8635 129.926 27.2951 125.047 22.5619C117.823 15.5534 109.559 10.1298 100.483 6.43923C92.6707 3.26484 84.651 1.44574 76.6472 1.034C64.2628 0.394478 52.6255 2.50611 42.0675 7.3053C35.9395 10.0912 30.3663 13.6541 25.506 17.8952C18.4042 24.0883 12.774 31.4178 8.76162 39.6743C0.718869 56.2307 -0.686431 73.5977 4.58209 91.2987L4.64496 91.5043C8.58405 104.365 15.9889 115.15 26.6456 123.559C35.1663 130.282 44.9679 134.611 55.7773 136.436C61.6996 137.433 67.5398 137.639 73.1319 137.044C77.4892 136.579 81.6523 135.613 85.4983 134.636L85.62 134.593C95.4785 131.736 104.188 126.274 111.528 118.352C118.272 111.071 122.955 102.391 125.447 92.5603C127.078 86.1276 127.632 79.7237 127.091 73.5212C126.747 69.5733 126.117 65.9601 125.166 62.4827C123.463 56.2558 121.024 50.8366 117.713 45.9217C113.675 39.9273 108.646 34.9077 102.759 30.9987C96.2268 26.6603 89.1157 23.8287 81.625 22.5793C75.5671 21.5693 70.0219 21.5583 64.6691 22.5461L64.0153 22.6669C61.9489 23.0455 59.8138 23.4356 57.7696 24.0512C43.1548 28.6344 32.7493 38.3677 26.8413 52.9826C23.6236 60.9423 22.7312 69.4416 24.1864 78.2457C26.3941 91.5948 33.0422 101.958 43.9415 109.046C50.7525 113.473 58.4261 115.804 66.7529 115.968C71.1538 116.056 75.4058 115.453 79.385 114.173C79.3994 114.168 79.4166 114.163 79.431 114.159C89.0504 110.859 96.3017 104.95 100.99 96.5941C105.587 88.3997 107.006 79.6 105.213 70.44C103.377 61.0713 98.5646 53.7625 90.9103 48.7127C85.6079 45.2141 80.0918 43.44 74.0479 43.287C64.7248 43.0476 57.3688 45.9557 51.5687 52.175C45.9897 58.1526 43.5832 65.3354 44.4163 73.5223C45.5927 85.0905 53.1729 92.978 64.1995 94.1055C71.9883 94.9028 77.8729 92.2452 81.6966 86.2059C84.9508 81.0659 84.731 73.4165 81.21 69.1515C78.5375 65.9157 75.6196 64.7213 71.7498 65.2809C69.9512 65.5396 68.3157 66.4957 67.3751 67.8346C66.5081 69.0655 66.2353 70.5453 66.5653 72.2303C66.6121 72.4756 66.4527 72.7143 66.2102 72.7632C65.9668 72.8091 65.729 72.6475 65.6793 72.403C65.305 70.491 65.6364 68.7304 66.6369 67.3099C67.7179 65.7729 69.578 64.6785 71.6169 64.3843C75.8329 63.7758 79.0034 65.0671 81.9007 68.5761C85.6549 73.1213 85.9057 81.252 82.4565 86.6987C78.4356 93.0484 72.2637 95.8445 64.1117 95.0095C58.4168 94.4268 53.4785 92.0675 49.8321 88.1828C46.2858 84.41 44.1035 79.3682 43.5171 73.6105C42.6568 65.15 45.1447 57.7302 50.9068 51.551C56.8121 45.2235 64.6027 42.135 74.0655 42.3792C80.1957 42.5374 86.028 44.4112 91.4007 47.9548C99.2667 53.1425 104.21 60.652 106.097 70.271C107.934 79.6485 106.482 88.6578 101.775 97.0445C96.9693 105.613 89.5303 111.669 79.6716 115.038C79.6487 115.045 79.6286 115.051 79.6085 115.057C75.546 116.363 71.2189 116.968 66.7391 116.878C58.2442 116.708 50.4091 114.332 43.4558 109.809C32.3297 102.575 25.5493 92.0051 23.2982 78.3907C21.8135 69.4182 22.7239 60.7519 26.0069 52.6362C31.9793 37.8623 42.4735 27.9878 57.1947 23.2802C57.212 23.2749 57.2226 23.2685 57.2427 23.2624C57.3173 23.2396 57.392 23.2167 57.4666 23.1939L57.5241 23.1763C57.5241 23.1763 57.5355 23.1728 57.5442 23.1702C59.6208 22.5478 61.7645 22.1551 63.8433 21.7759L64.4943 21.656C69.9511 20.6491 75.5999 20.66 81.7601 21.6862C89.3758 22.9544 96.6056 25.8352 103.247 30.2416C109.231 34.2156 114.347 39.3199 118.452 45.4138C121.818 50.4134 124.296 55.9189 126.029 62.2442C126.996 65.7766 127.635 69.4379 127.985 73.4443C128.531 79.7494 127.971 86.2566 126.313 92.7861C123.783 102.768 119.029 111.577 112.182 118.972C104.732 127.016 95.8773 132.558 85.8905 135.457L85.7745 135.498C85.7745 135.498 85.7631 135.502 85.7573 135.504L85.7639 135.505Z',
//   arc: 'M 88.827 199.088 Q 258.533 199.088 258.533 368.794',
//   point: 'M 100 100 z',
//   polyline: 'M 40 40 L 160 40 L 40 100 L 160 100 L 40 160 L 160 160',
//   circle:
//     'M91 26.5C91 62.1223 62.1223 91 26.5 91S-38 62.1223 -38 26.5S-9.1223 -38 26.5 -38S91 -9.1223 91 26.5z',
//   bubble:
//     'M5 -39c-29.8233 0 -54 24.1767 -54 54c0 22.3749 13.6084 41.5716 33 49.7646V93L16.0001 69H50c29.8233 0 54 -24.1767 54 -54S79.8233 -39 50 -39H5z',
//   shapes:
//     'L-188.7846 -47L-100.923 97H-256.3538 z M91 26.5C91 62.1223 62.1223 91 26.5 91S-38 62.1223 -38 26.5S-9.1223 -38 26.5 -38S91 -9.1223 91 26.5z',
//   heart:
//     'M,-108.5,-211.5 C,-175.5,-211.5,-228.5,-157.5,-228.5,-91.5 C,-228.5,43.5,-92.5,78.5,-0.5,211.5 C,87.5,79.5,228.5,38.5,228.5,-91.5 C,228.5,-157.5,174.5,-211.5,108.5,-211.5 C,60.5,-211.5,18.5,-183.5,-0.5,-142.5 C,-19.5,-183.5,-60.5,-211.5,-108.5,-211.5 z',
//   banana:
//     'M 8,223 c 0,0 143,3 185,-181 c 2,-11 -1,-20 1,-33 h 16 c 0,0 -3,17 1,30 c 21,68 -4,242 -204,196 L 8,223 z M 8,230 c 0,0 188,40 196,-160',
//   test: 'M -150 50 z M 0 0 Q 50 0 50 50 Q 50 100 0 100 Q -50 100 -50 50 Q -50 0 0 0 z M 80 0 L 180 0 L 80 50 L 180 50 L 80 100 L 180 100',
//   favicon:
//     'M 295.233 250.642 L 390.393 281.854 C 391.402 282.189 392.1 283.112 392.145 284.174 C 392.191 285.236 391.575 286.216 390.598 286.636 L 346.157 305.682 L 326.998 350.39 C 326.586 351.364 325.619 351.985 324.562 351.953 C 323.506 351.921 322.578 351.243 322.226 350.247 L 288.823 257.237 C 288.163 255.397 288.609 253.342 289.971 251.94 C 291.334 250.539 293.375 250.035 295.233 250.642 L 295.233 250.642 Z M 346.72 156.24 C 362.4 156.244 375.375 168.438 376.351 184.088 C 377.327 199.738 365.967 213.449 350.408 215.401 C 334.85 217.353 320.456 206.872 317.536 191.465 C 278.386 195.181 245.902 223.319 236.64 261.538 C 249.18 267.502 255.91 281.363 252.842 294.906 C 249.773 308.449 237.726 318.055 223.84 318.032 C 208.938 318.053 196.329 307.026 194.362 292.256 C 192.396 277.485 201.68 263.543 216.068 259.664 C 226.553 210.348 269.336 172.951 321.232 170.678 C 326.595 161.716 336.275 156.232 346.72 156.24 Z M 223.84 277.072 C 219.816 277.072 216.097 279.219 214.085 282.704 C 212.073 286.189 212.073 290.483 214.085 293.968 C 216.097 297.453 219.816 299.6 223.84 299.6 C 230.061 299.6 235.104 294.557 235.104 288.336 C 235.104 282.115 230.061 277.072 223.84 277.072 Z M 346.72 174.672 C 342.696 174.672 338.977 176.819 336.965 180.304 C 334.953 183.789 334.953 188.083 336.965 191.568 C 338.977 195.053 342.696 197.2 346.72 197.2 C 352.941 197.2 357.984 192.157 357.984 185.936 C 357.984 179.715 352.941 174.672 346.72 174.672 L 346.72 174.672 Z',
// };

// (async () => {
//   // 取得上传文件输入框
//   const uploader = document.getElementById('upload') as HTMLInputElement;

//   // 取得容器节点
//   const container = document.getElementsByTagName('main')[0];

//   // 创建画布节点
//   const canvas = document.createElement('canvas');
//   container.appendChild(canvas);

//   // 添加容器尺寸更改监听
//   new ResizeObserver(() => {
//     fabricCanvas.setDimensions({
//       width: container.clientWidth,
//       height: container.clientHeight,
//     });
//     fabricCanvas.renderAll();
//   }).observe(container);

//   // 创建fabric画布
//   const fabricCanvas = new fabric.Canvas(canvas, {
//     width: container.clientWidth,
//     height: container.clientHeight,
//     selectionBorderColor: '#ccc',
//     selectionColor: 'rgba(150, 150, 150, 0.3)',
//     // selection: false,
//   });

//   // fabricCanvas.setViewportTransform([0.5, 0, 0, 0.5, 100, 100]);

//   const path = new fabric.Path(EXAMPLE_PATH_D.arch, {
//     objectCaching: false,
//     noScaleCache: false,
//     fill: '#e1e1e1',
//     // stroke: '#333',
//     // strokeWidth: 20,
//     originX: 'center',
//     originY: 'center',
//     left: fabricCanvas.getWidth() / 2,
//     top: fabricCanvas.getHeight() / 2,
//     // angle: 45,
//     scaleX: 1.2,
//     scaleY: 1.2,
//   });
//   fabricCanvas.add(path);

//   // let pathText = new fabric.IText(
//   //   'The shortest way to do many things is to only one thing at a time.',
//   //   {
//   //     fontSize: 10,
//   //     // @ts-ignore
//   //     path: path as any,
//   //     pathStartOffset: 100,
//   //     pathAlign: 'descender',
//   //     pathSide: 'left',
//   //     left: fabricCanvas.getWidth() / 2,
//   //     top: fabricCanvas.getHeight() / 2,
//   //     originX: 'center',
//   //     originY: 'center',
//   //     objectCaching: false,
//   //     noScaleCache: false,
//   //     // backgroundColor: 'pink',
//   //     // angle: 45,
//   //     scaleX: 2,
//   //     scaleY: 2,
//   //   }
//   // );
//   // fabricCanvas.add(pathText);

//   // fabricCanvas.renderAll();

//   const vizpath = new VizPathCreator({
//     refreshPathTriggerTime: 'auto',
//     refreshDeferDuration: 10,
//   });

//   const editor = new Editor(fabricCanvas, true);

//   const operator = await vizpath
//     .use(editor)
//     .use(new EditorBackground())
//     .use(new EditorBezier())
//     .use(new EditorTheme(defaultTheme))
//     .use(
//       new EditorShortcut([
//         // 删除节点快捷键
//         {
//           key: 'backspace',
//           onActivate: (e) => {
//             e.preventDefault();

//             const editor = vizpath.find(Editor);
//             if (!editor) return;

//             // 如果当前有选中曲线控制点
//             if (editor.activePoint) {
//               editor.remove(editor.activePoint);
//             } else if (editor.activeNodes.length) {
//               editor.remove(...editor.activeNodes);
//             }
//           },
//         },
//         // 全选节点快捷键
//         {
//           key: 'A',
//           combinationKeys: ['meta'],
//           onActivate: (e) => {
//             e.preventDefault();

//             const editor = vizpath.find(Editor);
//             if (!editor) return;

//             editor.focus(...editor.nodes);
//           },
//         },
//         // 取消节点选择
//         {
//           key: 'D',
//           combinationKeys: ['meta'],
//           onActivate: (e) => {
//             e.preventDefault();

//             const editor = vizpath.find(Editor);
//             if (!editor) return;

//             editor.focus();
//           },
//         },
//         // 更改路径节点交互模式
//         {
//           combinationKeys: ['alt'],
//           onActivate: () => {
//             const editor = vizpath.find(Editor);
//             if (!editor) return;

//             return editor.set({
//               dotSymmetricMode: editor.dotSymmetricAutoMode === 'none' ? 'angle' : 'none',
//             });
//           },
//           onDeactivate: (e, reset) => {
//             reset?.();
//           },
//         },
//         {
//           combinationKeys: ['alt', 'ctrl'],
//           onActivate: () => {
//             const editor = vizpath.find(Editor);
//             if (!editor) return;

//             return editor.set({
//               dotSymmetricMode: editor.dotSymmetricAutoMode === 'none' ? 'entire' : 'none',
//             });
//           },
//           onDeactivate: (e, reset) => {
//             reset?.();
//           },
//         },
//         // 更改为变换模式
//         {
//           key: 'V',
//           onActivate: () => {
//             const editor = vizpath.find(Editor);
//             if (!editor) return;

//             return editor.set({
//               mode: 'convert',
//               dotSymmetricMode: 'entire',
//             });
//           },
//           onDeactivate: (e, reset) => {
//             reset?.();
//           },
//         },
//         // 更改为添加模式
//         {
//           key: 'P',
//           onActivate: () => {
//             const editor = vizpath.find(Editor);
//             if (!editor) return;

//             return editor.set('mode', 'add');
//           },
//           onDeactivate: (e, reset) => {
//             reset?.();
//           },
//         },
//       ]),
//     )
//     .initialize();

//   // // ① 通过路径指令直接绘制
//   // const path1 = VizPathCreator.parsePathData(EXAMPLE_PATH_D.arch, {
//   //   left: pathText.left,
//   //   top: pathText.top,
//   //   originX: pathText.originX,
//   //   originY: pathText.originY,
//   //   angle: pathText.angle,
//   //   scaleX: pathText.scaleX,
//   //   scaleY: pathText.scaleY,
//   // });
//   // operator.draw(path1);

//   // operator.on('update', () => {
//   //   const d = operator.getPathData(operator.paths);

//   //   // 更新旧的路径信息
//   //   path.initialize(d as any);
//   //   pathText.initialize(pathText.text as any);

//   //   // 创建参考路径对象并设置新的对象位置
//   //   const referencePath = new fabric.Path(d);
//   //   pathText.setPositionByOrigin(
//   //     referencePath.getCenterPoint(),
//   //     'center',
//   //     'center'
//   //   );
//   //   // 提取出的路径信息会将缩放和旋转数据一并计算在内，所以需要重置状态
//   //   pathText.set({
//   //     scaleX: 1,
//   //     scaleY: 1,
//   //     angle: 0,
//   //     pathStartOffset: pathText.pathStartOffset! * pathText.scaleX!,
//   //     fontSize: pathText.fontSize! * pathText.scaleX!,
//   //     strokeWidth: pathText.strokeWidth! * pathText.scaleX!,
//   //   })

//   //   fabricCanvas.requestRenderAll();
//   // });

//   // ② 通过路径对象绘制
//   const path2 = VizPathCreator.parseFabricPath(path);
//   operator.draw(path2);

//   operator.on('update', () => {
//     const d = operator.getPathData(operator.paths);

//     path.set({
//       scaleX: 1,
//       scaleY: 1,
//       angle: 0,
//       strokeWidth: path.strokeWidth! * path.scaleX!,
//     });
//     path.initialize(d as any);

//     path.canvas?.renderAll();

//     // const d = operator.getPathData(operator.paths);

//     // // 更新旧的路径信息
//     // path.initialize(d as any);

//     // // 创建参考路径对象并设置新的对象位置
//     // const referencePath = new fabric.Path(d);
//     // path.setPositionByOrigin(
//     //   referencePath.getCenterPoint(),
//     //   'center',
//     //   'center'
//     // );
//     // // 提取出的路径信息会将缩放和旋转数据一并计算在内，所以需要重置状态
//     // path.set({
//     //   scaleX: 1,
//     //   scaleY: 1,
//     //   angle: 0,
//     // })

//     // fabricCanvas.renderAll();
//   });

//   // ③ 通过URL绘制
//   // const svgURL = 'https://storage.sunzi.cool/image-template/2100d3fa-fbf0-4e7e-aa32-7afcf764fb62.svg';
//   // const svgURL = 'https://sunzi-cool.maiyuan.online/image-template/d306e5f3-2c30-4599-b8a5-5348de226350.svg';
//   // const paths = await VizPath.parsePathFile(svgURL, {
//   //   left: fabricCanvas.getWidth() / 2,
//   //   top: fabricCanvas.getHeight() / 2,
//   //   originX: 'center',
//   //   originY: 'center',
//   //   scaleX: 1.2,
//   //   scaleY: 1.2
//   // });
//   // paths?.forEach((path) => {
//   //   operator.draw(path);
//   // })

//   // ④ 快速使用
//   // const path = VizPath.parsePathData(EXAMPLE_PATH_D.bubble, {
//   //   left: fabricCanvas.getWidth() / 2,
//   //   top: fabricCanvas.getHeight() / 2,
//   //   originX: 'center',
//   //   originY: 'center'
//   // });
//   // operator.draw(path);

//   // 上传input
//   uploader.onchange = async (e: Event) => {
//     const file = ((e.target as HTMLInputElement)?.files ?? [])[0];
//     if (!file) return;

//     operator.clearAll();

//     const url = URL.createObjectURL(file);
//     const paths = await VizPathCreator.parsePathFile(url, {
//       left: fabricCanvas.getWidth() / 2,
//       top: fabricCanvas.getHeight() / 2,
//       originX: 'center',
//       originY: 'center',
//     });
//     paths?.forEach((path) => {
//       operator.draw(path);
//     });
//   };

//   // 操作测试
//   // const editorNode = vizpath.find(EditorNode);
//   // if (!editorNode) return;

//   // editorNode.focus(editorNode.nodes[3]);

//   // const object = editorNode.add({ left: 100, top: 100 });
//   // editorNode.focus(object);

//   // editorNode.remove();

//   // operator.move(operator.paths[0][0].node, { x: 200, y: 200 })
// })();
