export * from '@inkline/inkline/src/components';
import { form } from '@inkline/inkline/src/prototypes/form';

export const Inkline = {
    install(Vue, options = {}) {
        Vue.prototype.$inkline = { form };

        for (const componentIndex in options.components) {
            Vue.component(options.components[componentIndex].name, options.components[componentIndex]);
        }
    }
};
