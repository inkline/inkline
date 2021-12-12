import '@inkline/inkline/index.scss';
import { Inkline } from '@inkline/inkline/plugin';
import * as components from '@inkline/inkline/components';

const install = Inkline.install;
Inkline.install = (Vue, options = {}) => install!.call(Inkline, Vue, { components, ...options });

/**
 * Integrate automatically when referenced from CDN
 */
if (typeof window !== 'undefined' && (window as any).Vue) {
    (window as any).Vue.use(Inkline);
}

export { Inkline };
export default Inkline;
