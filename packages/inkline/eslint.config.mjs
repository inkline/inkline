import pluginInkline from "@inkline/eslint-config";

export default [
    ...pluginInkline.configs['vue'],
    {
        files: ['src/stories/**/*.vue', 'src/**/examples/*.vue'],
        rules: {
            'vue/multi-word-component-names': 'off',
        }
    }
];
