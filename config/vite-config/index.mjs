import { resolve } from 'path';
import { defineConfig, mergeConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import inkline from '@inkline/plugin/vite';
import postcss from '@inkline/postcss-config';
import { configDefaults as vitestConfig } from 'vitest/config';

export const aliases = [
    // Root
    { find: /^inkline/, replacement: 'inkline/src' },

    // Common
    { find: /^@inkline\/types/, replacement: 'common/types/src' },

    // Engine
    { find: /^@inkline\/config/, replacement: 'engine/config/src' },
    { find: /^@inkline\/core/, replacement: 'engine/core/src' },
    { find: /^@inkline\/generator/, replacement: 'engine/generator/src' },
    { find: /^@inkline\/variants/, replacement: 'engine/variants/src' },

    // Plugin
    { find: /^@inkline\/plugin/, replacement: 'plugin/src' },

    // Theme
    { find: /^@inkline\/theme/, replacement: 'theme/src' },

    // UI
    { find: /^@inkline\/composables/, replacement: 'ui/composables/src' },
    { find: /^@inkline\/i18n/, replacement: 'ui/i18n/src' },
    { find: /^@inkline\/validation/, replacement: 'ui/validation/src' },
    { find: /^@inkline\/variants/, replacement: 'ui/variants/src' },
    { find: /^@inkline\/vue/, replacement: 'ui/vue/src' }
];

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
