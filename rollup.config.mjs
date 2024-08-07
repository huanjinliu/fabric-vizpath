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
import cleanup from 'rollup-plugin-cleanup';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import { visualizer } from 'rollup-plugin-visualizer';
import postcssLess from 'postcss-less';

const build_umd = () => {
  const config = {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.min.js',
        format: 'umd',
        sourcemap: true,
        name: 'FabricVizPath',
        globals: {
          fabric: 'fabric',
        },
      },
    ],
    external: ['fabric'],
    plugins: [
      clean({ targets: ['dist'] }),
      resolve(),
      commonjs(),
      json(),
      typescript({
        declaration: false,
        exclude: ['src/example/**/*'],
      }),
      babel({
        babelHelpers: 'bundled',
      }),
      cleanup({
        comments: 'none',
      }),
      terser(),
    ],
    onwarn: (warning, warn) => {
      if (warning.code === 'CIRCULAR_DEPENDENCY') return;
      warn(warning);
    },
  };
  if (process.env.NODE_ENV === 'production') {
    config.plugins.push(visualizer());
  }
  return config;
};

const build_es_lib = () => ({
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.es.js',
      format: 'es',
    },
  ],
  external: ['fabric'],
  plugins: [
    resolve(),
    commonjs(),
    json(),
    typescript({
      exclude: ['src/example/**/*'],
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
    external: ['fabric'],
    plugins: [
      resolve(),
      commonjs(),
      json(),
      typescript({
        declaration: false,
        exclude: ['src/example/**/*'],
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

function markdownPlugin() {
  return {
    name: 'markdown-plugin',
    transform(code, id) {
      if (id.endsWith('.md')) {
        const markdownContent = fs.readFileSync(id, 'utf-8');
        return `export default ${JSON.stringify(markdownContent)};`;
      }
    },
  };
}

const build_serve = () => {
  const config = {
    input: 'src/example/index.tsx',
    output: [
      {
        file: 'docs/index.js',
        format: 'iife',
        globals: {
          fabric: 'fabric',
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    ],
    external: ['fabric', 'react', 'react-dom'],
    plugins: [
      resolve({
        browser: true,
        preferBuiltins: false,
      }),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.BROWSER': JSON.stringify(true),
      }),
      commonjs(),
      markdownPlugin(),
      json(),
      typescript({
        declaration: false,
      }),
      postcss({
        syntax: postcssLess,
        namedExports: (id) => id.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase()),
        extensions: ['.css', '.less'],
        minimize: true,
        modules: true,
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
  umd: process.env.NODE_ENV === 'production' ? build_umd() : undefined,
  es_lib: build_es_lib(),
  es_theme: build_es_theme(),
  serve: process.env.NODE_ENV === 'development' ? build_serve() : undefined,
};

export default Object.values(configs).filter(Boolean);
