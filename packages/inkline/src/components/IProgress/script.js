import {
    colorVariantClass,
    sizePropValidator
} from '@inkline/inkline/src/mixins';

/**
 * @name default
 * @kind slot
 * @description Slot for default progress content
 */

export default {
    name: 'IProgress',
    props: {
        /**
         * @description The color variant of the progress component
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: '',
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
            default: '',
            validator: sizePropValidator
        }
    },
    provide() {
        return {
            progress: this
        };
    },
    computed: {
        classes() {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size)
            };
        }
    }
};
