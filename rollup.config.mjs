import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import svgr from '@svgr/rollup'

const name = '@mwarnerdotme/react-remixicon'
const globals = {
  react: 'React',
}

export default {
  input: 'src/index.ts',
  output: [
    {
      name,
      globals,
      format: 'umd',
      file: 'dist/index.js',
    },
    {
      name,
      globals,
      format: 'es',
      file: 'dist/index.es.js',
    },
  ],
  external: ['react'],
  plugins: [
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    svgr({
      typescript: true,
    }),
  ],
}
