import { defineComponent } from 'vue';
import {
    defaultPropValue,
    colorVariantClass,
    sizePropValidator
} from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default progress content
 * @name default
 * @kind slot
 */

const componentName = 'IProgress';

export default defineComponent({
    name: componentName,
    provide () {
        return {
            progress: this
        };
    },
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the progress component
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * The value to consider as the 0% starting point
         * @type Number
         * @default 0
         * @name min
         */
        min: {
            type: [String, Number],
            default: 0
        },
        /**
         * The value to consider as the 100% ending point
         * @type Number
         * @default 100
         * @name max
         */
        max: {
            type: [String, Number],
            default: 100
        },
        /**
         * The size variant of the progress component
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        }
    },
    computed: {
        classes (): Classes {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size)
            };
        }
    }
});
