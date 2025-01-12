import { defineNuxtModule, addPluginTemplate, addComponentsDir } from '@nuxt/kit';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import type { PluginUserOptions } from './plugin/types';
import { watch } from './plugin/watch';
import { build } from './plugin/build';
import { getResolvedBuildOptions } from '@inkline/config';

interface ModuleConfig {
    import?: {
        mode?: 'global' | 'auto';
        styles?: boolean;
        scripts?: boolean;
        utilities?: boolean;
    };
}

const defaultImportOptions: ModuleConfig['import'] = {
    mode: 'auto',
    styles: true,
    scripts: true,
    utilities: true
};

export type InklineModuleOptions = {
    globals: Record<string, unknown>;
} & ModuleConfig &
    PluginUserOptions;

export const inkline = defineNuxtModule<InklineModuleOptions>({
    meta: {
        name: '@inkline/nuxt',
        version: '3',
        configKey: 'inkline',
        compatibility: {
            nuxt: '>=2.0.0',
            bridge: true
        }
    },
    async setup({ import: importOptions, configFile, outputDir, extName, globals }, nuxt) {
        importOptions = {
            ...defaultImportOptions,
            ...importOptions
        };

        const pluginOptions: PluginUserOptions = {
            configFile,
            outputDir,
            extName
        };
        const resolvedPluginOptions = getResolvedBuildOptions(pluginOptions);

        const templatesDir = fileURLToPath(new URL('./templates', import.meta.url));
        const inklineRequire = createRequire(import.meta.url);

        // Add CSS imports
        if (importOptions.styles !== false) {
            nuxt.options.css = nuxt.options.css || [];

            nuxt.options.css.unshift(`${resolvedPluginOptions.outputDir}/index.css`);
            nuxt.options.css.unshift('inkline/dist/css/index.css');

            if (importOptions.utilities !== false) {
                nuxt.options.css.push('@inkline/vue/lib/css/utilities.scss');
            }
        }

        // Add to transpile
        nuxt.options.build.transpile.push('@inkline/vue');

        if (importOptions.scripts !== false) {
            // Add plugin template
            addPluginTemplate({
                mode: 'all',
                src: resolve(templatesDir, 'nuxt.ejs'),
                write: true,
                filename: 'inkline.mjs',
                options: globals || {}
            });
        }

        // Add dynamic component imports
        await addComponentsDir({
            path: join(dirname(inklineRequire.resolve('@inkline/vue')), 'components'),
            pathPrefix: false,
            pattern: '**/*.vue',
            ignore: ['**/examples/*.vue'],
            transpile: true,
            global: importOptions.mode === 'global'
        });

        if (nuxt.options.dev) {
            void watch(pluginOptions);
        } else {
            void build(pluginOptions);
        }
    }
});

export default inkline;
