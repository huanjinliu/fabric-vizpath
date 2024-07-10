import React, { useCallback, useContext, useEffect } from 'react';
import { VizPath } from 'fabric-vizpath';
import { Instruction, PageContext } from '../Page';
import content from './README.md';
import { Markdown } from '../_components';

function Demo07() {
  const { canvas, currentDemo, setVizpath } = useContext(PageContext);

  const run = useCallback(async () => {
    if (!canvas) return;
    if (currentDemo !== Instruction._07_MODULE_APPLICATIONS) return;

    const vizpath = new VizPath();

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

export default Demo07;
