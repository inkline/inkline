import {
    colorVariantClass, sizePropValidator,
} from '@inkline/inkline/src/mixins';

/**
 * @name default
 * @kind slot
 * @description Slot for default list group content
 */

export default {
    name: 'IListGroup',
    props: {
        /**
         * @description Display the list group border
         * @type Boolean
         * @default true
         */
        border: {
            type: Boolean,
            default: true
        },
        /**
         * @description The color variant of the list group
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: '',
        },
        /**
         * @description The size variant of the list group
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
                [`-${this.size}`]: Boolean(this.size),
                '-border': this.border,
            };
        }
    }
};
