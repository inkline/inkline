import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import markdown from 'vite-plugin-md';

const html = () => ({
    name: 'html',
    test: ({ path }) => path.endsWith('.html'),
    transform (code, id) {
        if (/\.html$/.test(id)) {
            return `export default ${JSON.stringify(code)}`
        }
    }
});

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            include: [
                /\.vue$/,
                /\.md$/
            ]
        }),
        markdown(),
        html()
    ],
    resolve: {
        alias: [
            {
                find: /^@inkline\/inkline\//,
                replacement: `${resolve(__dirname)}/`
            }
        ],
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/inkline.js'),
            name: 'Inkline'
        },
        rollupOptions: {
            external: ['vue']
        }
    }
});
