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
    features: {
        storyStoreV7: true,
        babelModeV7: true
    },
    async viteFinal(config) {
        const { config: userConfig } = await loadConfigFromFile(resolve(__dirname, '..', '..', 'vite.config.js'));

        return mergeConfig(config, {
            resolve: userConfig.resolve,
            esbuild: userConfig.esbuild
        });
    }
}
