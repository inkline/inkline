import { defineComponent } from 'vue';
import {
    colorVariantClass,
    defaultPropValue,
    sizePropValidator
} from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * @name default
 * @kind slot
 * @description Slot for default badge content
 */

const componentName = 'IBadge';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * @description The color variant of the badge
         * @type primary | success | light | dark | info | success | warning | danger
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * @description The size variant of the badge
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
        classes(): Classes {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size)
            };
        }
    }
});
