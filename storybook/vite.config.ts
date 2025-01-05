import type { PluginOption } from 'vite';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import glob from 'fast-glob';

const componentsDirPath = resolve(__dirname, '..', 'packages', 'ui', 'components');
const individualComponentDirPaths = glob.sync('**', {
    cwd: componentsDirPath,
    deep: 1,
    onlyDirectories: true
});

individualComponentDirPaths.sort((a, b) => (a.includes(b) ? -1 : a.localeCompare(b)));

const aliases = [
    { find: /^inkline/, replacement: 'inkline/src' },
    { find: /^@inkline\/config/, replacement: 'engine/config/src' },
    { find: /^@inkline\/core/, replacement: 'engine/core/src' },
    { find: /^@inkline\/generator/, replacement: 'engine/generator/src' },
    { find: /^@inkline\/framework/, replacement: 'integrations/framework/src' },
    { find: /^@inkline\/composables/, replacement: 'ui/composables/src' },
    { find: /^@inkline\/components/, replacement: 'ui/components/bundle/src' },
    { find: /^@inkline\/i18n/, replacement: 'ui/i18n/src' },
    { find: /^@inkline\/theme/, replacement: 'ui/theme/src' },
    { find: /^@inkline\/types/, replacement: 'ui/types/src' },
    { find: /^@inkline\/validation/, replacement: 'ui/validation/src' },
    { find: /^@inkline\/vue/, replacement: 'ui/vue/src' }
];

export default defineConfig({
    plugins: [ignoreComponentsCss(), vue()],
    resolve: {
        alias: [
            ...aliases.map((alias) => ({
                find: alias.find,
                replacement: resolve(__dirname, '..', 'packages', alias.replacement)
            })),
            ...individualComponentDirPaths.flatMap((component) => [
                {
                    find: new RegExp(`^@inkline/component-${component}`),
                    replacement: resolve(componentsDirPath, component, 'src')
                }
            ])
        ]
    }
});

/**
 * Ignore CSS files from components directory
 *
 * Each component imports its own CSS file to be bundled with the component.
 * Because we're referencing the source file directly, we need this plugin to ignore the CSS files
 * from the components to prevent styles from being loaded twice.
 */
function ignoreComponentsCss(): PluginOption {
    return {
        name: 'ignore-components-css',
        transform(_code, id) {
            if (/packages\/ui\/components\/.+\/src\/index.css/.test(id)) {
                return '.noop {}';
            }
        }
    };
}
