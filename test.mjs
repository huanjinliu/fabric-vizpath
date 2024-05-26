import path from 'path';
import fs from 'fs';
const themeBaseDir = 'src/themes';
const themes = fs.readdirSync(path.resolve(themeBaseDir));
console.log(themes.reduce((map, theme) => {
  map[`themes/${theme}/index`] = `${themeBaseDir}/${theme}/index.ts`;
  return map;
}, {}));