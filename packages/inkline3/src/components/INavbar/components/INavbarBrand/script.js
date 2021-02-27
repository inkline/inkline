import {
    LinkableMixin,
} from '@inkline/inkline/src/mixins';

/**
 * @name default
 * @kind slot
 * @description Slot for default navbar brand content
 */

export default {
    name: 'INavbarBrand',
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
