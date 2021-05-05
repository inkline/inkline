import { colorVariantClass, sizePropValidator } from '@inkline/inkline/src/mixins';

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

export default {
    name: 'ICard',
    props: {
        /**
         * @description The color variant of the card
         * @type primary | success | light | dark | info | success | warning | danger
         * @default light
         */
        color: {
            type: String,
            default: '',
        },
        /**
         * @description The size variant of the card
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: '',
            validator: sizePropValidator
        }
    },
    computed: {
        classes() {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size)
            }
        },
    }
};
