import '@inkline/inkline/src/inkline.scss';
import { Inkline } from '@inkline/inkline/src/plugin';
import * as components from '@inkline/inkline/src/components';

export { Inkline } from '@inkline/inkline/src/plugin';
export * from '@inkline/inkline/src/components';

const install = Inkline.install;
Inkline.install = (Vue, options = {}) => install.call(Inkline, Vue, { components, ...options });

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Inkline);
}

export default Inkline;
