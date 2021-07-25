import {
    LinkableMixin,
} from '@inkline/inkline/src/mixins';

/**
 * @name default
 * @kind slot
 * @description Slot for default navbar brand content
 */

const componentName = 'INavbarBrand';

export default {
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
};
