module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "node": "current"
                }
            }
        ],
        "@nuxt/babel-preset-app"
    ],
    plugins: [
        "@babel/plugin-proposal-class-properties"
    ]
};
