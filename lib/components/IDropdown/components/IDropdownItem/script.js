import { defineComponent } from 'vue';
import { LinkableMixin, } from '../../../../mixins';
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
        classes() {
            return {
                '-active': this.active,
                '-disabled': this.disabled,
                '-plaintext': this.plaintext
            };
        },
        tabIndex() {
            return this.disabled ? -1 : this.tabindex;
        }
    },
    methods: {
        onClick(event) {
            if (this.dropdown.onItemClick) {
                this.dropdown.onItemClick(this, event);
            }
        }
    }
});
//# sourceMappingURL=script.js.map