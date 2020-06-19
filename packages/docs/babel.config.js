module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset',
        [
            '@nuxt/babel-preset-app', {
                corejs: { version: 3 }
            }
        ]
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-runtime'
    ]
};
