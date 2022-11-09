const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const inkline = require('./lib/webpack.cjs');

const inklineConfig = {
    outputDir: path.resolve(__dirname, 'src/playground/css/config')
};

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'playground', 'webpack', 'main.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        inkline(inklineConfig),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'playground', 'webpack', 'index.html')
        })
    ]
};
