module.exports = {
    root: true,
    env: {
        node: true
    },
    parserOptions: {
        parser: "babel-eslint"
    },
    extends: [
        "plugin:vue/recommended",
        "eslint:recommended"
    ],
    rules: {
        "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
        indent: [2, 4]
    }
};
