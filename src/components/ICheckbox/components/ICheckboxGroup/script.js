import {
    colorVariantClass,
    sizePropValidator,
    FormComponentMixin,
    defaultPropValue
} from "@inkline/inkline/src/mixins";
import { uid } from "@inkline/inkline/src/helpers";

/**
 * @name default
 * @kind slot
 * @description Slot for default checkbox group options
 */

const componentName = 'ICheckboxGroup';

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
         * @description The color variant of the checkbox group
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue(componentName, 'color')
        },
        /**
         * @description The disabled state of the checkbox group
         * @type Boolean
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * @description Display the checkbox group as inline
         * @type Boolean
         * @default false
         */
        inline: {
            type: Boolean,
            default: false
        },
        /**
         * @description The indeterminate state of the checkbox group
         * @type Boolean
         * @default false
         */
        indeterminate: {
            type: Boolean,
            default: false
        },
        /**
         * @description Used to set the checkbox group value
         * @default []
         */
        modelValue: {
            default: () => []
        },
        /**
         * @description The unique identifier of the checkbox group
         * @type String
         * @default uid()
         */
        name: {
            type: [String, Number],
            default() {
                return uid('checkbox-group');
            }
        },
        /**
         * @description The readonly state of the checkbox group
         * @type Boolean
         * @default false
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * @description The size variant of the checkbox group
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: defaultPropValue(componentName, 'size'),
            validator: sizePropValidator
        }
    },
    provide() {
        return {
            formGroup: this
        }
    },
    computed: {
        classes() {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size),
                '-disabled': this.isDisabled,
                '-readonly': this.isReadonly,
                '-inline': this.inline,
            }
        },
        checked() {
            if (this.schema) {
                return this.schema.value;
            }

            return this.modelValue;
        },
    },
    methods: {
        onChange(value) {
            const modelValue = [...this.modelValue];
            const valueIndex = modelValue.findIndex((v) => v === value);

            if (valueIndex !== -1) {
                modelValue.splice(valueIndex, 1);
            } else {
                modelValue.push(value);
            }

            this.parent.onInput?.(this.name, modelValue);

            this.$emit('update:modelValue', modelValue);
        }
    }
};
