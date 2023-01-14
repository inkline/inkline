import { defineComponent } from 'vue';
import {
    LinkableMixin
} from '@inkline/inkline/mixins';

/**
 * Slot for default navbar brand content
 * @name default
 * @kind slot
 */

const componentName = 'INavbarBrand';

export default defineComponent({
    name: componentName,
    mixins: [
        LinkableMixin
    ],
    inheritAttrs: false,
    props: {
        /**
         * Set the HTML tag to be used for rendering the nav item
         * @type String
         * @default div
         * @name tag
         */
        tag: {
            type: String,
            default: 'div'
        }
    }
});
