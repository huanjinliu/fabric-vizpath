import React, { useCallback, useContext, useEffect } from 'react';
import { Path } from 'fabric-vizpath';
import { Instruction, PageContext } from '../Page';
import content from './README.md';
import { Markdown } from '../_components';

function Demo03() {
  const { canvas, currentDemo, setEditor } = useContext(PageContext);

  const run = useCallback(async () => {
    if (!canvas) return;
    if (currentDemo !== Instruction._03_TRANSFORM_PATH) return;

    const path = new Path();
    const vizpath = path.visualize();

    console.log(vizpath);
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
