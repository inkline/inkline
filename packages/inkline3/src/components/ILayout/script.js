/**
 * @name default
 * @kind slot
 * @description Slot for default layout content
 */

export default {
    name: 'ILayout',
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
        classes() {
            return [
                { '-vertical': this.vertical }
            ];
        }
    }
};
