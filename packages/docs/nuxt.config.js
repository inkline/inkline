import path from 'path';

export default {
    mode: 'universal',
    target: 'static',

    server: {
        port: 8080
    },

    /*
    ** Headers of the page
    */
    head: {
        title: '%s - Inkline',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
            { name: 'keywords', content: 'inkline, vue, vue 2, vue 3, vue.js, vue components, customizable, components, framework, ui, ux' },
            { hid: 'description', name: 'description', content: 'Inkline is the customizable Vue.js UI/UX Library, designed for creating flawless content-rich responsive web applications.' },
            { name: 'msapplication-TileColor', content: '#ffffff' },
            { name: 'msapplication-TileImage', content: '/favicon/ms-icon-144x144.png' },
            { name: 'theme-color', content: '#ffffff' },
            { hid: 'og:type', property: 'og:type', content: 'website' },
            { hid: 'og:site_name', property: 'og:site_name', content: 'Inkline' },
            { hid: 'og:type', property: 'og:type', content: 'website' },
            { hid: 'og:image', property: 'og:image', content: 'https://inkline.io/images/pages/index.og.jpg' },
            { hid: 'twitter:creator', property: 'twitter:creator', content: '@inkline' },
            {
                type: 'application/ld+json',
                json: {
                    '@context': 'https://schema.org',
                    '@type': 'WebSite',
                    publisher: {
                        '@type': 'Organization',
                        name: 'Inkline - Vue.js UI/UX Library',
                        url: 'https://inkline.io/',
                        logo: {
                            '@type': 'ImageObject',
                            url: {
                                '@type': 'ImageObject',
                                url: 'https://inkline.io/images/logo-80.png',
                                width: 67,
                                height: 80
                            }
                        }
                    },
                    url: 'https://inkline.io/',
                    mainEntityOfPage: {
                        '@type': 'WebPage',
                        '@id': 'https://inkline.io/'
                    },
                    description: 'Inkline is the customizable Vue.js UI/UX Library, designed for creating flawless content-rich responsive web applications.'
                }
            }
        ],
        link: [
            { rel: 'apple-touch-icon', sizes: '57x57', href: '/favicon/apple-icon-57x57.png' },
            { rel: 'apple-touch-icon', sizes: '60x60', href: '/favicon/apple-icon-60x60.png' },
            { rel: 'apple-touch-icon', sizes: '72x72', href: '/favicon/apple-icon-72x72.png' },
            { rel: 'apple-touch-icon', sizes: '76x76', href: '/favicon/apple-icon-76x76.png' },
            { rel: 'apple-touch-icon', sizes: '114x114', href: '/favicon/apple-icon-114x114.png' },
            { rel: 'apple-touch-icon', sizes: '120x120', href: '/favicon/apple-icon-120x120.png' },
            { rel: 'apple-touch-icon', sizes: '144x144', href: '/favicon/apple-icon-144x144.png' },
            { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicon/apple-icon-152x152.png' },
            { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-icon-180x180.png' },
            { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon/android-icon-192x192.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/favicon-96x96.png' },
            { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' }
        ],
        htmlAttrs: {
            lang: 'en'
        }
    },

    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },

    /**
     * Manifest Configuration
     */
    manifest: {
        name: 'Inkline',
        lang: 'en'
    },

    /*
    ** Global CSS
    */
    css: [
        '~/assets/index.scss',
        '@fortawesome/fontawesome-svg-core/styles.css'
    ],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '~/plugins/inkline',
        '~/plugins/font-awesome'
    ],

    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module',
        // Doc: https://github.com/nuxt-community/stylelint-module
        '@nuxtjs/stylelint-module',
        // Doc: https://github.com/nuxt-community/gtm-module
        '@nuxtjs/gtm'
    ],

    /**
     * Google tag manager configuration
     * See https://github.com/nuxt-community/gtm-module
     */
    gtm: {
        id: 'GTM-KD44VC3',
        pageTracking: true
    },

    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://content.nuxtjs.org
        '@nuxt/content',
        // Doc: https://pwa.nuxtjs.org
        '@nuxtjs/pwa',
        // Doc: https://github.com/nuxt-community/sitemap-module
        '@nuxtjs/sitemap',
        // Doc: https://github.com/nuxt-community/robots-module
        '@nuxtjs/robots',
        // Doc: https://github.com/nuxt-community/style-resources-module
        '@nuxtjs/style-resources'
    ],

    /**
     * Nuxt content configuration
     * See https://content.nuxtjs.org
     */
    content: {
        dir: 'pages'
    },

    /**
     * Sitemap Configuration
     * See https://github.com/nuxt-community/sitemap-module
     */
    sitemap: {
        path: '/sitemap.xml',
        hostname: 'https://inkline.io',
        cacheTime: 1000 * 60 * 60 * 24
    },

    /**
     * Style resources configuration
     * See https://github.com/nuxt-community/style-resources-module
     */
    styleResources: {
        scss: ['~/assets/config/index.scss']
    },

    /**
     * Nuxt router link
     */
    router: {
        routeNameSplitter: '-',
        linkExactActiveClass: '-active nuxt-link-exact-active'
    },

    /*
    ** Build configuration
    */
    build: {
        filenames: {
            app: ({ isDev }) => isDev ? '[name].[hash].js' : '[chunkhash].js',
            chunk: ({ isDev }) => isDev ? '[name].[hash].js' : '[chunkhash].js'
        },

        transpile: [
            'vue-github-button',
            'lodash-es',
            '@inkline/inkline'
        ],

        /*
        ** You can extend webpack config here
        */
        extend (config, ctx) {
            // Add markdown templates support
            config.module.rules.push({
                test: /\.md$/i,
                loader: 'markdown-complete-loader',
                options: {
                    configFile: path.join(__dirname, 'markdown.config.js')
                }
            });
        },

        babel: {
            extends: path.join(__dirname, 'babel.config.js'),
            presets: ({ isServer }) => [
                [
                    '@nuxt/babel-preset-app', {
                        buildTarget: isServer ? 'server' : 'client',
                        corejs: { version: 3 }
                    }
                ]
            ]
        }
    }
};
