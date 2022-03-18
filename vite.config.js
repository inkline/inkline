import { defineConfig } from 'vite';
import { resolve } from 'path';
// import vue from '@vitejs/plugin-vue';
// import markdown from 'vite-plugin-md';

const framework = process.env.VITE_FRAMEWORK || 'vue';

/**
 * Vite configuration for library build
 *
 * @doc https://vitejs.dev/config/
 */
export default defineConfig({
    plugins: [
        // vue({
        //     include: [
        //         /\.vue$/,
        //         /\.md$/
        //     ]
        // }),
        // markdown()
    ],
    resolve: {
        alias: [
            {
                find: /^@inkline\/inkline(.*)/,
                replacement: `${resolve(__dirname)}/src$1`
            },
            {
                find: /^@inkline\/paper(.*)/,
                replacement: `${resolve(__dirname)}/node_modules/@inkline/paper/${framework}$1`
            }
        ]
    },
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
        jsxInject: 'import { h, Fragment } from \'@inkline/paper\';'
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src', 'main.ts'),
            name: 'Inkline',
            fileName: (format) => `inkline.${format}.js`
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
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./vitest.setup.js'],
        include: ['src/components/IBadge/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
    }
});
