import merge from 'merge';
import config from './nuxt.config.module.default';

export default merge(config, {
    buildDir: 'dist-module-tree-shaking-scss',
    inkline: {
        treeShaking: true,
        scss: true
    }
})
