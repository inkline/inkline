import {
    LinkableMixin,
} from '@inkline/inkline/src/mixins';

/**
 * @name default
 * @kind slot
 * @description Slot for default list group item content
 */

const componentName = 'IListGroupItem';

export default {
    name: componentName,
    mixins: [
        LinkableMixin
    ],
    props: {
        /**
         * @description The active state of the list group item
         * @type Boolean
         * @default false
         */
        active: {
            type: Boolean,
            default: false
        },
        /**
         * @description The disabled state of the list group item
         * @type Boolean
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * @description Set the HTML tag to be used for rendering the list group item
         * @type String
         * @default div
         */
        tag: {
            type: String,
            default: 'div'
        },
        /**
         * @description The tabindex of the list group item
         * @type Number | String
         * @default 1
         */
        tabindex: {
            type: [Number, String],
            default: 1
        }
    },
    computed: {
        classes() {
            return {
                '-active': this.active,
                '-disabled': this.disabled
            }
        },
        tabIndex() {
            return this.disabled ? -1 : this.tabindex;
        }
    }
};
