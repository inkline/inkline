import { colorVariantClass, sizePropValidator } from '@inkline/inkline/src/mixins';

/**
 * @name default
 * @kind slot
 * @description Slot for default badge content
 */

export default {
    name: 'IBadge',
    props: {
        /**
         * @description The color variant of the badge
         * @type primary | success | light | dark | info | success | warning | danger
         * @default light
         */
        color: {
            type: String,
            default: ''
        },
        /**
         * @description The size variant of the badge
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
        }
    }
};
