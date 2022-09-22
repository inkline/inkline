import { defineComponent } from 'vue';
import {
    computedPropValue,
    computedColorValue,
    sizePropValidator
} from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default list group content
 * @name default
 * @kind slot
 */

const componentName = 'IListGroup';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * Display the list group border
         * @type Boolean
         * @default true
         * @name border
         */
        border: {
            type: Boolean,
            default: true
        },
        /**
         * The color variant of the list group
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: computedPropValue<string>(componentName, 'color')
        },
        /**
         * The size variant of the list group
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: computedPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        }
    },
    computed: {
        classes (): Classes {
            return {
                [`-${computedColorValue(componentName, this.color)}`]: true,
                [`-${this.size}`]: Boolean(this.size),
                '-border': this.border
            };
        }
    }
});
