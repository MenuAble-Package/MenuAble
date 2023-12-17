import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  plugins: [terser(), typescript()],
  output: [
    {
      name: 'menually',
      file: pkg.browser,
      format: 'umd',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
};
