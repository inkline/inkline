const { resolve } = require('path');

const defaultOptions = {
    stylus: false,
    treeShaking: false,
    validation: true
};

module.exports = function InklineNuxt(moduleOptions = {}) {
    this.nuxt.hook('build:before', () => {
        const options = {
            ...defaultOptions,
            ...this.options.inkline,
            ...moduleOptions
        };

        this.options.css = [].concat(this.options.css || []);
        if (options.stylus) {
            this.options.css.unshift('@inkline/inkline/src/index.styl');
        } else {
            this.options.css.unshift('@inkline/inkline/dist/inkline.css');
        }

        this.options.build.transpile = [].concat(this.options.build.transpile || []);
        if (options.stylus || options.treeShaking) {
            this.options.build.transpile.push('@inkline/inkline');
        }

        const inklineOptions = { ...options };
        delete inklineOptions.stylus;
        delete inklineOptions.treeShaking;

        // Register plugin, passing options to plugin template
        this.addPlugin({
            src: resolve(__dirname, 'plugin.template.js'),
            fileName: 'inkline.js',
            options: {
                inkline: inklineOptions,
                validation: options.validation,
                treeShaking: options.treeShaking
            }
        });
    });
};

module.exports.meta = require('../package.json');
