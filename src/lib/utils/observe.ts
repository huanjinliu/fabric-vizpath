import cloneDeep from 'lodash-es/cloneDeep';

/**
 * 注册响应式
 */
const observe = <T extends Record<string, any>>(
  point: T,
  keys: (keyof T)[],
  callback: (
    value: Pick<T, ArrayElement<typeof keys>>,
    oldValue: Pick<T, ArrayElement<typeof keys>>
  ) => void,
  immediate = false,
) => {
  const data: any = {};
  const properties: PropertyDescriptorMap = {};

  keys.forEach((key) => {
    data[key] = point[key];
    properties[key] = {
      get: () => data[key],
      set: (value: number) => {
        if (data[key] === value) return;
        const oldValue = cloneDeep(data);
        data[key] = value;
        callback(data, oldValue);
      },
    };
  });

  Object.defineProperties(point, properties);

  if (immediate) callback(data, data);
};

export default observe;
