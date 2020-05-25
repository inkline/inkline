import merge from 'merge';
import config from './nuxt.config';

export default merge(config, {
    buildDir: 'dist-module-default',
    modules: [
        '../../index'
    ]
})
