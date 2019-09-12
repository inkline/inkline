import '@inkline/inkline/src/index.scss';
import * as components from '@inkline/inkline/src/components';
export * from '@inkline/inkline/src/components';

export const Inkline = {
    install(Vue, options = {}) {
        for (const componentName in options.components) {
            Vue.component(componentName, components[componentName]);
        }
    }
};

const install = Inkline.install;
Inkline.install = (Vue, options = {}) => install.call(Inkline, Vue, { components, ...options });

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Inkline);
}

export default Inkline;
