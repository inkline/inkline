const { loadConfigFromFile, mergeConfig } = require('vite');
const { resolve } = require('path');
const postcssConfig = require('../../../postcss.config');

module.exports = {
    stories: [
        '../src/**/*.stories.@(mdx|js|jsx|ts|tsx)'
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
    staticDirs: ['../../common/public'],
    framework: '@storybook/react',
    core: {
        builder: 'storybook-builder-vite'
    },
    async viteFinal(config) {
        const { config: userConfig } = await loadConfigFromFile(resolve(__dirname, '..', '..', 'vite.config.js'));

        config.resolve.alias = [
            {
                find: /^react(.*)/,
                replacement: resolve(__dirname, '..', 'node_modules', 'react$1')
            }
        ];

        return mergeConfig(config, {
            resolve: userConfig.resolve
        });
    }
}
