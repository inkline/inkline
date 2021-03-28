import FormComponentMixin from "@inkline/inkline/src/mixins/FormComponentMixin";
import { uid } from "@inkline/inkline/src/helpers";
import {colorVariantClass, sizePropValidator} from "@inkline/inkline/src/mixins";

/**
 * @name default
 * @kind slot
 * @description Slot for default checkbox label
 */

export default {
    name: 'ICheckbox',
    mixins: [
        FormComponentMixin
    ],
    emits: [
        /**
         * @event update:modelValue
         * @description Event emitted for setting the modelValue
         */
        'update:modelValue'
    ],
    props: {
        /**
         * @description The disabled state of the checkbox
         * @type Boolean
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * @description The indeterminate state of the checkbox
         * @type Boolean
         * @default false
         */
        indeterminate: {
            type: Boolean,
            default: false
        },
        /**
         * @description Used to set the checkbox value
         * @default false
         */
        modelValue: {
            default: false
        },
        /**
         * @description The unique identifier of the checkbox
         * @type String
         * @default uid()
         */
        name: {
            type: [String, Number],
            default() {
                return uid('checkbox');
            }
        },
        /**
         * @description The readonly state of the checkbox
         * @type Boolean
         * @default false
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * @description The size variant of the checkbox
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: '',
            validator: sizePropValidator
        },
        /**
         * @description The tabindex of the checkbox
         * @type Number | String
         * @default 1
         */
        tabindex: {
            type: [Number, String],
            default: 1
        },
    },
    inject: {
        checkboxGroup: {
            default: undefined
        }
    },
    computed: {
        classes() {
            return {
                [`-${this.size}`]: Boolean(this.size),
                '-disabled': this.isDisabled,
                '-readonly': this.isReadonly,
            };
        },
        value() {
            if (this.schema) {
                return this.schema.value;
            }

            return this.modelValue;
        }
        // checked() {
        //     if (Array.isArray(this.model)) {
        //         return this.model.indexOf(this.currentValue) !== -1;
        //     } else if (this.model !== null && this.model !== undefined) {
        //         return this.model === this.currentValue;
        //     }
        // }
    },
    methods: {
        clickInputRef() {
            this.$refs.input.click();
        }
    }
};
