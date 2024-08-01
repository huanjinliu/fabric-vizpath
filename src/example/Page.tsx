import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { fabric } from 'fabric';
import {
  VizPathEditor,
  // VizPath,
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
import { ContentCard, Icon, IconButton } from './_components';
import Demo01 from './01-install&start';
import Demo02 from './02-more-drawing-ways';
import Demo03 from './03-transform-path';
import Demo04 from './04-how-to-operate';
import Demo05 from './05-synchronization';
import Demo06 from './06-theme-settings';
import Demo07 from './07-module-applications';
import Demo08 from './08-how-to-develop-modules';
import Demo09 from './09-api';
import paths from './paths.json';
import styles from './style.less';

export enum Instruction {
  _01_INSTALL_AND_START = 'Install & Start',
  _02_MORE_DRAWING_WAYS = 'More Drawing Methods',
  _03_TRANSFORM_PATH = 'Transform Path',
  _04_HOW_TO_OPERATE_PATH = 'How to Operate Path',
  _05_SYNCHRONIZATION = 'Synchronization',
  _06_THEME_SETTINGS = 'Theme Settings',
  _07_MODULE_APPLICATIONS = 'Module Applications',
  _08_HOW_TO_DEVELOP_MODULES = 'How to Develop Modules',
  _09_API = 'API',
}

/**
 * 示例内容大纲
 */
const contents = [
  {
    title: Instruction._01_INSTALL_AND_START,
    component: <Demo01 />,
  },
  {
    title: Instruction._02_MORE_DRAWING_WAYS,
    component: <Demo02 />,
  },
  {
    title: Instruction._03_TRANSFORM_PATH,
    component: <Demo03 />,
  },
  {
    title: Instruction._04_HOW_TO_OPERATE_PATH,
    component: <Demo04 />,
  },
  {
    title: Instruction._05_SYNCHRONIZATION,
    component: <Demo05 />,
  },
  {
    title: Instruction._06_THEME_SETTINGS,
    component: <Demo06 />,
  },
  {
    title: Instruction._07_MODULE_APPLICATIONS,
    component: <Demo07 />,
  },
  {
    title: Instruction._08_HOW_TO_DEVELOP_MODULES,
    component: <Demo08 />,
  },
  {
    title: Instruction._09_API,
    component: <Demo09 />,
  },
];

export const PageContext = createContext<{
  canvas?: fabric.Canvas;
  currentDemo?: string;
  editor?: VizPathEditor;
  setEditor: React.Dispatch<React.SetStateAction<VizPathEditor | undefined>>;
}>({
  setEditor: () => {},
});

const Page = () => {
  const _canvasEl = useRef<HTMLCanvasElement>(null);

  const [view, setView] = useState<'only-docs' | 'only-demo' | 'both'>('only-demo');

  const [canvas, setCanvas] = useState<fabric.Canvas>();
  const [editor, setEditor] = useState<VizPathEditor>();
  const [currentDemo, setCurrentDemo] = useState<string>(Instruction._01_INSTALL_AND_START);

  const initial = useCallback(async () => {
    if (!_canvasEl.current) return;

    const canvas = _canvasEl.current;
    const container = canvas.parentNode as HTMLDivElement;

    const fabricCanvas = new fabric.Canvas(canvas, {
      width: container.clientWidth,
      height: container.clientHeight,
      selectionBorderColor: '#ccc',
      selectionColor: 'rgba(150, 150, 150, 0.3)',
    });

    setCanvas(fabricCanvas);
  }, []);

  useEffect(() => {
    initial();
  }, [initial]);

  const handleSelect = useCallback(
    (item: string) => {
      if (currentDemo === item) return;
      editor?.destroy();
      setEditor(undefined);
      setCurrentDemo(item);
    },
    [currentDemo, editor],
  );

  return (
    <PageContext.Provider value={{ canvas, currentDemo, editor, setEditor }}>
      <div className={styles.page}>
        {/* LOGO & Documents */}
        <div
          className={classnames(styles.instruction, {
            [styles.half]: view === 'both',
            [styles.maximize]: view === 'only-docs',
            [styles.minimize]: view === 'only-demo',
          })}
        >
          <div className={styles.logo}>
            <h2 className={styles.title}>Fabric VizPath</h2>
            <p className={styles.description}>A path editor for Fabric.js.</p>
          </div>
          <main>
            {contents.map((item, index) => (
              <ContentCard
                className={styles.content}
                key={item.title}
                title={`0${index + 1}/ ${item.title}`}
                onSelect={() => handleSelect(item.title)}
              >
                {item.component}
              </ContentCard>
            ))}
          </main>
        </div>
        <div
          className={styles.container}
          style={{ display: view === 'only-docs' ? 'none' : 'block' }}
        >
          <canvas ref={_canvasEl}></canvas>
          {/* Tools */}
          {/* <footer className={styles.toolBar}>
            {Object.entries(paths).map(([key, path]) => {
              return (
                <svg key={key} xmlns="http://www.w3.org/2000/svg">
                  <path d={path} fill="none" stroke="#333"></path>
                </svg>
              );
            })}
            <span>形状</span>
          </footer> */}
          {/* Other Tools */}
          <aside className={styles.buttons}>
            <IconButton
              name="github"
              onClick={() => {
                window.open('https://github.com/huanjinliu/fabric-vizpath', '_blank');
              }}
            />
            <IconButton
              name="position"
              onClick={() => {
                const canvas = editor?.canvas;
                if (!canvas) return;
                const center = canvas.getCenter();
                canvas.setViewportTransform([1, 0, 0, 1, center.left, center.top]);
              }}
            />
            <IconButton
              name="document"
              active={view === 'both'}
              onClick={() => {
                setView(view === 'both' ? 'only-demo' : 'both');
              }}
            />
          </aside>
        </div>
      </div>
    </PageContext.Provider>
  );
};

export default Page;
