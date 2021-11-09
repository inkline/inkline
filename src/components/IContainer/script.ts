import { defineComponent } from 'vue';
import { Classes } from '@inkline/inkline/types';

/**
 * @name default
 * @kind slot
 * @description Slot for default container content
 */

const componentName = 'IContainer';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * @description Display the container as fluid, always spanning 100% width
         * @type Boolean
         * @default false
         */
        fluid: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        classes (): Classes {
            return {
                '-fluid': this.fluid
            };
        }
    }
});
