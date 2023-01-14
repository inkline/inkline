import { defineComponent } from 'vue';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default select option content
 * @name default
 * @kind slot
 */

export interface SelectOption {
    active?: boolean;
    disabled?: boolean;
    label: string;
    value: any;

    [key: string]: any
}

const componentName = 'ISelectOption';

export default defineComponent({
    name: componentName,
    inject: {
        select: {
            default: (): any => ({})
        }
    },
    inheritAttrs: false,
    props: {
        /**
         * The active state of the select option
         * @type Boolean
         * @default false
         * @name active
         */
        active: {
            type: Boolean,
            default: false
        },
        /**
         * The disabled state of the select option
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * The label of the select option
         * @type String
         * @default ''
         * @name label
         */
        label: {
            type: String,
            default: ''
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
        },
        /**
         * The select option value
         * @type Object | String | Number
         * @default {}
         * @name value
         */
        value: {
            type: [Object, String, Number],
            default: (): any => ({})
        }
    },
    computed: {
        ariaDisabled () {
            return this.disabled ? 'true' : 'false';
        },
        ariaSelected () {
            return this.active ? 'true' : 'false';
        },
        isActive (): boolean {
            return this.active || (this.value === (this as any).select.modelValue);
        },
        classes (): Classes {
            return {
                '-active': this.isActive,
                '-disabled': this.disabled
            };
        },
        tabIndex (): number | string {
            return this.disabled ? -1 : this.tabindex;
        }
    },
    methods: {
        onClick () {
            if (!this.disabled) {
                (this as any).select.onInput(this.value, this.label);
            }
        }
    }
});
