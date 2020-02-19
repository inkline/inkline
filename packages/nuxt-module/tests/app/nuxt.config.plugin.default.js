import merge from 'merge';
import config from './nuxt.config';

export default merge(config, {
    buildDir: 'dist-plugin-default',
    plugins: [
        '~/plugins/inkline.default'
    ],
    build: {
        babel: {
            compact: false
        }
    }
})
