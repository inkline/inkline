import { defineComponent } from 'vue';
import { colorVariantClass, defaultPropValue } from '@inkline/inkline/mixins';
import { Classes, Styles } from '@inkline/inkline/types';

/**
 * Slot for default progress bar content
 * @name default
 * @kind slot
 */

const componentName = 'IProgressBar';

export default defineComponent({
    name: componentName,
    inject: {
        progress: {
            default: () => ({ min: 0, max: 100 })
        }
    },
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the progress bar
         * @type light | dark | primary | secondary | info | success | warning | danger
         * @default primary
         * @name color
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color', 'primary')
        },
        /**
         * The value of the progress bar
         * @type Number
         * @default 0
         * @name value
         */
        value: {
            type: [String, Number],
            default: 0
        }
    },
    computed: {
        computedValue (): number {
            const min = typeof this.min === 'string' ? parseFloat(this.min) : this.min;
            const value = typeof this.value === 'string' ? parseFloat(this.value.replace('%', '')) : this.value;
            const max = typeof this.max === 'string' ? parseFloat(this.max) : this.max;

            return (value - min) * 100 / (max - min);
        },
        min (): number {
            return (this as any).progress.min;
        },
        max (): number {
            return (this as any).progress.max;
        },
        style (): Styles {
            return {
                width: `${this.computedValue}%`
            };
        },
        classes (): Classes {
            return {
                ...colorVariantClass(this)
            };
        }
    }
});
