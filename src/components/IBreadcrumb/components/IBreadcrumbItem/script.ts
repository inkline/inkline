import { defineComponent } from 'vue';
import { LinkableMixin } from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

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

const componentName = 'IBreadcrumbItem';

export default defineComponent({
    name: componentName,
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
        classes(): Classes {
            return {
                '-active': this.active,
                '-disabled': this.disabled
            };
        },
        tabIndex(): number | string {
            return this.disabled || this.active ? -1 : this.tabindex;
        }
    }
});
