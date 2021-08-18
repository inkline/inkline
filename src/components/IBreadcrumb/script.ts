import { defineComponent } from 'vue';
import {
    colorVariantClass,
    defaultPropValue,
    sizePropValidator
} from '@inkline/inkline/src/mixins';
import { Classes } from '@inkline/inkline/src/types';

/**
 * @name default
 * @kind slot
 * @description Slot for default breadcrumb content
 */

const componentName = 'IBreadcrumb';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * @description The color variant of the breadcrumb
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * @description The size variant of the breadcrumb
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
