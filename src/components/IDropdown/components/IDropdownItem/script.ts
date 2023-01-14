import { defineComponent } from 'vue';
import {
    LinkableMixin
} from '@inkline/inkline/mixins';
import { Classes, InputElementEvent } from '@inkline/inkline/types';

/**
 * Slot for default dropdown item content
 * @name default
 * @kind slot
 */

const componentName = 'IDropdownItem';

export default defineComponent({
    name: componentName,
    mixins: [
        LinkableMixin
    ],
    inject: {
        dropdown: {
            default: () => ({})
        }
    },
    inheritAttrs: false,
    props: {
        /**
         * The active state of the dropdown item
         * @type Boolean
         * @default false
         * @name active
         */
        active: {
            type: Boolean,
            default: false
        },
        /**
         * The disabled state of the dropdown item
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Display the dropdown item as plaintext
         * @type String
         * @default div
         * @name plaintext
         */
        plaintext: {
            type: Boolean,
            default: false
        },
        /**
         * Set the HTML tag to be used for rendering the dropdown item
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
        classes (): Classes {
            return {
                '-active': this.active,
                '-disabled': this.disabled,
                '-plaintext': this.plaintext
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
        onClick (event: InputElementEvent) {
            (this as any).dropdown.onItemClick?.(this, event);
        }
    }
});
