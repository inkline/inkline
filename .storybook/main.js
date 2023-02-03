const { mergeConfig } = require('vite');
const postcssConfig = require('../postcss.config');
const { resolve } = require('path');

module.exports = {
    stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
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
        // Disabled until this is actually used rather otherwise its a blank tab
        // '@storybook/addon-interactions',
        '@storybook/addon-a11y',
        'storybook-dark-mode'
    ],
    staticDirs: ['../public'],
    framework: {
        name: '@storybook/vue3-vite',
        options: {}
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
            define: { 'process.env': {} },
        });
    },
    docs: {
        autodocs: true
    }
};
