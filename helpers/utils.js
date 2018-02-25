'use strict';

const path = require('path');
const config = require('../config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const packageConfig = require('../package.json');

// Get assets path based on NODE_ENV
//
exports.assetsPath = function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.production.assetsSubDirectory
        : config.development.assetsSubDirectory;

    return path.posix.join(assetsSubDirectory, _path);
};

// Generate Vue style loaders for various style engines
//
exports.vueStyleLoaders = function (options) {
    options = options || {};

    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    };

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    };

    const stylusOptions = {
        paths: [path.resolve('node_modules'), path.resolve('src')],
        'include css': true,
        'resolve url': true
    };

    const sassOptions = {
        indentedSyntax: true
    };

    // Generate loader string to be used with extract text plugin
    function generateLoaders (loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            });
        }

        // Extract CSS when that option is specified
        // (which is the case during production helpers)
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            });
        }

        return ['vue-style-loader'].concat(loaders);
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', sassOptions),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus', stylusOptions),
        styl: generateLoaders('stylus', stylusOptions)
    };
};

// Generate loaders for standalone style files (outside of .vue)
//
exports.styleLoaders = function (options) {
    const output = [];
    const loaders = exports.vueStyleLoaders(options);

    for (const extension in loaders) {
        const loader = loaders[extension];
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        });
    }

    return output;
};

// Generate loaders for standalone style files (outside of .vue)
//
exports.markdownLoader = function (options) {
    return {
        loader: 'commonmark-loader'
    };
};

// Create desktop notification
//
exports.createNotifierCallback = () => {
    const notifier = require('node-notifier');

    return (severity, errors) => {
        if (severity !== 'error') return;

        const error = errors[0];
        const filename = error.file && error.file.split('!').pop();

        notifier.notify({
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || '',
            icon: path.join(__dirname, 'logo.png')
        });
    };
};
