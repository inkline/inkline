/**
 * @name default
 * @kind slot
 * @description Slot for default select option content
 */

export default {
    name: 'ISelectOption',
    props: {
        /**
         * @description The active state of the select option
         * @type Boolean
         * @default false
         */
        active: {
            type: Boolean,
            default: false
        },
        /**
         * @description The disabled state of the select option
         * @type Boolean
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * @description The tabindex of the list group item
         * @type Number | String
         * @default 1
         */
        tabindex: {
            type: [Number, String],
            default: 0
        },
        /**
         * @description The select option value
         * @type Object
         * @default {}
         */
        value: {
            type: Object,
            default: () => ({})
        }
    },
    inject: {
        select: {
            default: () => ({})
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
    },
    methods: {
        onClick(event) {
            if (this.select.onItemClick) {
                this.select.onItemClick(this, event);
            }
        }
    }
};
