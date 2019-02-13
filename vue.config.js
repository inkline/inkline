// vue.config.js
module.exports = {
    pages: {
        index: {
            entry: 'src/inkline.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    filenameHashing: false,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@inkline/inkline', __dirname)
            .end();
    }
};