import { defineComponent } from 'vue';
import { Classes } from '@inkline/inkline/types';

/**
 * @name default
 * @kind slot
 * @description Slot for default layout content
 */

const componentName = 'ILayout';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * @description Display the layout on a vertical orientation
         * @type Boolean
         * @default false
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
