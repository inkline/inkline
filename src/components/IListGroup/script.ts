import { defineComponent } from 'vue';
import {
    defaultPropValue,
    colorVariantClass,
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
    inheritAttrs: false,
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
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * The size variant of the list group
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
                [`-${this.size}`]: Boolean(this.size),
                '-border': this.border
            };
        }
    }
});
