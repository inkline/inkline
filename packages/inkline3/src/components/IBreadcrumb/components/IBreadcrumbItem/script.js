import { LinkableMixin } from '@inkline/inkline/src/mixins';

/**
 * @name default
 * @kind slot
 * @description Slot for default breadcrumb item content
 */

/**
 * @name tag
 * @kind member
 * @description Set the HTML tag to be used for rendering the breadcrumb item
 * @type String
 * @default a
 */

export default {
    name: 'IBreadcrumbItem',
    mixins: [
        LinkableMixin
    ],
    props: {
        /**
         * @description The active state of the breadcrumb item
         * @type Boolean
         * @default false
         */
        active: {
            type: Boolean,
            default: false
        },
        /**
         * @description The disabled state of the breadcrumb item
         * @type Boolean
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * @description The tabindex of the breadcrumb item
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
            };
        },
        tabIndex() {
            return this.disabled || this.active ? -1 : this.tabindex;
        }
    }
};
