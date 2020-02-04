import '@inkline/inkline/src/index.scss';
import * as components from '@inkline/inkline/src/components';
import { Inkline } from '@inkline/inkline/src/index';
export * from '@inkline/inkline/src/index';

const install = Inkline.install;
Inkline.install = (Vue, options = {}) => install.call(Inkline, Vue, { components, ...options });

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Inkline);
}

export default Inkline;
