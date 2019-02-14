const pkg = require('./package');
const path = require('path');

module.exports = {
    mode: 'spa',

    server: {
        port: 8080
    },

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
        '@/css/index.styl'
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
            if (ctx.isDev && ctx.isClient) {
                // Run ESLint on save
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /node_modules\/(?!@inkline)/
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
            config.resolve.alias['@routes'] = path.join(__dirname, 'routes');
            config.resolve.alias['@views'] = path.join(__dirname, 'views');
            config.resolve.alias['@inkline/inkline'] = '@inkline/inkline/src';
        },
        babel: {
            babelrc: true
        }
    }
};
