import '@inkline/inkline/src/inkline.scss';
import { Inkline } from '@inkline/inkline/src/plugin';
import * as components from '@inkline/inkline/src/components';

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
