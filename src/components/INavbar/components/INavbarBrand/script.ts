import { defineComponent } from 'vue';
import {
    LinkableMixin
} from '@inkline/inkline/mixins';

/**
 * @name default
 * @kind slot
 * @description Slot for default navbar brand content
 */

const componentName = 'INavbarBrand';

export default defineComponent({
    name: componentName,
    mixins: [
        LinkableMixin
    ],
    props: {
        /**
         * @description Set the HTML tag to be used for rendering the nav item
         * @type String
         * @default div
         */
        tag: {
            type: String,
            default: 'div'
        }
    }
});
