// vue.config.js
const path = require('path');

module.exports = {
    pages: {
        index: {
            entry: 'src/index.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    filenameHashing: false,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('inkline', path.resolve(__dirname, 'src'))
            .end();
    }
};