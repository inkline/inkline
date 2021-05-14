module.exports = {
    root: true,
    env: {
        node: true
    },
    parserOptions: {
        parser: "babel-eslint"
    },
    extends: [
        "plugin:vue/vue3-recommended"
    ],
    rules: {
        'indent': ['warn', 4],
        'vue/html-indent': ['warn', 4],
        'vue/max-attributes-per-line': 'off',
        'vue/custom-event-name-casing': 'off',
        'no-debugger': process.env.NODE_ENV === "production" ? 2 : 0,
        'no-prototype-builtins': 'off'
    }
};
