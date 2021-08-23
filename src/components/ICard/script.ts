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
 * @description Slot for default card content
 */

/**
 * @name header
 * @kind slot
 * @description Slot for card header content
 */

/**
 * @name footer
 * @kind slot
 * @description Slot for card footer content
 */

/**
 * @name image
 * @kind slot
 * @description Slot for card image
 */

const componentName = 'ICard';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * @description The color variant of the card
         * @type primary | success | light | dark | info | success | warning | danger
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * @description The size variant of the card
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
        },
    }
});
