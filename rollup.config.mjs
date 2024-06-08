import path from 'path';
import fs from 'fs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import clean from 'rollup-plugin-clear';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const build_umd = () => ({
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'umd',
      sourcemap: true,
      name: 'FabricPathEditor',
      globals: {
        fabric: 'fabric',
      },
    },
  ],
  plugins: [
    resolve(),
    peerDepsExternal(),
    commonjs(),
    json(),
    typescript({
      exclude: ['src/example/*'],
    }),
    babel({
      babelHelpers: 'bundled',
    }),
    terser(),
  ],
  onwarn: (warning, warn) => {
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    warn(warning);
  },
});

const build_es_lib = () => ({
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.es.js',
      format: 'es',
    },
  ],
  plugins: [
    clean({ targets: ['dist'] }),
    resolve(),
    peerDepsExternal(),
    commonjs(),
    json(),
    typescript({
      declaration: false,
      exclude: ['src/example/*'],
    }),
    babel({
      babelHelpers: 'bundled',
    }),
  ],
  onwarn: (warning, warn) => {
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    warn(warning);
  },
});

const build_es_theme = () => {
  const themeBaseDir = 'src/themes';
  const themes = fs.readdirSync(path.resolve(themeBaseDir));
  const inputs = themes.reduce((map, theme) => {
    const themeEntranceFile = `${themeBaseDir}/${theme}/index.ts`;
    if (fs.existsSync(path.join(process.cwd(), themeEntranceFile))) {
      map[`themes/${theme}/index`] = themeEntranceFile;
    }
    return map;
  }, {});
  return {
    input: inputs,
    output: {
      dir: 'dist',
      format: 'es',
      preserveModules: true,
    },
    plugins: [
      resolve(),
      peerDepsExternal(),
      commonjs(),
      json(),
      typescript({
        declaration: false,
        exclude: ['src/example/*'],
      }),
      babel({
        babelHelpers: 'bundled',
      }),
    ],
    onwarn: (warning, warn) => {
      if (warning.code === 'CIRCULAR_DEPENDENCY') return;
      warn(warning);
    },
  };
};

const build_serve = () => {
  const config = {
    input: 'src/example/index.ts',
    output: [
      {
        file: 'docs/index.js',
        format: 'iife',
        globals: {
          fabric: 'fabric',
        },
      },
    ],
    plugins: [
      resolve(),
      peerDepsExternal(),
      commonjs(),
      json(),
      typescript({
        declaration: false,
      }),
      babel({
        babelHelpers: 'bundled',
      }),
    ],
    onwarn: (warning, warn) => {
      if (warning.code === 'CIRCULAR_DEPENDENCY') return;
      warn(warning);
    },
  };
  if (process.env.ROLLUP_WATCH) {
    config.plugins.push(
      serve({
        open: true,
        contentBase: 'docs/',
        verbose: true,
      }),
      livereload({
        watch: ['docs'],
        verbose: false,
      }),
    );
  }
  return config;
};

const configs = {
  umd: build_umd(),
  es_lib: build_es_lib(),
  es_theme: build_es_theme(),
  serve: process.env.ENV === 'dev' ? build_serve() : undefined,
};

export default Object.values(configs).filter(Boolean);
