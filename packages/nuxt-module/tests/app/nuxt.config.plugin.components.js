import merge from 'merge';
import config from './nuxt.config.plugin.default';

export default merge(config, {
    buildDir: 'dist-plugin-components',
    plugins: [
        '~/plugins/inkline.components'
    ],
    build: {
        transpile: [
            '@inkline/inkline'
        ]
    }
})
