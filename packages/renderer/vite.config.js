/* eslint-env node */

import { join } from 'path'
import { builtinModules } from 'module'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { chrome } from '../../.electron-vendors.cache.json'

const PACKAGE_ROOT = __dirname

const componentOptions = {
  // allow auto load markdown components under `./src/components/`
  extensions: ['vue'],

  // allow auto import and register components used in markdown
  include: [/\.vue$/, /\.vue\?vue/],

  // custom resolvers
  resolvers: [
    // auto import icons
    // https://github.com/antfu/unplugin-icons
    IconsResolver({
      componentPrefix: '',
      // enabledCollections: ['carbon']
    }),
  ],

  dts: 'src/components.d.ts',
}

const importOptions = {
  imports: [
    'vue',
    'vue-router',
    '@vueuse/head',
    '@vueuse/core',
  ],
  dts: 'src/auto-imports.d.ts',
}

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = {
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  resolve: {
    alias: {
      '/@/': `${join(PACKAGE_ROOT, 'src')}/`,
    },
  },
  plugins: [
    vue(),
    WindiCSS(),
    Pages(),
    Layouts(),
    Components(componentOptions),
    AutoImport(importOptions),
    Icons({
      autoInstall: true,
    })],
  base: '',
  server: {
    fs: {
      strict: true,
    },
  },
  build: {
    sourcemap: true,
    target: `chrome${chrome}`,
    outDir: 'dist',
    assetsDir: '.',
    rollupOptions: {
      input: join(PACKAGE_ROOT, 'index.html'),
      external: [
        ...builtinModules.flatMap(p => [p, `node:${p}`]),
      ],
    },
    emptyOutDir: true,
    brotliSize: false,
  },
  test: {
    environment: 'happy-dom',
  },
}

export default config
