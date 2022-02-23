import { defineComponent } from 'vue';
import { LinkableMixin } from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default breadcrumb item content
 * @name default
 * @kind slot
 */

/**
 * Set the HTML tag to be used for rendering the breadcrumb item
 * @name tag
 * @kind member
 * @type String
 * @default a
 */

const componentName = 'IBreadcrumbItem';

export default defineComponent({
    name: componentName,
    mixins: [
        LinkableMixin
    ],
    props: {
        /**
         * The active state of the breadcrumb item
         * @type Boolean
         * @default false
         * @name active
         */
        active: {
            type: Boolean,
            default: false
        },
        /**
         * The disabled state of the breadcrumb item
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * The tabindex of the breadcrumb item
         * @type Number | String
         * @default 1
         * @name tabindex
         */
        tabindex: {
            type: [Number, String],
            default: 1
        }
    },
    computed: {
        classes (): Classes {
            return {
                '-active': this.active,
                '-disabled': this.disabled
            };
        },
        tabIndex (): number | string {
            return this.disabled || this.active ? -1 : this.tabindex;
        }
    }
});
