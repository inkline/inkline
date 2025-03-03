import path, { resolve } from 'path';
import IconsResolver from 'unplugin-icons/resolver';
import ViteComponents from 'unplugin-vue-components/vite';
import { aliases } from '@inkline/vite-config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxt/content',
        'unplugin-icons/nuxt',
        '../packages/integrations/framework/src/nuxt'
    ],
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    inkline: {
        outputDir: path.resolve(__dirname, 'theme')
    },
    css: ['~/css/index.css'],
    imports: {
        transform: {
            exclude: [/components\/.+/]
        }
    },
    vite: {
        resolve: {
            alias: [
                ...aliases.map((alias) => ({
                    find: alias.find,
                    replacement: resolve(__dirname, '..', 'packages', alias.replacement)
                }))
            ]
        },
        plugins: [
            ViteComponents({
                resolvers: [
                    IconsResolver({
                        prefix: '',
                        strict: true
                    })
                ],
                dts: true
            })
        ]
    }
});
