import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

/**
 * Vite configuration for library build
 *
 * @doc https://vitejs.dev/config/
 */
export default defineConfig({
    plugins: [
        vue({
            include: [/\.vue$/, /\.md$/]
        })
    ],
    resolve: {
        alias: [
            {
                find: /^@inkline\/inkline$/,
                replacement: `${resolve(__dirname)}/src/inkline.ts`
            },
            {
                find: /^@inkline\/inkline\//,
                replacement: `${resolve(__dirname)}/src/`
            }
        ]
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
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/__tests__/setup.ts'],
        include: ['src/**/*.spec.ts', 'scripts/**/*.spec.ts'],
        coverage: {
            provider: 'v8',
            include: ['src/**/*.ts', 'src/**/*.vue'],
            exclude: [
                '**/__mocks__/*',
                '**/__tests__/*',
                '**/stories/*',
                '**/examples/*',
                '**/manifest.ts',
                '**/__storybook__'
            ],
            reporter: ['text', 'json', 'html', 'lcov']
        }
    },
    optimizeDeps: {
        exclude: ['coverage', 'dist', 'lib', 'package', 'scripts']
    }
});
