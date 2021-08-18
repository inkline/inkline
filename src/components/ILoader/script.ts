import { defineComponent } from 'vue';
import { colorVariantClass, defaultPropValue } from '@inkline/inkline/src/mixins';
import { Classes } from '@inkline/inkline/src/types';

/**
 * @name default
 * @kind slot
 * @description Slot for default loader content
 */

const componentName = 'ILoader';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * @description The color variant of the loader
         * @type primary | success | light | dark | info | success | warning | danger
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * @description The size variant of the loader
         * @type sm | md | lg | auto
         * @default md
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size')
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
