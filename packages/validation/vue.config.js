module.exports = {
    pages: {
        index: {
            entry: "src/index.js",
            template: "public/index.html",
            filename: "index.html"
        }
    },
    filenameHashing: false,
    devServer: {
        port: 8082
    },
    chainWebpack: config => {
        config.resolve.alias.set("@inkline/validation", __dirname).end();

        config.output.library('Validation');
        config.output.libraryTarget('umd');
        config.output.libraryExport('default');
        config.output.globalObject('this');

        config.externals({
            vue: {
                commonjs: 'vue',
                commonjs2: 'vue',
                amd: 'vue',
                root: 'Vue'
            }
        });

        // config
        //     .plugin("webpack-bundle-analyzer")
        //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        //     .init(Plugin => new Plugin({
        //         analyzerMode: 'static'
        //     }));
    },
    lintOnSave: true,
    pluginOptions: {
        lintStyleOnBuild: false
    }
};
