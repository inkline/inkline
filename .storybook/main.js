const { loadConfigFromFile, mergeConfig } = require('vite');
const { resolve } = require('path');
const postcssConfig = require('../postcss.config');
const framework = process.env.VITE_FRAMEWORK || 'vue';

const storybookFrameworks = {
    vue: '@storybook/vue3',
    react: '@storybook/react'
}

module.exports = {
    stories: [
        `../src/**/${framework}/*.stories.mdx`,
        `../src/components/IAlert/**/${framework}/*.stories.@(js|jsx|ts|tsx)`,
        `../src/components/IBadge/**/${framework}/*.stories.@(js|jsx|ts|tsx)`,
        `../src/components/IIcon/**/${framework}/*.stories.@(js|jsx|ts|tsx)`
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
    framework: storybookFrameworks[framework],
    core: {
        builder: 'storybook-builder-vite'
    },
    features: {
        storyStoreV7: true,
        babelModeV7: true
    },
    async viteFinal(config) {
        const { config: userConfig } = await loadConfigFromFile(resolve(__dirname, '..', 'vite.config.js'));

        return mergeConfig(config, {
            resolve: userConfig.resolve,
            esbuild: userConfig.esbuild
        });
    }
}
