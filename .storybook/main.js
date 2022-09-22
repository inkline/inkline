const { mergeConfig } = require('vite');
const postcssConfig = require('../postcss.config');
const { resolve } = require("path");

module.exports = {
    stories: [
        '../src/components/IAlert/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/components/IBadge/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/components/IBreadcrumb/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/components/IButton/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/components/IButtonGroup/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/components/ICard/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/components/ICheckbox/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/components/IColumn/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/components/IContainer/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/components/ICollapsible/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/components/IDropdown/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/components/IIcon/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/components/IRow/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/stories/core/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/stories/utilities/**/*.stories.@(js|jsx|ts|tsx)'
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
        '@storybook/addon-interactions',
        '@storybook/addon-a11y',
        'storybook-dark-mode'
    ],
    staticDirs: ['../public'],
    framework: '@storybook/vue3',
    core: {
        builder: '@storybook/builder-vite'
    },
    features: {
        // storyStoreV7: true
    },
    async viteFinal(config, { configType }) {
        // return the customized config
        return mergeConfig(config, {
            // customize the Vite config here
            resolve: {
                alias: [
                    {
                        find: /^@inkline\/inkline\//,
                        replacement: `${resolve(__dirname, '..')}/src/`
                    }
                ]
            },
        });
    },
};
