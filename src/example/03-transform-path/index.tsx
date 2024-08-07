import React, { useCallback, useContext, useEffect } from 'react';
import { fabric } from 'fabric';
import {
  EditorBackground,
  EditorMove,
  EditorResize,
  EditorZoom,
  EditorTheme,
  EditorTrack,
  EditorSplitDot,
  Path,
  VizPathEditor,
  EditorShortcut,
} from 'fabric-vizpath';
import defaultTheme from 'fabric-vizpath/dist/themes/default';
import { Instruction, PageContext } from '../Page';
import content from './README.md';
import { Markdown } from '../_components';
import paths from '../paths.json';
import { wait } from 'vivid-wait';

function Demo03() {
  const { canvas, currentDemo, setEditor } = useContext(PageContext);

  const run = useCallback(async () => {
    if (!canvas) return;
    if (currentDemo !== Instruction._03_TRANSFORM_PATH) return;

    const path = new Path(paths.shapes);
    const vizpath = path.visualize();

    const editor = new VizPathEditor();
    await editor
      .use(new EditorBackground())
      .use(new EditorMove())
      .use(new EditorZoom())
      .use(new EditorResize())
      .use(
        new EditorShortcut(
          [
            {
              key: 'C',
              combinationKeys: ['ctrl'],
              onActivate: () => {
                editor.draw(
                  Path.transform(vizpath.getPathData(null), [{ translate: { x: 10, y: 10 } }]),
                );
              },
            },
            {
              key: 'A',
              combinationKeys: ['ctrl'],
              onActivate: () => {
                return editor.focus(...editor.nodes);
              },
            },
            {
              key: 'D',
              onActivate: () => {
                return editor.set('mode', 'delete');
              },
              onDeactivate: (e, reset) => {
                reset();
              },
            },
            {
              key: 'P',
              onActivate: () => {
                return editor.set('mode', 'add');
              },
              onDeactivate: (e, reset) => {
                reset();
              },
            },
            {
              key: 'V',
              onActivate: () => {
                return editor.set('mode', 'convert');
              },
              onDeactivate: (e, reset) => {
                reset();
              },
            },
            {
              key: 'O',
              combinationKeys: ['ctrl'],
              onActivate: () => {
                console.log(
                  vizpath.getPathData(null, { withTransform: true, withTranslate: true }),
                );
              },
            },
            {
              key: 'BACKSPACE',
              onActivate: () => {
                if (editor.activePoint) editor.remove(editor.activePoint);
                else editor.remove(...editor.activeNodes);
              },
            },
          ],
          /** verbose */ false,
        ),
      )
      .use(
        new EditorTheme(defaultTheme, {
          hoverNode: null,
          hoverPoint: null,
          hoverLine: null,
          selectedNodes: [],
          selectedPoint: null,
          selectedLine: null,
        }),
      )
      .use(new EditorTrack())
      .use(new EditorSplitDot())
      .mount(canvas);

    editor.enterEditing(path);

    await wait(3000);

    setEditor(editor);
  }, [currentDemo, canvas, setEditor]);

  useEffect(() => {
    run();
  }, [run]);

  return (
    <div>
      <Markdown content={content} />
    </div>
  );
}

export default Demo03;
