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
            { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
            { name: 'keywords', content: 'inkline, vue, vue 2, vue.js, vue components, framework, ui, ux' },
            { hid: 'description', name: 'description', content: 'Inkline is a modern UI/UX framework for Vue.js, designed for creating flawless content-rich responsive web applications.' },
            { name: 'msapplication-TileColor', content: '#ffffff' },
            { name: 'msapplication-TileImage', content: '/favicon/ms-icon-144x144.png' },
            { name: 'theme-color', content: '#ffffff' },
            { hid: `og:site_name`, property: 'og:site_name', content: 'Inkline' },
            { hid: `og:type`, property: 'og:type', content: 'website' },
            { hid: `og:image`, property: 'og:image', content: `https://inkline.io/images/pages/index.og.jpg` }
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
        '@/css/index.scss',
        '@fortawesome/fontawesome-svg-core/styles.css'
    ],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '~/plugins/font-awesome',
        '~/plugins/inkline',
        '~/plugins/prism'
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/pwa',
        '@nuxtjs/sitemap',
        '@nuxtjs/robots',
        ['@nuxtjs/google-tag-manager', { id: 'GTM-KD44VC3', pageTracking: true }],
        // '@nuxtjs/webpackmonitor',
        // '@nuxtjs/stylelint-module',
        // '@nuxtjs/eslint-module',
    ],

    /**
     * Nuxt router link
     */
    router: {
        routeNameSplitter: '-',
        linkExactActiveClass: '-active nuxt-link-exact-active'
    },

    /**
     * Sitemap Configuration
     */
    sitemap: {
        path: '/sitemap.xml',
        hostname: 'https://inkline.io',
        cacheTime: 1000 * 60 * 60 * 24
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
            '@inkline/inkline',
            '@inkline/validation',
            'vue-github-button',
            'lodash-es'
        ],

        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
            // Add markdown templates support
            config.module.rules.push({
                test: /\.md$/i,
                loader: 'markdown-complete-loader',
                options: {
                    configFile: path.join(__dirname, 'markdown.config.js')
                }
            });

            // Add scss config override
            [].concat(...config.module.rules
                .find((e) => e.test.toString().match(/\.scss/))
                .oneOf
                .map((e) => e.use.filter(e => e.loader === 'sass-loader'))
            ).forEach((scss) => {
                Object.assign(scss.options, {
                    sassOptions: {
                        import: [
                            path.join(__dirname, 'css/config/index.scss')
                        ]
                    }
                })
            });

            config.resolve.symlinks = true;

            config.resolve.alias['@components'] = path.join(__dirname, 'components');
            config.resolve.alias['@directives'] = path.join(__dirname, 'directives');
            config.resolve.alias['@resources'] = path.join(__dirname, 'resources');
            config.resolve.alias['@helpers'] = path.join(__dirname, 'helpers');
            config.resolve.alias['@pages'] = path.join(__dirname, 'pages');

            config.resolve.alias['@inkline/inkline'] = '@inkline/inkline/src';
        },
        babel: {
            extends: path.join(__dirname, 'babel.config.js'),
            presets: ({ isServer }) => [
                [
                    "@nuxt/babel-preset-app", {
                        buildTarget: isServer ? 'server' : 'client',
                        corejs: { version: 3 }
                    }
                ]
            ],
        }
    }
};
