import { defineComponent } from 'vue';
import {
    LinkableMixin
} from '@inkline/inkline/mixins';
import { Classes, ElementEvent } from '@inkline/inkline/types';

/**
 * Slot for default nav item content
 * @name default
 * @kind slot
 */

const componentName = 'INavItem';

export default defineComponent({
    name: componentName,
    mixins: [
        LinkableMixin
    ],
    inject: {
        nav: {
            default: () => ({
                onItemClick: () => {}
            })
        }
    },
    inheritAttrs: false,
    props: {
        /**
         * The active state of the nav item
         * @type Boolean
         * @default false
         * @name active
         */
        active: {
            type: Boolean,
            default: false
        },
        /**
         * The disabled state of the nav item
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Used to close the nearest navbar or sidebar by propagating the onClick event
         * @type Boolean
         * @default false
         * @name stopPropagation
         */
        stopPropagation: {
            type: Boolean,
            default: false
        },
        /**
         * Set the HTML tag to be used for rendering the nav item
         * @type String
         * @default div
         * @name tag
         */
        tag: {
            type: String,
            default: 'div'
        },
        /**
         * The tabindex of the list group item
         * @type Number | String
         * @default 0
         * @name tabindex
         */
        tabindex: {
            type: [Number, String],
            default: 0
        }
    },
    computed: {
        ariaDisabled () {
            if (this.role === 'link') {
                return null;
            }

            return this.disabled ? 'true' : 'false';
        },
        classes (): Classes {
            return {
                '-active': this.active,
                '-disabled': this.disabled
            };
        },
        role (): string {
            return this.$attrs.to || this.$attrs.href ? 'link' : 'menuitem';
        },
        tabIndex (): number | string {
            return this.disabled ? -1 : this.tabindex;
        }
    },
    methods: {
        onClick (event: ElementEvent) {
            if (this.stopPropagation) {
                return;
            }

            (this as any).nav.onItemClick(this, event);
        }
    }
});
