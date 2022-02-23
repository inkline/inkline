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

const componentName = 'IInput';

export default defineComponent({
    name: componentName,
    mixins: [
        FormComponentMixin
    ],
    inheritAttrs: false,
    props: {
        /**
         * @description The color variant of the input
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
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
         * @description The error state of the input, computed based on schema by default.
         * @type Boolean | Array
         * @default ['touched', 'dirty', 'invalid']
         * @TODO use propDefaultValue to set default value
         */
        error: {
            type: [Array, Boolean],
            default: (): string[] => ['touched', 'dirty', 'invalid']
        },
        /**
         * @description The id of the internal input element
         * @type String
         * @default
         */
        id: {
            type: String,
            default: undefined
        },
        /**
         * @description Used to set the field value
         * @type String | Number
         * @default ''
         */
        modelValue: {
            type: [String, Number],
            default: ''
        },
        /**
         * @description The unique identifier of the input
         * @type String
         * @default uid()
         */
        name: {
            type: [String, Number],
            default () {
                return uid('input');
            }
        },
        /**
         * @description Display the input as plaintext, disabling interaction
         * @type Boolean
         * @default false
         */
        plaintext: {
            type: Boolean,
            default: false
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
            default: defaultPropValue<string>(componentName, 'size'),
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
        /**
         * @description The aria-label of the clear button
         * @type String
         * @default Clear
         */
        clearAriaLabel: {
            type: String,
            default: 'Clear'
        }
    },
    emits: [
        /**
         * @event update:modelValue
         * @description Event emitted for setting the modelValue
         */
        'update:modelValue',
        /**
         * @event clear
         * @description Event emitted when clearing the input element
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
