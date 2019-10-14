export * from '@inkline/inkline/src/components';
export const Inkline = {
    install(Vue, options = {}) {
        for (const componentName in options.components) {
            Vue.component(componentName, options.components[componentName]);
        }
    }
};
