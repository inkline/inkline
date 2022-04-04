import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            {
                find: /^@inkline\/inkline(.*)/,
                replacement: resolve(__dirname, '..', '..', 'src$1')
            },
            {
                find: /^@inkline\/paper(.*)/,
                replacement: resolve(__dirname, '..', '..', '..', 'paper', 'packages', 'react', 'src$1')
            }
        ]
    },
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
        jsxInject: ''
    }
});
