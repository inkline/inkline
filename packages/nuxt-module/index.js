const { resolve, join } = require('path');

const defaultOptions = {};

module.exports = function InklineNuxt(moduleOptions = {}) {
    if (!this.options.components) {
        this.options.components = { dirs: [] }
    }

    this.requireModule('@nuxt/components');

    this.nuxt.hook('build:before', () => {
        const options = {
            ...defaultOptions,
            ...this.options.inkline,
            ...moduleOptions
        };

        this.options.css = [].concat(this.options.css || []);
        this.options.css.unshift('@inkline/inkline/src/inkline.scss');

        this.options.build.transpile = [].concat(this.options.build.transpile || []);
        this.options.build.transpile.push('@inkline/inkline');

        // Register plugin, passing options to plugin template
        this.addPlugin({
            src: resolve(__dirname, 'generator', 'index.ejs'),
            fileName: 'inkline.js',
            options: {
                inkline: Object.keys(options).length > 0 ? options : null
            }
        });
    });

    this.nuxt.hook('components:dirs', (dirs) => {
        dirs.push({
            path: join(__dirname, '..', 'inkline', 'src', 'components'),
            pattern: '*',
            transpile: true
        })
    });
};

module.exports.meta = require('./package.json');
