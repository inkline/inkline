import { uid } from '@inkline/inkline/src/helpers';
import {
    colorVariantClass,
    sizePropValidator
} from '@inkline/inkline/src/mixins';
import { FormComponentMixin } from '@inkline/inkline/src/mixins';

/**
 * @name prefix
 * @kind slot
 * @description Slot for the input prefix content
 */

/**
 * @name suffix
 * @kind slot
 * @description Slot for the input suffix content
 */

/**
 * @name prepend
 * @kind slot
 * @description Slot for the input prepend content
 */

/**
 * @name append
 * @kind slot
 * @description Slot for the input append content
 */

/**
 * @name clearable
 * @kind slot
 * @description Slot for the clearable button
 * @property clear
 */

export default {
    name: 'IInput',
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
         * @description The color variant of the input
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: ''
        },
        /**
         * @description Display the input as clearable
         * @type Boolean
         * @default false
         */
        clearable: {
            type: Boolean,
            default: false
        },
        /**
         * @description The disabled state of the input
         * @type Boolean
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * @description The id of the internal input element
         * @type String
         * @default
         */
        id: {
            type: String,
            default: ''
        },
        /**
         * @description Used to set the field value
         * @type Boolean
         * @default false
         */
        modelValue: {
            type: String,
            default: ''
        },
        /**
         * @description The unique identifier of the input
         * @type String
         * @default uid()
         */
        name: {
            type: [String, Number],
            default() {
                return uid('input');
            }
        },
        /**
         * @description The readonly state of the input
         * @type Boolean
         * @default false
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * @description The size variant of the input
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: '',
            validator: sizePropValidator
        },
        /**
         * @description The tabindex of the input
         * @type Number | String
         * @default 1
         */
        tabindex: {
            type: [Number, String],
            default: 1
        },
        /**
         * @description The type of the input
         * @type String
         * @default text
         */
        type: {
            type: String,
            default: 'text'
        },
    },
    inheritAttrs: false,
    computed: {
        classes() {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size),
                '-disabled': this.isDisabled,
                '-readonly': this.isReadonly,
                '-prefixed': Boolean(this.$slots.prefix),
                '-suffixed': Boolean(this.$slots.suffix),
                '-prepended': Boolean(this.$slots.prepend),
                '-appended': Boolean(this.$slots.append),
            };
        },
        tabIndex() {
            return this.isDisabled ? -1 : this.tabindex;
        },
        isClearable() {
            return this.clearable && !this.isDisabled && !this.isReadonly && this.currentValue !== '';
        },
        value() {
            if (this.schema) {
                return this.schema.value;
            }

            return this.modelValue;
        }
    },
    methods: {
        onBlur(event) {
            this.parent.onBlur?.(this.name, event);
        },
        onInput(event) {
            this.parent.onInput?.(this.name, event.target.value);

            this.$emit('update:modelValue', event.target.value);
        },
        onClear() {
            this.$emit('update:modelValue', '');
        },
        focusInput() {
            this.$refs.input.focus();
        }
    }
};
