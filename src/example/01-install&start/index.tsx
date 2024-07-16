import React, { useCallback, useContext, useEffect } from 'react';
import { EditorBackground, EditorMove, EditorResize, EditorZoom, VizPath } from 'fabric-vizpath';
import { Instruction, PageContext } from '../Page';
import content from './README.md';
import { Markdown } from '../_components';
import paths from '../paths.json';

function Demo01() {
  const { canvas, currentDemo, setVizpath } = useContext(PageContext);

  const run = useCallback(async () => {
    if (!canvas) return;
    if (currentDemo !== Instruction._01_INSTALL_AND_START) return;

    const vizpath = new VizPath(paths.shapes);

    // vizpath.segments[0].pathObject.set({
    //   left: 0,
    //   top: 0,
    //   scaleX: 5,
    //   scaleY: 5
    // })

    vizpath
      .use(new EditorBackground())
      .use(new EditorMove())
      .use(new EditorZoom())
      .use(new EditorResize())
      .mount(canvas);

    setVizpath(vizpath);
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

export default Demo01;
