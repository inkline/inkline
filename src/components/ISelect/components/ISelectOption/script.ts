import { defineComponent } from 'vue';
import { Classes } from '@inkline/inkline/types';

/**
 * @name default
 * @kind slot
 * @description Slot for default select option content
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
            default: (): any => ({})
        }
    },
    computed: {
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
