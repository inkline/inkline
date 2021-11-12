import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import markdown from 'vite-plugin-md';

/**
 * Vite configuration for library build
 *
 * @doc https://vitejs.dev/config/
 */
export default defineConfig({
    plugins: [
        vue({
            include: [
                /\.vue$/,
                /\.md$/
            ]
        }),
        markdown()
    ],
    resolve: {
        alias: [
            {
                find: /^@inkline\/inkline\//,
                replacement: `${resolve(__dirname)}/src/`
            },
            // Replacement used in .scss when importing files from node_modules using ~ pattern
            {
                find: /^~@inkline\/icons/,
                replacement: '@inkline/icons'
            }
        ]
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src', 'inkline.ts'),
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
    },
    optimizeDeps: {
        exclude: [
            'coverage',
            'dist',
            'lib',
            'package',
            'scripts'
        ]
    }
});
