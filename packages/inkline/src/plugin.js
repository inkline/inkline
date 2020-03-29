import { addClass } from "@inkline/inkline/src/helpers/addClass";
import { removeClass } from "@inkline/inkline/src/helpers/removeClass";
import { FormBuilder } from "@inkline/inkline/src/factories/FormBuilder";

export const Inkline = {
    install(Vue, options = {}) {
        /**
         * Checks if default inkline variant has been stored in localStorage.
         * If not, fallback to light variant.
         */
        const storedVariant = !(Vue.prototype.$isServer || typeof window === 'undefined') &&
            window.localStorage.getItem('inkline-variant');
        const variant = storedVariant || 'light';

        /**
         * Register $inkline prototype in Vue components
         */
        Vue.prototype.$inkline = {
            /**
             * Inkline reactive global state
             */
            _vm: new Vue({
                data: () => ({
                    config: { variant }
                }),
                watch: {
                    'config.variant'(value, oldValue) {
                        removeClass(document.body, `-${oldValue}`);
                        addClass(document.body, `-${value}`);

                        window.localStorage.setItem('inkline-variant', value);
                    }
                }
            }),

            /**
             * Config getter used for accessing and setting reactive values
             * inside components using this.$inkline.config
             */
            get config() { return this._vm.$data.config },

            /**
             * Form builder wrapper used to create a root form schema
             *
             * @param name
             * @param schema
             * @returns {*}
             */
            form(name, schema) {
                if (typeof name !== 'string') {
                    schema = name;
                    name = '';
                }

                return FormBuilder.build(name, schema, { group: true, root: true });
            }
        };

        /**
         * Add inkline base class to body
         */
        if (!(Vue.prototype.$isServer || typeof window === 'undefined')) {
            addClass(document.body, `inkline -${variant}`);
        }

        /**
         * Register components provided through options globally
         */
        for (const componentIndex in options.components) {
            Vue.component(options.components[componentIndex].name, options.components[componentIndex]);
        }
    }
};
