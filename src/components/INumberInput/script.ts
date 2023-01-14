import { defineComponent } from 'vue';
import IButton from '@inkline/inkline/components/IButton/index.vue';
import IInput from '@inkline/inkline/components/IInput/index.vue';
import { uid } from '@inkline/inkline/helpers';
import { defaultPropValue, sizePropValidator } from '@inkline/inkline/mixins';
import { InputElementEvent } from '@inkline/inkline/types';

const componentName = 'INumberInput';

export default defineComponent({
    name: componentName,
    components: {
        IButton
    },
    extends: IInput,
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
         * The id of the internal input element
         * @type String
         * @default
         * @name id
         */
        id: {
            type: String,
            default: ''
        },
        /**
         * Used to set the field value
         * @type String | Number
         * @default
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
            default (): string {
                return uid('input');
            }
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
         * The minimum allowed input value
         * @type Number
         * @default -Infinity
         * @name min
         */
        min: {
            type: [Number, String],
            default: -Infinity
        },
        /**
         * The maximum allowed input value
         * @type Number
         * @default +Infinity
         * @name max
         */
        max: {
            type: [Number, String],
            default: Infinity
        },
        /**
         * The precision of the input value, for floating point numbers
         * @type Number
         * @default 0
         * @name precision
         */
        precision: {
            type: Number,
            default: 0
        },
        /**
         * The increment step to increase or decrease the value by
         * @type Number
         * @default 1
         * @name step
         */
        step: {
            type: Number,
            default: 1
        }
    },
    emits: [
        /**
         * Event emitted for setting the modelValue
         * @event update:modelValue
         */
        'update:modelValue'
    ],
    watch: {
        modelValue: {
            immediate: true,
            handler (value: string) {
                let newValue = (value || '').toString()
                    .replace(/^[^0-9-]/, '')
                    .replace(/^(-)[^0-9]/, '$1')
                    .replace(new RegExp(`^(-?[0-9]+)[^0-9${this.precision > 0 ? '.' : ''}]`), '$1');

                if (this.precision > 0) {
                    newValue = newValue
                        .replace(/^(-?[0-9]+\.)[^0-9]/, '$1')
                        .replace(new RegExp(`^(-?[0-9]+\\.[0-9]{0,${this.precision}}).*`), '$1');
                }

                if (parseFloat(newValue) >= parseFloat(this.max as string)) newValue = this.max.toString();
                if (parseFloat(newValue) <= parseFloat(this.min as string)) newValue = this.min.toString();

                (this.parent as any).onInput?.(this.name, newValue);
                this.$emit('update:modelValue', newValue);
            }
        }
    },
    methods: {
        decrease () {
            this.$emit('update:modelValue', this.formatPrecision((Number(this.modelValue) - this.step).toString()));
        },
        increase () {
            this.$emit('update:modelValue', this.formatPrecision((Number(this.modelValue) + this.step).toString()));
        },
        formatPrecision (value: string) {
            const parts = value.split('.');
            let decimals = parts[1] || '';

            for (let i = decimals.length; i < this.precision; i += 1) {
                decimals += '0';
            }

            return this.precision > 0 ? `${parts[0]}.${decimals}` : parts[0];
        },
        onBlurFormatPrecision (event: InputElementEvent) {
            this.$emit('update:modelValue', this.formatPrecision(Number(this.modelValue).toString()));

            (this.parent as any).onBlur?.(this.name, event);
        }
    }
});
