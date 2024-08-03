import type { WxtViteConfig } from 'wxt'
import { defineConfig } from 'wxt'
import vue from '@vitejs/plugin-vue'
import type { UserConfig } from 'vite'

// See https://wxt.dev/api/config.html
export default defineConfig({
  imports: {
    addons: {
      vueTemplate: true,
    },
  },
  experimental: {
    includeBrowserPolyfill: true,
  },
  runner: {
    disabled: true,
  },
  manifest: {
    name: '香草布丁🌿🍮',
    description: '香草布丁（vanillaJs补丁）是一个用户脚本管理器',
    minimum_chrome_version: '120',
    permissions: [
      'storage',
      'userScripts',
      'activeTab',
      'background',
      'declarativeNetRequest',
      'declarativeNetRequestFeedback',
      'cookies',
      'downloads',
      'unlimitedStorage',
    ],
    host_permissions: [
      '<all_urls>',
    ],
  },
  vite: ({ mode }) => {
    const isDev = mode === 'development'

    function createMinifyOptions(): any {
      if (!isDev) {
        return {
          minify: 'terser',
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log'],
            },
          },
        }
      }
      return {}
    }

    return {
      plugins: [vue()],
      build: {
        modulePreload: {
          polyfill: false,
        },
        ...createMinifyOptions(),
        target: 'esnext',
        // Enabling sourcemaps with Vue during development is known to cause problems with Vue
        sourcemap: false,
      },
    } as UserConfig as WxtViteConfig
  },
})
