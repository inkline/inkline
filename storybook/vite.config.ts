import { defineConfig } from 'vite';
import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import inkline from '@inkline/vite';
import { resolve } from 'path';
import glob from 'fast-glob';

const componentsDirPath = resolve(__dirname, '..', 'packages', 'ui', 'components');
const individualComponentDirPaths = glob.sync('**', {
    cwd: componentsDirPath,
    deep: 1,
    onlyDirectories: true
});

individualComponentDirPaths.sort((a, b) => (a.includes(b) ? -1 : a.localeCompare(b)));

export default defineConfig({
    plugins: [
        ignoreComponentsCss(),
        inkline({
            outputDir: resolve(__dirname, 'src', 'css')
        }),
        vue()
    ],
    resolve: {
        alias: [
            {
                find: /^inkline/,
                replacement: resolve(__dirname, '..', 'packages', 'inkline', 'src')
            },
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
