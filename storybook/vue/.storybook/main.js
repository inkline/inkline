const {loadConfigFromFile, mergeConfig} = require('vite');
const {resolve} = require('path');
const postcssConfig = require("../../../postcss.config");

module.exports = {
    stories: [
        '../src/components/IAlert/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/components/IBadge/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/components/IBreadcrumb/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/components/IIcon/**/*.stories.@(js|jsx|ts|tsx)',
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
    framework: '@storybook/vue3',
    core: {
        builder: 'storybook-builder-vite'
    },
    async viteFinal(config) {
        const { config: userConfig } = await loadConfigFromFile(resolve(__dirname, '..', '..', 'vite.config.js'));

        config.resolve.alias['@vue'] = resolve(__dirname, '..', 'node_modules', '@vue')

        return mergeConfig(config, {
            resolve: userConfig.resolve,
            esbuild: userConfig.esbuild,
        });
    }
}
