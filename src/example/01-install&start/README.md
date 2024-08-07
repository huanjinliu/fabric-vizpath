#### Installation

```shell
$ npm install fabric-vizpath --save
// or
$ pnpm add fabric-vizpath
```

#### Quick Start

> Attention: You must make sure you had installed [fabric.js](https://github.com/fabricjs/fabric.js) before using this library!

```typescript
import { fabric } from 'fabric';
import { Path, VizPathEditor, EditorMove, EditorZoom, EditorResize } from 'fabric-vizpath';

// 创建路径对象，该对象继承于fabric.Path，所以也可以直接通过add方法添加进fabric画布
const path = new Path('M 0 100 L 100 0 L 0 -100 L -100 0 Z');

// 创建路径编辑器
const editor = new VizPathEditor();

// 应用增强模块
editor
  .use(new EditorMove())
  .use(new EditorZoom())
  .use(new EditorResize());

// 挂载编辑器
editor.mount(new fabric.Canvas(...));

// 进入路径编辑 ❗进入路径编辑前未挂载编辑器会抛出错误
editor.enterEditing(path);
```
