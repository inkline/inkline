const { resolve } = require('path');

const defaultOptions = {
    scss: false,
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
        if (options.scss) {
            this.options.css.unshift('@inkline/inkline/src/index.scss');
        } else {
            this.options.css.unshift('@inkline/inkline/dist/inkline.css');
        }

        this.options.build.transpile = [].concat(this.options.build.transpile || []);
        if (options.scss || options.treeShaking) {
            this.options.build.transpile.push('@inkline/inkline');
        }

        const inklineOptions = { ...options };
        delete inklineOptions.scss;
        delete inklineOptions.treeShaking;
        delete inklineOptions.validation;

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
