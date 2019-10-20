export * from '@inkline/inkline/src/components';
export const Inkline = {
    install(Vue, options = {}) {
        for (const componentIndex in options.components) {
            Vue.component(options.components[componentIndex].name, options.components[componentIndex]);
        }
    }
};
