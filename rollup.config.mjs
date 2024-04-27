import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import terser from '@rollup/plugin-terser';

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
});

const build_es = () => ({
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.es.js',
      format: 'es',
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
});

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
      })
    );
  }
  return config;
};

const configs = {
  umd: build_umd(),
  es: build_es(),
  serve: process.env.ENV === 'dev' ? build_serve() : undefined,
};

export default Object.values(configs).filter(Boolean);
