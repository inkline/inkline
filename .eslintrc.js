module.exports = {
    root: true,
    env: {
        node: true,
        jest: true,
        browser: true
    },
    parserOptions: {
        parser: '@typescript-eslint/parser'
    },
    extends: [
        '@vue/typescript/recommended',
        'plugin:vue/vue3-recommended',
        'alloy',
        'alloy/vue',
    ],
    rules: {
        'indent': ['warn', 4],
        'semi': ['warn', 'always'],
        'object-curly-spacing': ['warn', 'always'],
        'quotes': ['warn', 'single'],
        'vue/html-indent': ['warn', 4],
        'vue/max-attributes-per-line': 'off',
        'vue/custom-event-name-casing': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-prototype-builtins': 'off',
        'max-params': 'off',
        'max-nested-callbacks': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off'
    }
};
