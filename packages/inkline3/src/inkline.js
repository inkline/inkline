import '@/inkline.scss';
import { Inkline } from '@/plugin';
import * as components from '@/components';

export { Inkline } from '@/plugin';
export * from '@/components';

const install = Inkline.install;
Inkline.install = (Vue, options = {}) => install.call(Inkline, Vue, { components, ...options });

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Inkline);
}

export default Inkline;
