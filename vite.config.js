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
        setupFiles: ['./vitest.setup.js'],
        include: [
            // 'src/constants/**/*.spec.ts',
            // 'src/components/IAlert/**/*.spec.ts',
            // 'src/components/IBadge/**/*.spec.ts',
            // 'src/components/IBreadcrumb/**/*.spec.ts',
            // 'src/components/IBreadcrumbItem/**/*.spec.ts',
            // 'src/components/IButton/**/*.spec.ts',
            // 'src/components/IButtonGroup/**/*.spec.ts',
            // 'src/components/ICard/**/*.spec.ts',
            // 'src/components/ICheckbox/**/*.spec.ts',
            // 'src/components/ICheckboxGroup/**/*.spec.ts'
            // 'src/components/ICollapsible/**/*.spec.ts',
            // 'src/components/ICollapsibleItem/**/*.spec.ts',
            // 'src/components/IColumn/**/*.spec.ts',
            // 'src/components/IContainer/**/*.spec.ts',
            // 'src/components/IDropdown/**/*.spec.ts',
            // 'src/components/IDropdownDivider/**/*.spec.ts',
            // 'src/components/IDropdownItem/**/*.spec.ts',
            // 'src/components/IExpandTransition/**/*.spec.ts',
            'src/components/IForm/**/*.spec.ts',
            'src/components/IFormError/**/*.spec.ts'
            // 'src/composables/**/*.spec.ts',
            // 'src/controllers/**/*.spec.ts',
            // 'src/i18n/**/*.spec.ts',
            // 'src/utils/**/*.spec.ts',
            // 'src/validation/**/*.spec.ts'
        ],
        coverage: {
            exclude: ['**/__mocks__/*'],
            reporter: ['text', 'json', 'html', 'lcov']
        }
    },
    optimizeDeps: {
        exclude: ['coverage', 'dist', 'lib', 'package', 'scripts']
    }
});
