/**
 * 解析fabric.Path对象toJSON返回对象
 * @param path fabric.Path对象
 */
const parsePathJSON = (path: fabric.Path) => {
  const data = path.toJSON() as fabric.IPathOptions;

  const layoutKeys = [
    'left',
    'top',
    'scaleX',
    'scaleY',
    'angle',
    'flipX',
    'flipY',
    'width',
    'height',
    'skewX',
    'skewY',
    'originX',
    'originY',
  ] as const;

  const styleKeys = [
    'fill',
    'stroke',
    'strokeWidth',
    'strokeDashArray',
    'strokeLineCap',
    'strokeDashOffset',
    'strokeLineJoin',
    'strokeUniform',
    'strokeMiterLimit',
    'opacity',
    'shadow',
    'backgroundColor',
    'fillRule',
    'paintFirst',
    'globalCompositeOperation',
  ] as const;

  const layout: Pick<typeof data, (typeof layoutKeys)[number]> = layoutKeys.reduce(
    (styles, key) => {
      styles[key] = data[key];
      return styles;
    },
    {},
  );

  const styles: Pick<typeof data, (typeof styleKeys)[number]> = styleKeys.reduce((styles, key) => {
    styles[key] = data[key];
    return styles;
  }, {});

  return { path: data.path, layout, styles };
};

export default parsePathJSON;
