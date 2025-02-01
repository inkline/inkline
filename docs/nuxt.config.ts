import path from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxt/content', '../packages/integrations/framework/src/nuxt.ts'],
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    inkline: {
        outputDir: path.resolve(__dirname, 'theme')
    }
});
