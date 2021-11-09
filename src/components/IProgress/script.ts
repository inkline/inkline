import { defineComponent } from 'vue';
import {
    defaultPropValue,
    colorVariantClass,
    sizePropValidator
} from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * @name default
 * @kind slot
 * @description Slot for default progress content
 */

const componentName = 'IProgress';

export default defineComponent({
    name: componentName,
    provide () {
        return {
            progress: this
        };
    },
    props: {
        /**
         * @description The color variant of the progress component
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * @description The value to consider as the 0% starting point
         * @type Number
         * @default 0
         */
        min: {
            type: [String, Number],
            default: 0
        },
        /**
         * @description The value to consider as the 100% ending point
         * @type Number
         * @default 100
         */
        max: {
            type: [String, Number],
            default: 100
        },
        /**
         * @description The size variant of the progress component
         * @type sm | md | lg
         * @default md
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
