const { resolve } = require("path");

function webpackInjectPublicPath(webpackConfig, publicPath) {
    const configHtmlWebPackPlugin = webpackConfig.plugins.find(
        (plugin) => plugin.constructor.name === 'HtmlWebpackPlugin',
    );
    const templateParameters = configHtmlWebPackPlugin.options.templateParameters

    configHtmlWebPackPlugin.options.publicPath = publicPath;
    webpackConfig.output.publicPath = publicPath;

    configHtmlWebPackPlugin.options.templateParameters = (compilation, files, options) => {
        const result = templateParameters(compilation, files, options);
        result.globals.PREVIEW_URL = `${publicPath}iframe.html`;
        return result;
    }
}

module.exports = {
    framework: '@storybook/vue3',
    features: {
        storyStoreV7: true,
    },
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
    async viteFinal(config, { configType }) {
        config.resolve.alias = [
            {
                find: /^@inkline\/inkline\//,
                replacement: `${resolve(__dirname)}/../src/`
            },
            {
                find: /^~@inkline\/icons/,
                replacement: '@inkline/icons'
            }
        ];

        if (configType === 'DEVELOPMENT') {
            config.server.force = false;
        } else {
            config.base = "/storybook/";
        }

        return config;
    },
    managerWebpack: async (config, { configType }) => {
        if (configType !== 'DEVELOPMENT') {
            webpackInjectPublicPath(config, '/storybook/');
        }

        return config;
    },
}
