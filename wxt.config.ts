import {defineConfig} from 'wxt';
import vue from '@vitejs/plugin-vue';

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
        name: "香草布丁🌿🍮",
        description: "香草布丁（vanillaJs补丁）是一个用户脚本管理器",
        minimum_chrome_version: "120",
        permissions: [
            "storage",
            "userScripts",
        ],
        host_permissions: [
            "<all_urls>"
        ],
    },
    vite: () => ({
        plugins: [vue()],
        build: {
            // Enabling sourcemaps with Vue during development is known to cause problems with Vue
            sourcemap: false,
        },
    }),
});
