const { resolve, join } = require('path');

const defaultOptions = {
    scss: false,
    treeShaking: false
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
            this.options.css.unshift('@inkline/inkline/src/inkline.scss');
        } else {
            this.options.css.unshift('@inkline/inkline/dist/inkline.css');
        }

        this.options.build.transpile = [].concat(this.options.build.transpile || []);
        if (options.scss || options.treeShaking) {
            this.options.build.transpile.push('@inkline/inkline');
        }

        this.nuxt.hook('components:dirs', (dirs) => {
            dirs.push({
                path: join(__dirname, '..', 'inkline', 'src', 'components')
            })
        });

        const inklineOptions = { ...options };
        delete inklineOptions.scss;
        delete inklineOptions.treeShaking;

        // Register plugin, passing options to plugin template
        this.addPlugin({
            src: resolve(__dirname, 'generator', 'index.js'),
            fileName: 'inkline.js',
            options: {
                inkline: inklineOptions,
                treeShaking: options.treeShaking
            }
        });
    });
};

module.exports.meta = require('./package.json');
