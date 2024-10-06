import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import inkline from '@inkline/plugin/vite';
import { resolve } from 'path';

const vueDir = resolve(__dirname, '..', 'vue');

export default defineConfig({
    plugins: [
        inkline({
            configFile: resolve(vueDir, 'inkline.config.ts'),
            outputDir: resolve(__dirname, 'src', 'theme')
        }),
        vue()
    ],
    resolve: {
        alias: [
            {
                find: /^@inkline\/inkline$/,
                replacement: resolve(vueDir, 'src', 'main.ts')
            },
            {
                find: /^@inkline\/inkline\//,
                replacement: resolve(vueDir, 'src') + '/'
            }
        ]
    }
});
