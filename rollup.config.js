import { resolve } from 'path'

import svelte from 'rollup-plugin-svelte'
import nodeResolve from 'rollup-plugin-node-resolve'

import prerender from './plugins/prerender'

const production = !process.env.ROLLUP_WATCH

function normalizePath(dir) {
  return resolve(__dirname, dir)
}

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'esm',
    preferConst: true,
    file: 'public/bundle.js'
  },
  plugins: [
    svelte({
      dev: !production,
      css: css => css.write('public/bundle.css')
    }),
    nodeResolve({
      browser: true,
      modulesOnly: true,
      dedupe: importee =>
        importee === 'svelte' || importee.startsWith('svelte/')
    }),
    prerender({
      staticDir: normalizePath('public'),
      routes: ['/']
    })
  ],
  watch: {
    clearScreen: false
  }
}
