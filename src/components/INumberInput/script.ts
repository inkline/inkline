import { defineComponent } from 'vue';
import IButton from '@inkline/inkline/components/IButton/index.vue';
import IInput from '@inkline/inkline/components/IInput/index.vue';
import { uid } from '@inkline/inkline/helpers';
import { defaultPropValue, sizePropValidator } from '@inkline/inkline/mixins/props';
import { InputElementEvent } from '@inkline/inkline/types';

const componentName = 'INumberInput';

export default defineComponent({
    name: componentName,
    components: {
        IButton
    },
    extends: IInput,
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
         * @type String | Number
         * @default
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
            default (): string {
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
         * @description The minimum allowed input value
         * @type Number
         * @default -Infinity
         */
        min: {
            type: [Number, String],
            default: -Infinity
        },
        /**
         * @description The maximum allowed input value
         * @type Number
         * @default +Infinity
         */
        max: {
            type: [Number, String],
            default: Infinity
        },
        /**
         * @description The precision of the input value, for floating point numbers
         * @type Number
         * @default 0
         */
        precision: {
            type: Number,
            default: 0
        },
        /**
         * @description The increment step to increase or decrease the value by
         * @type Number
         * @default 1
         */
        step: {
            type: Number,
            default: 1
        }
    },
    emits: [
        /**
         * @event update:modelValue
         * @description Event emitted for setting the modelValue
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
