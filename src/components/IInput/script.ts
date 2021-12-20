import { defineComponent } from 'vue';
import { uid } from '@inkline/inkline/helpers';
import {
    defaultPropValue,
    colorVariantClass,
    sizePropValidator,
    FormComponentMixin
} from '@inkline/inkline/mixins';
import { Classes, InputElementEvent } from '@inkline/inkline/types';

/**
 * Slot for the input prefix content
 * @name prefix
 * @kind slot
 */

/**
 * Slot for the input suffix content
 * @name suffix
 * @kind slot
 */

/**
 * Slot for the input prepend content
 * @name prepend
 * @kind slot
 */

/**
 * Slot for the input append content
 * @name append
 * @kind slot
 */

/**
 * Slot for the clearable button
 * @name clearable
 * @kind slot
 * @property clear
 */

const componentName = 'IInput';

export default defineComponent({
    name: componentName,
    mixins: [
        FormComponentMixin
    ],
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the input
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * Display the input as clearable
         * @type Boolean
         * @default false
         * @name clearable
         */
        clearable: {
            type: Boolean,
            default: false
        },
        /**
         * The disabled state of the input
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * The error state of the input, computed based on schema by default.
         * @type Boolean | Array
         * @default ['touched', 'dirty', 'invalid']
         * @TODO use propDefaultValue to set default value
         * @name error
         */
        error: {
            type: [Array, Boolean],
            default: (): string[] => ['touched', 'dirty', 'invalid']
        },
        /**
         * The id of the internal input element
         * @type String
         * @default
         * @name id
         */
        id: {
            type: String,
            default: undefined
        },
        /**
         * Used to set the field value
         * @type String | Number
         * @default ''
         * @name modelValue
         */
        modelValue: {
            type: [String, Number],
            default: ''
        },
        /**
         * The unique identifier of the input
         * @type String
         * @default uid()
         * @name name
         */
        name: {
            type: [String, Number],
            default () {
                return uid('input');
            }
        },
        /**
         * Display the input as plaintext, disabling interaction
         * @type Boolean
         * @default false
         * @name plaintext
         */
        plaintext: {
            type: Boolean,
            default: false
        },
        /**
         * The readonly state of the input
         * @type Boolean
         * @default false
         * @name readonly
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * The size variant of the input
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        },
        /**
         * The tabindex of the input
         * @type Number | String
         * @default 0
         * @name tabindex
         */
        tabindex: {
            type: [Number, String],
            default: 0
        },
        /**
         * The type of the input
         * @type String
         * @default text
         * @name type
         */
        type: {
            type: String,
            default: 'text'
        },
        /**
         * The aria-label of the clear button
         * @type String
         * @default Clear
         * @name clearAriaLabel
         */
        clearAriaLabel: {
            type: String,
            default: 'Clear'
        }
    },
    emits: [
        /**
         * Event emitted for setting the modelValue
         * @event update:modelValue
         */
        'update:modelValue',
        /**
         * Event emitted when clearing the input element
         * @event clear
         */
        'clear'
    ],
    computed: {
        classes (): Classes {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size),
                '-disabled': this.isDisabled,
                '-error': this.hasError,
                '-readonly': this.isReadonly,
                '-prefixed': Boolean(this.$slots.prefix),
                '-suffixed': Boolean(this.$slots.suffix),
                '-prepended': Boolean(this.$slots.prepend),
                '-appended': Boolean(this.$slots.append)
            };
        },
        hasError (): boolean {
            if (typeof this.error === 'boolean') {
                return this.error;
            } else if (this.schema && this.error) {
                let visible = true;

                ([] as string[]).concat(this.error as string[]).forEach((status) => {
                    visible = visible && this.schema[status];
                });

                return visible;
            }

            return false;
        },
        tabIndex (): number | string {
            return this.isDisabled ? -1 : this.tabindex;
        },
        isClearable (): boolean {
            return this.clearable && !this.isDisabled && !this.isReadonly && this.value !== '';
        },
        value (): any {
            if (this.schema) {
                return this.schema.value;
            }

            return this.modelValue;
        }
    },
    methods: {
        onBlur (event: InputElementEvent) {
            this.parent.onBlur?.(this.name, event);
        },
        onInput (event: InputElementEvent) {
            this.parent.onInput?.(this.name, event.target.value);

            this.$emit('update:modelValue', event.target.value);
        },
        onClear (event: InputElementEvent) {
            this.$emit('update:modelValue', '');
            this.$emit('clear', event);
        },
        focus () {
            (this as any).$refs.input.focus();
        }
    }
});
