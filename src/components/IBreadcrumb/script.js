import {
    colorPropDefault,
    colorVariantClass,
    sizePropDefault,
    sizePropValidator
} from '@inkline/inkline/src/mixins';

/**
 * @name default
 * @kind slot
 * @description Slot for default breadcrumb content
 */

const componentName = 'IBreadcrumb';

export default {
    name: componentName,
    props: {
        /**
         * @description The color variant of the breadcrumb
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: colorPropDefault(componentName)
        },
        /**
         * @description The size variant of the breadcrumb
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: sizePropDefault(componentName),
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
