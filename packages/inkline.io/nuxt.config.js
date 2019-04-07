const pkg = require('./package');
const path = require('path');

module.exports = {
    mode: 'universal',

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
            { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
            { name: 'keywords', content: 'inkline, vue, vue 2, vue.js, vue components, framework, ui, ux' },
            { hid: 'description', name: 'description', content: 'Inkline is a modern UI/UX framework for Vue.js, designed for creating flawless content-rich responsive web applications.' },
            { name: 'msapplication-TileColor', content: '#ffffff' },
            { name: 'msapplication-TileImage', content: '/favicon/ms-icon-144x144.png' },
            { name: 'theme-color', content: '#ffffff' },
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
            lang: 'en',
            amp: true
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
        '@/css/index.styl'
    ],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '~/plugins/font-awesome',
        '~/plugins/inkline',
        '~/plugins/prism',
        '~/plugins/algolia'
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/pwa',
        '@nuxtjs/sitemap',
        ['@nuxtjs/google-tag-manager', { id: 'GTM-KD44VC3', pageTracking: true }],
        '@nuxtjs/webpackmonitor'
    ],

    /**
     * Nuxt router link
     */
    router: {
        linkExactActiveClass: '-active nuxt-link-exact-active'
    },

    /**
     * Google Analytics Configuration
     */
    // googleAnalytics: {
    //     id: 'UA-137703895-1',
    //     dev: false
    // },

    /**
     * Sitemap Configuration
     */
    sitemap: {
        path: '/sitemap.xml',
        hostname: 'https://inkline.io',
        cacheTime: 1000 * 60 * 60 * 24,
        generate: true
    },

    /*
    ** Build configuration
    */
    build: {
        transpile: [
            '@inkline/inkline',
            '@inkline/validation',
            'lodash-es',
            'vue-instantsearch',
            'instantsearch.js'
        ],

        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
            if (ctx.isDev && ctx.isClient) {
                // Run ESLint on save
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /node_modules/,
                    options: {
                        configFile: path.join(__dirname, '.eslintrc.js')
                    }
                });
            }

            // Add markdown templates support
            config.module.rules.push({
                test: /\.md$/i,
                loader: 'markdown-complete-loader',
                options: {
                    configFile: path.join(__dirname, 'markdown.config.js')
                }
            });

            // Add stylus config override
            [].concat(...config.module.rules
                .find((e) => e.test.toString().match(/\.styl/))
                .oneOf
                .map((e) => e.use.filter(e => e.loader === 'stylus-loader'))
            ).forEach((stylus) => {
                Object.assign(stylus.options, {
                    import: [
                        path.join(__dirname, 'css/config/index.styl')
                    ]
                })
            });

            config.resolve.symlinks = true;

            config.resolve.alias['@components'] = path.join(__dirname, 'components');
            config.resolve.alias['@directives'] = path.join(__dirname, 'directives');
            config.resolve.alias['@resources'] = path.join(__dirname, 'resources');
            config.resolve.alias['@helpers'] = path.join(__dirname, 'helpers');
            config.resolve.alias['@pages'] = path.join(__dirname, 'pages');

            // if (ctx.isDev && ctx.isClient) {
            config.resolve.alias['@inkline/inkline'] = '@inkline/inkline/src';
            config.resolve.alias['@inkline/validation'] = '@inkline/validation/src';
            // }
        },
        babel: {
            extends: path.join(__dirname, 'babel.config.js')
        }
    }
};
