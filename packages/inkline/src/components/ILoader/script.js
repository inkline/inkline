import { colorVariantClass, sizePropValidator } from '@inkline/inkline/src/mixins';

/**
 * @name default
 * @kind slot
 * @description Slot for default loader content
 */

export default {
    name: 'ILoader',
    props: {
        /**
         * @description The color variant of the loader
         * @type primary | success | light | dark | info | success | warning | danger
         * @default light
         */
        color: {
            type: String,
            default: ''
        },
        /**
         * @description The size variant of the loader
         * @type sm | md | lg | auto
         * @default md
         */
        size: {
            type: String,
            default: ''
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
