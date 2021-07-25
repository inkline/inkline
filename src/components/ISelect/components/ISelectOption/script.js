/**
 * @name default
 * @kind slot
 * @description Slot for default select option content
 */

const componentName = 'ISelectOption';

export default {
    name: componentName,
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
         * @description The label of the select option
         * @type String
         * @default ''
         */
        label: {
            type: String,
            default: ''
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
         * @type Object | String | Number
         * @default {}
         */
        value: {
            type: [Object, String, Number],
            default: () => ({})
        }
    },
    inject: {
        select: {
            default: () => ({})
        }
    },
    computed: {
        isActive() {
            return this.active || (this.value === this.select.modelValue)
        },
        classes() {
            return {
                '-active': this.isActive,
                '-disabled': this.disabled
            }
        },
        tabIndex() {
            return this.disabled ? -1 : this.tabindex;
        }
    },
    methods: {
        onClick() {
            if (!this.disabled) {
                this.select.onInput(this.value, this.label);
            }
        }
    }
};
