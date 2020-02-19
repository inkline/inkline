import merge from 'merge';
import config from './nuxt.config.plugin.default';

export default merge(config, {
    buildDir: 'dist-plugin-tree-shaking-scss',
    plugins: [
        '~/plugins/inkline.tree-shaking-scss'
    ],
    build: {
        transpile: [
            '@inkline/inkline'
        ]
    }
})
