import IButton from '@inkline/inkline/src/components/IButton/index.vue';
import IInput from '@inkline/inkline/src/components/IInput/index.vue';
import { uid } from "@inkline/inkline/src/helpers";
import {colorPropDefault, sizePropDefault, sizePropValidator} from "@inkline/inkline/src/mixins/props";

const componentName = 'INumberInput';

export default {
    name: componentName,
    extends: IInput,
    components: {
        IButton
    },
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
            default: colorPropDefault(componentName)
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
            default: sizePropDefault(componentName),
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
    methods: {
        decrease() {
            this.$emit('update:modelValue', this.formatPrecision((Number(this.value) - this.step).toString()));
        },
        increase() {
            this.$emit('update:modelValue', this.formatPrecision((Number(this.value) + this.step).toString()));
        },
        formatPrecision (value) {
            const parts = value.split('.');
            let decimals = parts[1] || "";

            for (let i = decimals.length; i < this.precision; i += 1) {
                decimals += '0';
            }

            return this.precision > 0 ? `${parts[0]}.${decimals}` : parts[0];
        },
        onBlurFormatPrecision (event) {
            this.$emit('update:modelValue', this.formatPrecision(Number(this.value).toString()));
            this.emitBlur(event);
        },
    },
    watch: {
        value: {
            immediate: true,
            handler (value) {
                let newValue = value === undefined ? value : value.toString()
                    .replace(/^[^0-9-]/, '')
                    .replace(/^(-)[^0-9]/, '$1')
                    .replace(new RegExp(`^(-?[0-9]+)[^0-9${this.precision > 0 ? '.' : ''}]`), '$1');

                if (this.precision > 0) {
                    newValue = newValue
                        .replace(/^(-?[0-9]+\.)[^0-9]/, '$1')
                        .replace(new RegExp(`^(-?[0-9]+\\.[0-9]{0,${this.precision}}).*`), '$1');
                }

                if (parseFloat(newValue) >= parseFloat(this.max)) newValue = this.max.toString();
                if (parseFloat(newValue) <= parseFloat(this.min)) newValue = this.min.toString();

                this.$emit('update:modelValue', newValue);
            }
        }
    }
};
