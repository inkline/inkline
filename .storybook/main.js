const path = require('path');
const webpackConfig = require('../webpack.config');
const postcssConfig = require('../postcss.config');
const tsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const framework = process.env.FRAMEWORK || 'vue';

console.log({framework})

const frameworks = {
    vue: '@storybook/vue3',
    react: '@storybook/react'
}

module.exports = {
    stories: [
        '../src/components/IBadge/**/*.stories.mdx',
        '../src/components/IBadge/**/*.stories.@(js|jsx|ts|tsx)'
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
    framework: frameworks[framework],
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

        return config;
    },
    managerWebpack: async (config) => {
        return config;
    },
}
