module.exports = {
    root: true,
    env: {
        node: true,
        jest: true,
        browser: true
    },
    parserOptions: {
        parser: '@babel/eslint-parser'
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'alloy',
        'alloy/vue',
    ],
    rules: {
        'indent': ['warn', 4],
        'vue/html-indent': ['warn', 4],
        'vue/max-attributes-per-line': 'off',
        'vue/custom-event-name-casing': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-prototype-builtins': 'off'
    }
};
