import { sizePropValidator } from '@inkline/inkline/src/mixins';

/**
 * @name default
 * @kind slot
 * @description Slot for default button group content
 */

export default {
    name: 'IButtonGroup',
    props: {
        /**
         * @description Display the button group with vertical orientation
         * @type Boolean
         * @default false
         */
        vertical: {
            type: Boolean,
            default: false
        },
        /**
         * @description Display the button group as a block, spanning the full container width
         * @type Boolean
         * @default false
         */
        block: {
            type: Boolean,
            default: false
        },
        /**
         * @description The disabled state of the button group
         * @type Boolean
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * @description The size variant of the button group
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: '',
            validator: sizePropValidator
        }
    },
    inject: {
        form: {
            default: () => ({})
        },
        formGroup: {
            default: () => ({})
        }
    },
    provide() {
        return {
            buttonGroup: this
        }
    },
    computed: {
        classes() {
            return {
                [`-${this.size}`]: Boolean(this.size),
                '-vertical': this.vertical,
                '-block': this.block,
                '-disabled': this.disabled,
            }
        },
        isDisabled() {
            return this.disabled || this.form.disabled || this.formGroup.disabled;
        },
        tabIndex() {
            return this.isDisabled ? -1 : this.tabindex;
        }
    }
};
