const { mergeConfig } = require('vite');
const { resolve } = require('path');

module.exports = {
    stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-themes',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-a11y',
        // Disabled until this is actually used rather otherwise its a blank tab
        // '@storybook/addon-interactions',
        'storybook-dark-mode',
        '@chromatic-com/storybook'
    ],
    staticDirs: ['../public'],
    framework: {
        name: '@storybook/vue3-vite',
        options: {}
    },
    disableTelemetry: true,
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
            define: { 'process.env': {} }
        });
    },
    docs: {}
};
