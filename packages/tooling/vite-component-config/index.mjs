import { resolve } from 'path';
import { defineConfig, mergeConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import inkline from '@inkline/vite';
import postcss from '@inkline/postcss-config';
import { configDefaults as vitestConfig } from 'vitest/config';

/**
 * Convert a string to PascalCase.
 *
 * @param str {string}
 * @returns {string}
 */
export function toPascalCase(str) {
    return str
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}

/**
 * Define a Vite configuration for a component.
 *
 * @param componentName {string}
 * @param overrides {UserConfig}
 * @returns {UserConfig}
 */
export function defineComponentConfig(componentName, overrides = {}) {
    // eslint-disable-next-line no-undef
    const cwd = process.cwd();

    return mergeConfig(
        defineConfig({
            plugins: [
                inkline({
                    outputDir: resolve(cwd, 'src', 'css')
                }),
                vue(),
                dts({ rollupTypes: true })
            ],
            build: {
                lib: {
                    entry: resolve(cwd, 'src', 'index.ts'),
                    name: `InklineComponent${toPascalCase(componentName)}`,
                    fileName: componentName
                },
                rollupOptions: {
                    external: ['vue'],
                    output: {
                        globals: {
                            vue: 'Vue'
                        }
                    }
                }
            },
            css: {
                postcss: postcss({
                    safelist: [new RegExp(componentName)]
                })
            },
            test: {
                globals: true,
                environment: 'jsdom',
                setupFiles: ['src/__tests__/setup.ts'],
                include: ['src/**/*.spec.{ts,tsx}'],
                exclude: vitestConfig.exclude
            }
        }),
        overrides
    );
}
