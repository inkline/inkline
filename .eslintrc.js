module.exports = {
    extends: ['@grozav', '@vue/typescript/recommended', 'plugin:vue/vue3-recommended'],
    plugins: ['vue'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'no-case-declarations': 'off',
        'vue/html-indent': ['warn', 4],
        'vue/max-attributes-per-line': 'off',
        'vue/custom-event-name-casing': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/require-prop-types': 'off',
        'vue/comment-directive': 'off',
        'vue/no-dupe-keys': 'off',
        'vue/v-on-event-hyphenation': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-self-closing': 'off'
    }
};
