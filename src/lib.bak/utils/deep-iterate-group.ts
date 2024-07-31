/**
 * 深度遍历对象
 */
const deepIterateGroup = (
  target: fabric.Group | fabric.Object,
  callback: (object: fabric.Group | fabric.Object) => void,
) => {
  callback(target);
  if (target.type === 'group') {
    (target as fabric.Group).forEachObject((object) => {
      deepIterateGroup(object, callback);
    });
  }
};

export default deepIterateGroup;
