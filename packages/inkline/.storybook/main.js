import { dirname, join } from "path";
const { mergeConfig } = require('vite');
const { resolve } = require('path');

module.exports = {
    stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        getAbsolutePath("@storybook/addon-themes"),
        getAbsolutePath("@storybook/addon-links"),
        getAbsolutePath("@storybook/addon-essentials"),
        getAbsolutePath("@storybook/addon-a11y"),
        getAbsolutePath("storybook-dark-mode"),
        getAbsolutePath("@chromatic-com/storybook"),
        getAbsolutePath("@storybook/experimental-addon-test")
    ],
    staticDirs: ['../public'],
    framework: {
        name: getAbsolutePath("@storybook/vue3-vite"),
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

function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, "package.json")));
}
