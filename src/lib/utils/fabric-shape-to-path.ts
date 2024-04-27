import { fabric } from 'fabric';

/**
 * 加载svg文件并将内部基础形状转化为纯路径
 */
const loadSVGToPathFromURL = async (url: string) => {
  /**
   * 将svg基本图像转为路径
   */
  const shapeToPath = (svg: fabric.Object) => {
    let path: fabric.Path = new fabric.Path();

    const { type } = svg;

    /** 如果是多形状组成,拼接路径 */
    if (type === 'group') {
      const group = svg as fabric.Group;
      group.forEachObject((child, index) => {
        const childPath = shapeToPath(child);
        group.insertAt(childPath, index, true);
      });
      return group;
    }

    /** 转化矩形形状 */
    const convertRectPath = (params: {
      w: number;
      h: number;
      x: number;
      y: number;
      rx?: number;
      ry?: number;
    }) => {
      const { w, h, x, y } = params;
      let { rx = 0, ry = 0 } = params;
      // normalise radius values, just like the original does it (or should do)
      if (rx < 0) rx = 0;
      if (ry < 0) ry = 0;
      rx = rx || ry;
      ry = ry || rx;
      if (rx > w / 2) rx = w / 2;
      if (ry > h / 2) ry = h / 2;

      const d =
        rx && ry
          ? [
              ['M', rx + x, y],
              ['h', w - 2 * rx],
              ['a', rx, ry, 0, 0, 1, rx, ry],
              ['v', h - 2 * ry],
              ['a', rx, ry, 0, 0, 1, -rx, ry],
              ['h', -w + 2 * rx],
              ['a', rx, ry, 0, 0, 1, -rx, -ry],
              ['v', -h + 2 * ry],
              ['a', rx, ry, 0, 0, 1, rx, -ry],
              ['z'],
            ]
          : [['M', x, y], ['h', w], ['v', h], ['h', -w], ['v', -h], ['z']];
      return new fabric.Path(d as any);
    };

    /** 转化类椭圆形形状 */
    const convertEllipsePath = ({
      x,
      y,
      rx = 0,
      ry = 0,
    }: {
      x: number;
      y: number;
      rx?: number;
      ry?: number;
    }) => {
      const d = [
        ['M', x - rx, y],
        ['A', rx, ry, 0, 0, 0, x + rx, y],
        ['A', rx, ry, 0, 0, 0, x - rx, y],
        ['z'],
      ];
      return new fabric.Path(d as any);
    };

    /** 转化类多边形形状 */
    const convertPolygonPath = (points: fabric.Point[]) => {
      const d: any = points.map((point) => ['L', point.x, point.y]);

      d[0][0] = 'M';

      if (type === 'polygon') {
        d.push('z');
      }

      return new fabric.Path(d);
    };

    /** 根据fabric元素类型进行转化 */
    switch (type) {
      case 'rect': {
        const {
          type,
          visible,
          width = 0,
          height = 0,
          x = 0,
          y = 0,
          rx = 0,
          ry = 0,
          ...rest
        } = (svg as fabric.Rect).toJSON() as Record<string, any>;

        path = convertRectPath({
          w: width,
          h: height,
          x,
          y,
          rx,
          ry,
        });

        path.set(rest);

        break;
      }
      case 'circle': {
        const {
          type,
          visible,
          x = 0,
          y = 0,
          radius: r = 0,
          ...rest
        } = svg as fabric.Circle & { x: number; y: number };

        path = convertEllipsePath({
          x,
          y,
          rx: r,
          ry: r,
        });

        path.set(rest);

        break;
      }
      case 'ellipse': {
        const {
          type,
          visible,
          x = 0,
          y = 0,
          rx = 0,
          ry = 0,
          ...rest
        } = svg as fabric.Ellipse & { x: number; y: number };

        path = convertEllipsePath({
          x,
          y,
          rx,
          ry,
        });

        path.set(rest);

        break;
      }
      case 'line': {
        const {
          type,
          visible,
          x1 = 0,
          x2 = 0,
          y1 = 0,
          y2 = 0,
          ...rest
        } = svg as fabric.Line;

        path = convertPolygonPath([
          new fabric.Point(x1, y1),
          new fabric.Point(x2, y2),
        ]);

        path.set(rest);

        break;
      }
      case 'polygon':
      case 'polyline': {
        const {
          type,
          visible,
          points = [],
          ...rest
        } = svg as fabric.Polygon | fabric.Polyline;

        path = convertPolygonPath(points);

        path.set(rest);

        break;
      }
      case 'path': {
        path = svg as fabric.Path;
        break;
      }
      default:
        break;
    }

    return path;
  };

  try {
    /** 保存部分形状的偏移属性值,直接生成的fabric对象不会记录相关信息 */
    const storeShapeSourceData = (element: SVGElement, object: any) => {
      if (object.type === 'circle' || object.type === 'ellipse') {
        object.set({
          x: Number(element.getAttribute('cx')),
          y: Number(element.getAttribute('cy')),
        });
      } else if (object.type === 'rect') {
        object.set({
          x: Number(element.getAttribute('x')),
          y: Number(element.getAttribute('y')),
        });
      }
    };
    const svgPromise = new Promise<fabric.Group | fabric.Object>((resolve) => {
      fabric.loadSVGFromURL(
        url,
        (objects) => {
          resolve(fabric.util.groupSVGElements(objects));
        },
        storeShapeSourceData
      );
    });

    const svg = await svgPromise;

    return shapeToPath(svg);
  } catch (error) {
    console.log(error);
  }
};

export default loadSVGToPathFromURL;
