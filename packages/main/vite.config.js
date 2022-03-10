import { join, posix } from 'path'
import { builtinModules } from 'module'
import copy from 'rollup-plugin-copy'
import { node } from '../../.electron-vendors.cache.json'

const PACKAGE_ROOT = __dirname.replaceAll('\\', '/')

console.log('DIR', posix.join(PACKAGE_ROOT, 'src', 'callback.html'))

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = {
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  envDir: process.cwd(),
  resolve: {
    alias: {
      '/@/': `${join(PACKAGE_ROOT, 'src')}/`,
    },
  },
  build: {
    sourcemap: 'inline',
    target: `node${node}`,
    outDir: 'dist',
    assetsDir: '.',
    minify: process.env.MODE !== 'development',
    lib: {
      entry: 'src/index.ts',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: [
        'electron',
        'electron-devtools-installer',
        ...builtinModules.flatMap(p => [p, `node:${p}`]),
      ],
      output: {
        entryFileNames: '[name].cjs',
      },
      plugins: [ ],
    },
    emptyOutDir: true,
    brotliSize: false,
  },
}

export default config
