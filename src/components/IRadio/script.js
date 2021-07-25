import { uid } from "@inkline/inkline/src/helpers";
import {
    colorVariantClass,
    sizePropValidator,
    FormComponentMixin,
    defaultPropValue,
} from "@inkline/inkline/src/mixins";

/**
 * @name default
 * @kind slot
 * @description Slot for default radio label
 */

const componentName = 'IRadio';

export default {
    name: componentName,
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
         * @description The color variant of the radio
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue(componentName, 'color')
        },
        /**
         * @description The disabled state of the radio
         * @type Boolean
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * @description The indeterminate state of the radio
         * @type Boolean
         * @default false
         */
        indeterminate: {
            type: Boolean,
            default: false
        },
        /**
         * @description Used to set the radio value when used inside a radio group
         * @default ''
         */
        value: {
            default: ''
        },
        /**
         * @description Used to set the radio value when used by itself
         * @default false
         */
        modelValue: {
            default: false
        },
        /**
         * @description The unique identifier of the radio
         * @type String
         * @default uid()
         */
        name: {
            type: [String, Number],
            default() {
                return uid('radio');
            }
        },
        /**
         * @description Displays the native browser radio input indicator
         * @type Boolean
         * @default false
         */
        native: {
            type: Boolean,
            default: false
        },
        /**
         * @description The readonly state of the radio
         * @type Boolean
         * @default false
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * @description The size variant of the radio
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: defaultPropValue(componentName, 'size'),
            validator: sizePropValidator
        },
        /**
         * @description The tabindex of the radio
         * @type Number | String
         * @default 1
         */
        tabindex: {
            type: [Number, String],
            default: 1
        },
    },
    computed: {
        classes() {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size),
                '-disabled': this.isDisabled,
                '-readonly': this.isReadonly,
                '-native': this.native,
            };
        },
        checked() {
            return this.formGroup.checked === this.value;
        },
        tabIndex() {
            return this.isDisabled ? -1 : this.tabindex;
        }
    },
    methods: {
        clickInputRef() {
            if (this.isReadonly) {
                return;
            }

            this.$refs.input.click();
        },
        onChange(event) {
            this.parent.onInput?.(this.name, event.target.checked);

            // When inside a Radio Group
            this.formGroup.onChange?.(this.value);

            this.$emit('update:modelValue', event.target.checked);
        },
        onBlur(event) {
            this.parent.onBlur?.(this.name, event);
        }
    }
};
