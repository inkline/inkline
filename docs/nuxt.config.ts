import path, { resolve } from 'path';
import TailwindCSS from '@tailwindcss/vite';
import { aliases } from '@inkline/vite-config';
import { contentFileBeforeParseHook } from './hooks';

const packagesDir = resolve(__dirname, '..', 'packages');
const componentsDir = resolve(packagesDir, 'ui', 'components');

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '../packages/integrations/framework/src/nuxt',
        '@nuxt/icon',
        '@nuxt/image',
        '@nuxtjs/i18n',
        '@nuxtjs/sitemap',
        '@vite-pwa/nuxt',
        '@nuxt/content'
    ],
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    /**
     * @docs https://nuxt.com/docs/api/configuration/nuxt-config#app
     */
    app: {
        /**
         * @docs https://nuxt.com/docs/api/configuration/nuxt-config#head
         */
        head: {
            title: 'Inkline',
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
                { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: 'black' }
            ],
            meta: [
                {
                    name: 'description',
                    content:
                        'Inkline is a modern, intuitive UI Component Library for Vue.js that helps developers build beautiful, accessible, and customizable Fluid Responsive Design Systems with exceptional developer experience.'
                },
                {
                    property: 'og:type',
                    content: 'website'
                },
                {
                    property: 'og:image',
                    content: 'https://www.inkline.io/assets/images/social/og-image.png'
                },
                {
                    name: 'twitter:site',
                    content: '@inkline'
                },
                {
                    name: 'twitter:creator',
                    content: '@alexgrozav'
                },
                {
                    name: 'twitter:card',
                    content: 'summary_large_image'
                }
            ]
        },
        /**
         * @docs https://nuxt.com/docs/getting-started/transitions
         */
        pageTransition: { name: 'page', mode: 'out-in' },
        layoutTransition: { name: 'layout', mode: 'out-in' }
    },
    /**
     * @docs https://content.nuxt.com/docs/getting-started/installation
     */
    content: {
        /**
         * @docs https://content.nuxt.com/docs/studio/setup
         */
        preview: {
            api: 'https://api.nuxt.studio',
            gitInfo: {
                name: 'inkline/inkline',
                owner: 'alexgrozav',
                url: 'https://github.com/alexgrozav'
            }
        }
    },
    css: ['~/css/index.css'],
    routeRules: {
        '/docs': { redirect: '/docs/introduction' },
        '/docs/getting-started': { redirect: '/docs/getting-started/vite' }
    },
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
                })),
                {
                    find: /@inkline\/component-(.+)\/components\/(.+)\/examples/,
                    replacement: resolve(
                        componentsDir,
                        '$1',
                        'src',
                        'components',
                        '$2',
                        'examples'
                    )
                },
                {
                    find: /@inkline\/component-(.+)\/examples/,
                    replacement: resolve(
                        componentsDir,
                        '$1',
                        'src',
                        'examples'
                    )
                }
            ]
        },
        plugins: [TailwindCSS()]
    },
    /**
     * @docs https://inkline.io/docs
     */
    inkline: {
        outputDir: path.resolve(__dirname, 'src', 'theme')
    },
    /**
     * @docs https://nuxt.com/modules/icon
     */
    icon: {
        componentName: 'AppIcon',
        class: 'app-icon',
        mode: 'css',
        serverBundle: {
            collections: ['uil', 'mdi']
        }
    },
    /**
     * @docs https://image.nuxt.com/get-started/configuration
     */
    image: {
        provider: 'ipx',
        domains: ['*.inkline.io', 'inkline.io']
    },
    /**
     * @docs https://i18n.nuxtjs.org/docs/getting-started
     */
    i18n: {},
    /**
     * @docs https://vite-pwa-org.netlify.app/
     */
    pwa: {
        registerType: 'autoUpdate',
        manifest: {
            name: 'Inkline',
            short_name: 'Inkline',
            theme_color: '#ffffff',
            icons: [
                {
                    src: 'pwa-192x192.png',
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    src: 'pwa-512x512.png',
                    sizes: '512x512',
                    type: 'image/png'
                },
                {
                    src: 'pwa-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'any maskable'
                }
            ]
        }
    },
    /**
     * @docs https://nuxtseo.com/site-config/getting-started/how-it-works
     */
    site: {
        url: 'https://www.inkline.io'
    },
    hooks: {
        'content:file:beforeParse': contentFileBeforeParseHook
    },
    telemetry: false,
    srcDir: 'src'
});
