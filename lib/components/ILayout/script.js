import { defineComponent } from 'vue';
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
        classes() {
            return { '-vertical': this.vertical };
        }
    }
});
//# sourceMappingURL=script.js.map