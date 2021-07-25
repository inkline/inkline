import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import markdown from 'vite-plugin-md';
import eslint from 'vite-plugin-eslint';

function html() {
    return {
        name: 'html',
        transform (code, id) {
            if (/\.html$/.test(id)) {
                return `export default ${JSON.stringify(code)}`
            }
        }
    };
}

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
        html(),
        eslint()
    ],
    resolve: {
        alias: [
            {
                find: /^@inkline\/inkline\//,
                replacement: `${resolve(__dirname)}/`
            }
        ]
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src', 'inkline.js'),
            name: 'Inkline'
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['vue'],
            output: {
                exports: 'named',
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: 'Vue'
                }
            }
        }
    }
});
