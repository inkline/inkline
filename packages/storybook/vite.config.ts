import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import inkline from '@inkline/plugin/vite';
import { resolve } from 'path';

const inklineDir = resolve(__dirname, '..', 'inkline');

export default defineConfig({
    plugins: [
        inkline({
            configFile: resolve(inklineDir, 'inkline.config.ts'),
            outputDir: resolve(__dirname, 'src', 'theme')
        }),
        vue()
    ],
    resolve: {
        alias: [
            {
                find: /^@inkline\/inkline$/,
                replacement: resolve(inklineDir, 'src', 'main.ts')
            },
            {
                find: /^@inkline\/inkline\//,
                replacement: resolve(inklineDir, 'src') + '/'
            }
        ]
    }
});
