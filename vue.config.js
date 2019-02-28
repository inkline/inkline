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
    configureWebpack: {
        output: {
            libraryExport: 'default'
        }
    },
    chainWebpack: (config) => {
        config.optimization.delete('splitChunks');
        config.optimization.removeAvailableModules(false);
        config.optimization.concatenateModules(false);
        config.optimization.providedExports(false);
        config.optimization.usedExports(false);
        // config.optimization.sideEffects(false)
        // config.optimization.minimize(false)
        // config.optimization.flagIncludedChunks(false)

        config.resolve.alias
            .set('@inkline/inkline', __dirname)
            .end();
    }
};