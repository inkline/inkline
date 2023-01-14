import { defineComponent } from 'vue';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default layout content
 * @name default
 * @kind slot
 */

const componentName = 'ILayout';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * Display the layout on a vertical orientation
         * @type Boolean
         * @default false
         * @name vertical
         */
        vertical: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        classes (): Classes {
            return { '-vertical': this.vertical };
        }
    }
});
