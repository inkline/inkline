module.exports = {
    env: {
        node: true,
        jest: true,
        browser: true,
        es2021: true
    },
    extends: [
        '@vue/typescript/recommended',
        'plugin:vue/vue3-recommended',
        'standard'
    ],
    parserOptions: {
        ecmaVersion: 12,
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },
    plugins: [
        'vue',
        '@typescript-eslint'
    ],
    rules: {
        indent: ['warn', 4],
        semi: ['warn', 'always'],
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-prototype-builtins': 'off',
        'max-params': 'off',
        'max-nested-callbacks': 'off',
        'vue/html-indent': ['warn', 4],
        'vue/max-attributes-per-line': 'off',
        'vue/custom-event-name-casing': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/require-prop-types': 'off',
        'vue/comment-directive': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off'
    }
};
