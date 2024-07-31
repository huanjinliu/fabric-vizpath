import cloneDeep from 'lodash-es/cloneDeep';

type ArrayElement<A> = A extends (infer T)[] ? T : never;

/**
 * 注册响应式
 */
const observe = <T extends Record<string, any>>(
  target: T,
  keys: (keyof T)[],
  callback: (
    value: Pick<T, ArrayElement<typeof keys>>,
    oldValue?: Pick<T, ArrayElement<typeof keys>>,
  ) => void,
  immediate = false,
) => {
  const data: any = {};
  const properties: PropertyDescriptorMap = {};

  keys.forEach((key) => {
    data[key] = target[key];
    properties[key] = {
      enumerable: true,
      configurable: true,
      get: () => data[key],
      set: (value: number) => {
        if (data[key] === value) return;
        const oldValue = cloneDeep(data);
        data[key] = value;
        callback(data, oldValue);
      },
    };
  });

  Object.defineProperties(target, properties);

  if (immediate) callback(data);

  const unobserve = () => {
    keys.forEach((key) => {
      if (key in target) {
        delete target[key];
        target[key] = data[key];
      }
    });
  };

  return unobserve;
};

export default observe;
