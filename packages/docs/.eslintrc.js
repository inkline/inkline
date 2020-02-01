module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        "plugin:vue/recommended"
    ],
    rules: {
        'indent': ['warn', 4],
        'no-console': 'off',
        'no-prototype-builtins': 'off',
        'vue/order-in-components': 'off'
    }
};
