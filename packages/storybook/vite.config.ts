import { defineConfig } from 'vite';
import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import inkline from '@inkline/vite';
import { resolve } from 'path';
import glob from 'fast-glob';

const componentDirs = glob.sync('**', {
    cwd: resolve(__dirname, '..', 'components'),
    deep: 1,
    onlyDirectories: true
});

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
                replacement: resolve(__dirname, '..', 'inkline', 'src')
            },
            ...componentDirs.flatMap((component) => [
                {
                    find: new RegExp(`^@inkline/component-${component}`),
                    replacement: resolve(__dirname, '..', 'components', component, 'src')
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
            if (/packages\/components\/.+\/src\/index.css/.test(id)) {
                return '.noop {}';
            }
        }
    };
}
