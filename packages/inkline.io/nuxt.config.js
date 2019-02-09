const pkg = require('./package');
const path = require('path');

module.exports = {
    mode: 'spa',

    /*
    ** Headers of the page
    */
    head: {
        title: pkg.name,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: pkg.description }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },

    /*
    ** Global CSS
    */
    css: [
    ],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [,
        // '@nuxtjs/pwa',
        'nuxt-babel'
    ],

    /*
    ** Build configuration
    */
    build: {
        transpile: ['@inkline/inkline'],

        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /node_modules\/(?!@inkline)/
                });

                config.resolve.symlinks = true;

                config.resolve.alias['@components'] = path.join(__dirname, 'components');
                config.resolve.alias['@directives'] = path.join(__dirname, 'directives');
                config.resolve.alias['@resources'] = path.join(__dirname, 'resources');
                config.resolve.alias['@routes'] = path.join(__dirname, 'routes');
                config.resolve.alias['@views'] = path.join(__dirname, 'views');
                config.resolve.alias['@inkline/inkline'] = '@inkline/inkline/src';
            }
        },
        babel: {
            babelrc: true
        }
    }
};
