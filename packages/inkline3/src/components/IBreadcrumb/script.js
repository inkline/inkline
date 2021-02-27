import { colorVariantClass, sizePropValidator } from '@inkline/inkline/src/mixins';

/**
 * @name default
 * @kind slot
 * @description Slot for default breadcrumb content
 */

export default {
    name: 'IBreadcrumb',
    props: {
        /**
         * @description The color variant of the breadcrumb
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: ''
        },
        /**
         * @description The size variant of the breadcrumb
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
