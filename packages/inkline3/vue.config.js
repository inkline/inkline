module.exports = {
    pages: {
        index: {
            entry: "src/inkline.js",
            template: "index.html",
            filename: "index.html"
        }
    },
    filenameHashing: false,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require("postcss-preset-env")()
                ]
            }
        }
    },
    chainWebpack: config => {
        config.output.library('Inkline');
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
    }
};
