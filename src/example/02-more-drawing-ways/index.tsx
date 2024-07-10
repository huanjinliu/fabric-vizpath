import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import {
  VizPath,
  // Editor,
  // EditorBackground,
  // EditorTheme,
  // EditorShortcut,
  // EditorMove,
  // EditorBezier,
  // EditorResize,
  // EditorZoom,
} from 'fabric-vizpath';
// import defaultTheme, { type ThemeShareState } from 'fabric-vizpath/dist/themes/default';
import { Instruction, PageContext } from '../Page';
import content from './README.md';
import { Markdown } from '../_components';

function Demo02() {
  const { canvas, currentDemo, setVizpath } = useContext(PageContext);

  // const init = useCallback(async (canvas: HTMLCanvasElement) => {
  //   const container = canvas.parentNode as HTMLDivElement;

  //   // 创建fabric画布
  //   const fabricCanvas = new fabric.Canvas(canvas, {
  //     width: container.clientWidth,
  //     height: container.clientHeight,
  //     selectionBorderColor: '#ccc',
  //     selectionColor: 'rgba(150, 150, 150, 0.3)',
  //     // selection: false,
  //   });

  //   // fabricCanvas.setViewportTransform([0.5, 0, 0, 0.5, 100, 100]);

  //   // const path = new fabric.Path('M0.5 53.8667C0.5 24.3763 23.5738 0.5 52 0.5C80.4262 0.5 103.5 24.3763 103.5 53.8667V143.5H0.5V53.8667Z', {
  //   //   objectCaching: false,
  //   //   noScaleCache: false,
  //   //   fill: '#e1e1e1',
  //   //   // stroke: '#333',
  //   //   // strokeWidth: 20,
  //   //   originX: 'center',
  //   //   originY: 'center',
  //   //   left: fabricCanvas.getWidth() / 2,
  //   //   top: fabricCanvas.getHeight() / 2,
  //   //   // angle: 45,
  //   //   scaleX: 1.2,
  //   //   scaleY: 1.2,
  //   // });
  //   // fabricCanvas.add(path);

  //   const vizpath = new VizPath({
  //     refreshPathTriggerTime: 'auto',
  //     refreshDeferDuration: 10,
  //   });

  //   const editor = new Editor(fabricCanvas);
  //   const bezier = new EditorBezier();

  //   vizpath
  //     .use(editor)
  //     .use(new EditorMove())
  //     .use(new EditorZoom())
  //     .use(new EditorResize(container))
  //     .use(new EditorBackground())
  //     .use(bezier)
  //     .use(
  //       new EditorShortcut([
  //         // 删除节点快捷键
  //         {
  //           key: 'backspace',
  //           onActivate: (e) => {
  //             e.preventDefault();

  //             const editor = vizpath.findModule(Editor);
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

  //             const editor = vizpath.findModule(Editor);
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

  //             const editor = vizpath.findModule(Editor);
  //             if (!editor) return;

  //             editor.focus();
  //           },
  //         },
  //         // 更改路径节点交互模式
  //         {
  //           combinationKeys: ['alt'],
  //           onActivate: () => {
  //             const editor = vizpath.findModule(Editor);
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
  //             const editor = vizpath.findModule(Editor);
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
  //             const editor = vizpath.findModule(Editor);
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
  //             const editor = vizpath.findModule(Editor);
  //             if (!editor) return;

  //             return editor.set('mode', 'add');
  //           },
  //           onDeactivate: (e, reset) => {
  //             reset?.();
  //           },
  //         },
  //       ]),
  //     );

  //   // const theme = new EditorTheme<ThemeShareState>({
  //   //   hoverNode: null,
  //   //   hoverPoint: null,
  //   //   hoverLine: null,
  //   //   selectedNodes: [],
  //   //   selectedPoint: null,
  //   //   selectedLine: null,
  //   // });
  //   // theme.configure(editor, defaultTheme);
  //   // theme.configure(bezier, (editor, shareState) => {
  //   //   return {
  //   //     splitDot: editor.themes.create('node'),
  //   //     virtualNode: editor.themes.create('node'),
  //   //     // virtualPath:
  //   //   };
  //   // });
  //   // vizpath.use(theme);

  //   await vizpath.mount();

  //   // const path2 = VizPath.parseFabricPath(path);
  //   const path2 = VizPath.parsePathData(
  //     'M0.5 53.8667C0.5 24.3763 23.5738 0.5 52 0.5C80.4262 0.5 103.5 24.3763 103.5 53.8667V143.5H0.5V53.8667Z',
  //   );
  //   vizpath.draw(path2);
  //   path2[0].pathObject.set({
  //     left: fabricCanvas.getWidth() / 2,
  //     top: fabricCanvas.getHeight() / 2,
  //     scaleX: 3,
  //     scaleY: 1.5,
  //     angle: 30,
  //     // originX: 'center',
  //     // originY: 'center'
  //   })

  //   // fabricCanvas.on('before:render', () => {
  //   //   const dirtySegments = vizpath.segments.filter(i => i.pathObject.isCacheDirty());
  //   //   vizpath.events.fire('draw', dirtySegments);
  //   // });
  //   // vizpath.events.fire('draw', path2)
  //   // vizpath.rerenderOriginPath(path2[0].pathObject);

  //   //   vizpath.events.on('update', () => {
  //   //     const d = vizpath.segments.map(segment => {
  //   //       return vizpath.getSegmentData(segment);
  //   //     }).join(' ');

  //   //     path.set({
  //   //       scaleX: 1,
  //   //       scaleY: 1,
  //   //       angle: 0,
  //   //       strokeWidth: path.strokeWidth! * path.scaleX!,
  //   //     });
  //   //     path.initialize(d as any);

  //   //     path.canvas?.renderAll();
  //   //   });
  // }, []);

  const run = useCallback(async () => {
    if (!canvas) return;
    if (currentDemo !== Instruction._02_MORE_DRAWING_WAYS) return;

    console.log('02');

    const vizpath = new VizPath('', {
      refreshPathTriggerTime: 'auto',
      refreshDeferDuration: 10,
    });

    console.log(vizpath);
  }, [currentDemo, canvas, setVizpath]);

  useEffect(() => {
    run();
  }, [run]);

  return (
    <div>
      <Markdown content={content} />
    </div>
  );
}

export default Demo02;
