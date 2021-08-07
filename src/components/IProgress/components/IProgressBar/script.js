import {colorVariantClass, defaultPropValue} from "@inkline/inkline/src/mixins";

/**
 * @name default
 * @kind slot
 * @description Slot for default progress bar content
 */

const componentName = 'IProgressBar';

export default {
    name: componentName,
    props: {
        /**
         * @description The color variant of the progress bar
         * @type light | dark | primary | secondary | info | success | warning | danger
         * @default primary
         */
        color: {
            type: String,
            default: defaultPropValue(componentName, 'color', 'primary'),
        },
        /**
         * @description The value of the progress bar
         * @type Number
         * @default 0
         */
        value: {
            type: [String, Number],
            default: 0
        }
    },
    inject: {
        progress: {
            default: () => ({ min: 0, max: 100 })
        }
    },
    computed: {
        computedValue() {
            const min = typeof this.min === 'string' ? parseFloat(this.min) : this.min;
            const value = typeof this.value === 'string' ? parseFloat(this.value.replace('%', '')) : this.value;
            const max = typeof this.max === 'string' ? parseFloat(this.max) : this.max;

            return (value - min) * 100 / (max - min);
        },
        min() {
            return this.progress.min;
        },
        max() {
            return this.progress.max;
        },
        style() {
            return {
                width: `${this.computedValue}%`
            };
        },
        classes() {
            return {
                ...colorVariantClass(this)
            };
        }
    },
};
