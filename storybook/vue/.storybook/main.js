const {loadConfigFromFile, mergeConfig} = require('vite');
const {resolve} = require('path');

module.exports = {
    stories: [
        '../src/components/IAlert/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/components/IBadge/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/components/IBreadcrumb/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/components/IIcon/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials'
    ],
    framework: '@storybook/vue3',
    core: {
        builder: 'storybook-builder-vite'
    },
    async viteFinal(config) {
        const { config: userConfig } = await loadConfigFromFile(resolve(__dirname, '..', '..', 'vite.config.js'));

        config.resolve.alias['@vue/runtime-core'] = resolve(__dirname, '..', 'node_modules', '@vue/runtime-core/dist/runtime-core.esm-bundler.js')

        return mergeConfig(config, {
            resolve: userConfig.resolve,
            esbuild: userConfig.esbuild,
        });
    }
}
