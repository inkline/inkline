module.exports = {
    extends: ['@grozav', '@vue/typescript/recommended', 'plugin:vue/vue3-recommended', 'prettier'],
    plugins: ['vue'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'vue/html-indent': ['warn', 4],
        'vue/max-attributes-per-line': 'off',
        'vue/custom-event-name-casing': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/require-prop-types': 'off',
        'vue/comment-directive': 'off'
    }
};
