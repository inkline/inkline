module.exports = {
    pages: {
        index: {
            entry: "src/inkline.js",
            template: "public/index.html",
            filename: "index.html"
        }
    },
    filenameHashing: false,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [require("postcss-preset-env")()]
            }
        }
    },
    devServer: {
        port: 8081
    },
    chainWebpack: config => {
        config.resolve.alias.set("@inkline/inkline", __dirname).end();

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
    },
    lintOnSave: true,
    pluginOptions: {
        lintStyleOnBuild: true,
        stylelint: {
            fix: false,
            files: ['src/**/*.{css,scss}'],
            syntax: 'scss'
        }
    }
};
