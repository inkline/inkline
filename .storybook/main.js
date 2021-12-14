const path = require('path');
const webpackConfig = require('../webpack.config.js');
const tsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    stories: [
        '../src/components/IAlert/**/*.stories.mdx',
        '../src/components/IAlert/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    addons: [
        '@storybook/addon-postcss',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-a11y'
    ],
    framework: '@storybook/vue3',
    features: {
        storyStoreV7: true,
    },
    webpackFinal: async (config, { configType }) => {
        config.resolve.alias = webpackConfig.resolve.alias;
        config.module.rules.push({
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
            include: path.resolve(__dirname, '../'),
        });

        config.resolve.plugins = [
            ...(config.resolve.plugins || []),
            new tsconfigPathsPlugin({
                extensions: config.resolve.extensions,
            }),
        ];

        return config;
    }
}
