module.exports = {
    pages: {
        index: {
            entry: "src/main.js",
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
        config.output.libraryExport('Inkline');

        // config.optimization.delete("splitChunks");
        // config.optimization.removeAvailableModules(false);
        // config.optimization.concatenateModules(false);
        // config.optimization.providedExports(false);
        // config.optimization.usedExports(false);

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
