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

function viteHtmlPlugin() {
    return {
        name: 'html',
        transform (code, id) {
            if (/\.html$/.test(id)) {
                return `export default ${JSON.stringify(code)}`;
            }
        }
    };
}

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
    async viteFinal(config, { configType }) {
        if (configType === 'DEVELOPMENT') {
            config.plugins.push(viteHtmlPlugin());
        } else {
            config.base = "/storybook/";
        }

        config.configFile = "./vite.common.config.js";
        config.plugins = config.plugins.filter((plugin) => !['vite:vue'].includes(plugin.name));
        return config;
    },
    managerWebpack: async (config, { configType }) => {
        if (configType !== 'DEVELOPMENT') {
            webpackInjectPublicPath(config, '/storybook/');
        }

        return config;
    },
}
