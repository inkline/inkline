import { defineComponent } from 'vue';
import {
    LinkableMixin,
} from '@inkline/inkline/mixins';
import { Classes, InputElementEvent } from '@inkline/inkline/types';

/**
 * @name default
 * @kind slot
 * @description Slot for default dropdown item content
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
    props: {
        /**
         * @description The active state of the dropdown item
         * @type Boolean
         * @default false
         */
        active: {
            type: Boolean,
            default: false
        },
        /**
         * @description The disabled state of the dropdown item
         * @type Boolean
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * @description Display the dropdown item as plaintext
         * @type String
         * @default div
         */
        plaintext: {
            type: Boolean,
            default: false
        },
        /**
         * @description Set the HTML tag to be used for rendering the dropdown item
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
            default: 0
        }
    },
    computed: {
        classes(): Classes {
            return {
                '-active': this.active,
                '-disabled': this.disabled,
                '-plaintext': this.plaintext
            };
        },
        tabIndex(): number | string {
            return this.disabled ? -1 : this.tabindex;
        }
    },
    methods: {
        onClick(event: InputElementEvent) {
            if ((this as any).dropdown.onItemClick) {
                (this as any).dropdown.onItemClick(this, event);
            }
        }
    }
});
