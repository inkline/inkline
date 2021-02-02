import { sizeValidator } from "@inkline/inkline/src/validators";

export default {
    name: 'IButtonGroup',
    props: {
        vertical: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        tabindex: {
            type: [Number, String],
            default: 1
        },
        size: {
            type: String,
            default: '',
            validator: sizeValidator
        }
    },
    inject: [
        'parentForm',
        'parentFormGroup'
    ],
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
            return this.disabled || (this.parentForm || {}).disabled || (this.parentFormGroup || {}).disabled;
        },
        tabIndex() {
            return this.isDisabled ? -1 : this.tabindex;
        }
    }
};
