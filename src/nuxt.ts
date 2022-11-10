import { defineNuxtModule, addPluginTemplate, addComponentsDir } from '@nuxt/kit';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { PluginConfig } from '@inkline/inkline';
import { NuxtModule } from '@nuxt/schema';
import { UserOptions } from './plugin/types';
import {watch} from "./plugin/watch";
import {build} from "./plugin/build";

interface ModuleConfig {
    css?: boolean;
    global?: boolean;
}

export const module: NuxtModule<PluginConfig & ModuleConfig & UserOptions> = defineNuxtModule({
    meta: {
        name: '@inkline/nuxt',
        version: '3',
        configKey: 'inkline',
        compatibility: {
            nuxt: '>=2.0.0',
            bridge: true
        }
    },
    async setup ({ css, global, configFile, outputDir, extName, ...moduleOptions }, nuxt) {
        const pluginOptions: UserOptions = { configFile, outputDir, extName };
        const templatesDir = fileURLToPath(new URL('./templates', import.meta.url));
        const inklineRequire = createRequire(import.meta.url);

        // Add CSS imports
        if (css !== false) {
            nuxt.options.css = [
                '@inkline/inkline/inkline.scss'
            ].concat(nuxt.options.css || []);
        }

        // Add to transpile
        nuxt.options.build.transpile.push('@inkline/inkline');

        // Add plugin template
        addPluginTemplate({
            src: resolve(templatesDir, 'nuxt.ejs'),
            options: moduleOptions
        });

        // Add dynamic component imports
        await addComponentsDir({
            path: join(dirname(inklineRequire.resolve('@inkline/inkline')), 'components'),
            pathPrefix: false,
            pattern: '**/*.vue',
            ignore: ['**/examples/*.vue'],
            transpile: true,
            global: global !== false
        });

        if (nuxt.options.dev) {
            watch(pluginOptions);
        } else {
            build(pluginOptions);
        }
    }
});

export default module;
