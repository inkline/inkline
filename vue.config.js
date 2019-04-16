const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    pages: {
        index: {
            entry: 'src/index.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    filenameHashing: false,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-preset-env')()
                ]
            }
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

        config
            .module
            .rule('fonts')
            .use('url-loader')
            .tap((options) => {
                console.log(options);

                return options;
            });

        config.resolve.alias
            .set('@inkline/inkline', __dirname)
            .end();

        // config
        //     .plugin("webpack-bundle-analyzer")
        //     .use(BundleAnalyzerPlugin)
        //     .init(Plugin => new Plugin({
        //         analyzerMode: 'static'
        //     }));
    }
};