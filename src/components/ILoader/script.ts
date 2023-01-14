import { defineComponent } from 'vue';
import { colorVariantClass, defaultPropValue } from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default loader content
 * @name default
 * @kind slot
 */

const componentName = 'ILoader';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the loader
         * @type primary | light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * The size variant of the loader
         * @type sm | md | lg | auto
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size')
        }
    },
    computed: {
        classes (): Classes {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size)
            };
        }
    }
});
