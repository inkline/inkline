import { defineComponent } from 'vue';
import {
    LinkableMixin,
} from '@inkline/inkline/src/mixins';
import { Classes, ElementEvent } from '@inkline/inkline/src/types';

/**
 * @name default
 * @kind slot
 * @description Slot for default nav item content
 */

const componentName = 'INavItem';

export default defineComponent({
    name: componentName,
    mixins: [
        LinkableMixin
    ],
    inject: {
        nav: {
            default: () => ({})
        }
    },
    props: {
        /**
         * @description The active state of the nav item
         * @type Boolean
         * @default false
         */
        active: {
            type: Boolean,
            default: false
        },
        /**
         * @description The disabled state of the nav item
         * @type Boolean
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * @description Set the HTML tag to be used for rendering the nav item
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
        classes(): Classes {
            return {
                '-active': this.active,
                '-disabled': this.disabled
            };
        },
        tabIndex(): number | string {
            return this.disabled ? -1 : this.tabindex;
        }
    },
    methods: {
        onClick(event: ElementEvent) {
            if ((this as any).nav.onItemClick) {
                (this as any).nav.onItemClick(this, event);
            }
        }
    }
});
