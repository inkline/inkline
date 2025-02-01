import components from './resources/components';
import { createResolver, defineNuxtModule, addPluginTemplate, addComponent } from '@nuxt/kit';
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
    setup({ import: importOptions, configFile, outputDir, extName, globals }, nuxt) {
        const resolver = createResolver(import.meta.url);
        const templatesDir = resolver.resolve('./templates');
        const templatePath = resolver.resolve(templatesDir, 'nuxt.ejs');

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

        // Add CSS imports
        if (importOptions.styles !== false) {
            nuxt.options.css = nuxt.options.css || [];
            nuxt.options.css.unshift(`${resolvedPluginOptions.outputDir}/index.css`);
        }

        // Add plugin template
        if (importOptions.scripts !== false) {
            addPluginTemplate({
                mode: 'all',
                src: templatePath,
                write: true,
                filename: 'inkline.mjs',
                options: globals || {}
            });
        }

        // Add dynamic component imports
        components.forEach((entry) => {
            addComponent({
                ...entry,
                global: importOptions.mode === 'global'
            });
        });

        // Watch or build Inkline config
        if (nuxt.options.dev) {
            void watch(pluginOptions);
        } else {
            void build(pluginOptions);
        }
    }
});

export default inkline;
