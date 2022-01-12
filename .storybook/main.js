const path = require('path');
const webpackConfig = require('../webpack.config');
const postcssConfig = require('../postcss.config');
const tsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    addons: [
        {
            name: '@storybook/addon-postcss',
            options: {
                postcssLoaderOptions: {
                    ...postcssConfig,
                    implementation: require('postcss')
                }
            }
        },
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-a11y',
        'storybook-dark-mode'
    ],
    staticDirs: ['../public'],
    framework: '@storybook/vue3',
    core: {
        builder: 'webpack5'
    },
    features: {
        storyStoreV7: true,
    },
    webpackFinal: async (config, { configType }) => {
        config.resolve.alias = webpackConfig.resolve.alias;
        config.module.rules.push({
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            include: path.resolve(__dirname, '../'),
        });

        config.resolve.plugins = [
            ...(config.resolve.plugins || []),
            new tsconfigPathsPlugin({
                extensions: config.resolve.extensions,
            }),
        ];

        if (process.env.STORYBOOK_BASE_HREF) {
            config.output.publicPath = `/${process.env.STORYBOOK_BASE_HREF}/`;
        }

        return config;
    },
    managerWebpack: async (config) => {
        if (process.env.STORYBOOK_BASE_HREF) {
            config.output.publicPath = `/${process.env.STORYBOOK_BASE_HREF}/`;
        }

        return config;
    },
}
