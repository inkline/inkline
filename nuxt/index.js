const { resolve } = require('path');


const srcIndex = '@inkline/inkline/src/index.js';


module.exports = function nuxtBootstrapVue(moduleOptions = {}) {
    this.nuxt.hook('build:before', () => {
        const options = {
            stylus: false,
            treeShaking: false,
            ...this.options.inkline,
            ...moduleOptions
        };

        // Ensure we have arrays
        this.options.css = [].concat(this.options.css || []);
        this.options.build.transpile = [].concat(this.options.build.transpile || []);

        if (options.stylus) {
            this.options.css.unshift('@inkline/inkline/src/index.styl')
        } else {
            this.options.css.unshift('@inkline/inkline/dist/inkline.css')
        }

        if (options.stylus || options.treeShaking) {
            this.options.build.transpile.push('@inkline/inkline/src')
        }

        // Register plugin, passing options to plugin template
        this.addPlugin({
            src: resolve(__dirname, 'plugin.template.js'),
            fileName: 'inkline.js',
            options
        })
    })
}

module.exports.meta = require('../package.json')
