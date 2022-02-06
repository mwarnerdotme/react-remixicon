import resolve from '@rollup/plugin-node-resolve'
import commonjs from "@rollup/plugin-commonjs"
import typescript from '@rollup/plugin-typescript'
import svgr from '@svgr/rollup'

export default {
  input: 'src/index.ts',
  output: [
    {
      name: '@mwarnerdotme/react-remixicon',
      format: 'cjs',
      file: 'dist/index.js'
    },
  ],
  external: [ 'react', 'remixicon' ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json'  }),
    svgr({
      typescript: true,
    }),
  ]
}