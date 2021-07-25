/**
 * @name default
 * @kind slot
 * @description Slot for default container content
 */

const componentName = 'IContainer';

export default {
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
        classes() {
            return {
                '-fluid': this.fluid
            };
        }
    }
};
