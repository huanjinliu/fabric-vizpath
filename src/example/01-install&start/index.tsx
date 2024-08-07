import React, { useCallback, useContext, useEffect } from 'react';
import { EditorMove, EditorResize, EditorZoom, Path, VizPathEditor } from 'fabric-vizpath';
import { Instruction, PageContext } from '../Page';
import content from './README.md';
import { Markdown } from '../_components';

function Demo01() {
  const { canvas, currentDemo, setEditor } = useContext(PageContext);

  const run = useCallback(async () => {
    if (!canvas) return;
    if (currentDemo !== Instruction._01_INSTALL_AND_START) return;

    // 创建路径对象，该对象继承于fabric.Path，所以也可以直接通过add方法添加进fabric画布
    const path = new Path('M 0 100 L 100 0 L 0 -100 L -100 0 Z');

    // 创建路径编辑器
    const editor = new VizPathEditor();

    // 应用增强模块
    editor.use(new EditorMove()).use(new EditorZoom()).use(new EditorResize());

    // 挂载编辑器
    editor.mount(canvas);

    // 进入路径编辑 ❗进入路径编辑前未挂载编辑器会抛出错误
    editor.enterEditing(path);

    // 或者直接通过路径自身方法进入编辑，但是要确保path已经加入编辑器所挂载的画布中
    // canvas.add(path);
    // path.enterEditing();

    // 退出路径编辑
    // path.leaveEditing();

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

export default Demo01;
