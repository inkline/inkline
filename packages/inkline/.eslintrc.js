module.exports = {
    root: true,
    env: {
        node: true
    },
    parserOptions: {
        parser: "babel-eslint"
    },
    extends: [
        "plugin:vue/recommended"
    ],
    rules: {
        'indent': ['warn', 4],
        'no-debugger': process.env.NODE_ENV === "production" ? 2 : 0,
        'no-prototype-builtins': 'off'
    }
};
