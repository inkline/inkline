const path = require('path');

module.exports = {
    stories: [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-a11y"
    ],
    core: {
        builder: "storybook-builder-vite"
    },
    async viteFinal(config) {
        config.configFile = "./vite.storybook.config.js";
        config.plugins = config.plugins.filter((plugin) => !['vite:vue'].includes(plugin.name));
        config.resolve.alias['@inkline/inkline'] = path.resolve(__dirname, '..', 'src');
        return config;
    },
    managerWebpack: async (config) => {
        const configHtmlWebPackPlugin = config.plugins.find(plugin => plugin.constructor.name === 'HtmlWebpackPlugin');
        const { templateParameters } = configHtmlWebPackPlugin.options;

        configHtmlWebPackPlugin.options.publicPath = '/storybook/';
        config.output.publicPath = '/storybook/'
        configHtmlWebPackPlugin.options.templateParameters = (compilation, files, options) => {
            oriReturn = templateParameters(compilation, files, options);
            oriReturn.globals.PREVIEW_URL = '/storybook/iframe.html';

            return oriReturn;
        }

        return config;
    }
}
