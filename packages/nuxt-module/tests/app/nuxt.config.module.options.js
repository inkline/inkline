import merge from 'merge';
import config from './nuxt.config.module.default';

export default merge(config, {
    buildDir: 'dist-module-options',
    inkline: {
        config: {
            variant: 'dark'
        }
    }
})
