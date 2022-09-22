import { defineComponent } from 'vue';
import { computedColorValue, computedPropValue } from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default loader content
 * @name default
 * @kind slot
 */

const componentName = 'ILoader';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The color variant of the loader
         * @type primary | light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: computedPropValue<string>(componentName, 'color')
        },
        /**
         * The size variant of the loader
         * @type sm | md | lg | auto
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: computedPropValue<string>(componentName, 'size')
        }
    },
    computed: {
        classes (): Classes {
            return {
                [`-${computedColorValue(componentName, this.color)}`]: true,
                [`-${this.size}`]: Boolean(this.size)
            };
        }
    }
});
