import pluginInkline from "@inkline/eslint-config";

export default [
    ...pluginInkline.configs["default"],
    {
        languageOptions: {
            parserOptions: {
                project: [
                    "tsconfig.json",
                    "tsconfig.vite.json",
                    "tsconfig.nuxt.json",
                    "tsconfig.node.json"
                ]
            }
        }
    }
];
