import React, { useCallback, useContext, useEffect } from 'react';
import { EditorBackground, EditorMove, EditorResize, EditorZoom, VizPath } from 'fabric-vizpath';
import { Instruction, PageContext } from '../Page';
import content from './README.md';
import { Markdown } from '../_components';

function Demo01() {
  const { canvas, currentDemo, setVizpath } = useContext(PageContext);

  const run = useCallback(async () => {
    if (!canvas) return;
    if (currentDemo !== Instruction._01_INSTALL_AND_START) return;

    const vizpath = new VizPath(
      'M-2 -12c-5.5228 0 -10 4.4772 -10 10v60c0 5.5228 4.4772 10 10 10h60c5.5228 0 10 -4.4772 10 -10V-2c0 -5.5228 -4.4772 -10 -10 -10H-2zM35.5 43h-20C14.1193 43 13 41.8807 13 40.5v-20c0 -1.9245 2.0833 -3.1273 3.75 -2.1651C17.5235 18.7815 18 19.6068 18 20.5v13.965L38.73 13.73c1.3625 -1.3625 3.6891 -0.7391 4.1879 1.1221C43.1493 15.716 42.9024 16.6376 42.27 17.27L21.535 38H35.5c1.9245 0 3.1273 2.0833 2.1651 3.75C37.2185 42.5235 36.3932 43 35.5 43z',
    );

    // vizpath.segments[0].pathObject.set({
    //   left: 0,
    //   top: 0,
    //   scaleX: 5,
    //   scaleY: 5
    // })

    vizpath
      .use(new EditorBackground())
      .use(new EditorResize())
      .use(new EditorMove())
      .use(new EditorZoom())
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
