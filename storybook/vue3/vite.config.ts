import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: [
            {
                find: /^@inkline\/inkline(.*)/,
                replacement: resolve(__dirname, '..', '..', 'src$1')
            },
            {
                find: /^@inkline\/paper(.*)/,
                replacement: resolve(__dirname, '..', '..', 'node_modules', '@inkline', 'paper', 'vue$1')
            }
        ]
    }
});
