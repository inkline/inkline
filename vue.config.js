// vue.config.js
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
        config.optimization.delete('splitChunks');
        config.resolve.alias
            .set('@inkline/inkline', __dirname)
            .end();
    }
};