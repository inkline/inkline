export const Inkline = {
    install(Vue, options = {}) {
        /**
         * Register components provided through options globally
         */
        for (const componentIndex in options.components) {
            Vue.component(options.components[componentIndex].name, options.components[componentIndex]);
        }
    }
};
