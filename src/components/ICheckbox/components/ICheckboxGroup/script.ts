import { defineComponent } from 'vue';
import {
    colorVariantClass,
    sizePropValidator,
    FormComponentMixin,
    defaultPropValue
} from '@inkline/inkline/mixins';
import { uid } from '@inkline/inkline/helpers';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default checkbox group options
 * @name default
 * @kind slot
 */

const componentName = 'ICheckboxGroup';

export default defineComponent({
    name: componentName,
    mixins: [
        FormComponentMixin
    ],
    provide () {
        return {
            formGroup: this
        };
    },
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the checkbox group
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * The disabled state of the checkbox group
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Display the checkbox group as inline
         * @type Boolean
         * @default false
         * @name inline
         */
        inline: {
            type: Boolean,
            default: false
        },
        /**
         * The indeterminate state of the checkbox group
         * @type Boolean
         * @default false
         * @name indeterminate
         */
        indeterminate: {
            type: Boolean,
            default: false
        },
        /**
         * Used to set the checkbox group value
         * @default []
         * @name modelValue
         */
        modelValue: {
            default: (): any[] => []
        },
        /**
         * The unique identifier of the checkbox group
         * @type String
         * @default uid()
         * @name name
         */
        name: {
            type: [String, Number],
            default () {
                return uid('checkbox-group');
            }
        },
        /**
         * The readonly state of the checkbox group
         * @type Boolean
         * @default false
         * @name readonly
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * The size variant of the checkbox group
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        }
    },
    emits: [
        /**
         * Event emitted for setting the modelValue
         * @event update:modelValue
         */
        'update:modelValue'
    ],
    computed: {
        classes (): Classes {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size),
                '-disabled': this.isDisabled,
                '-readonly': this.isReadonly,
                '-inline': this.inline
            };
        },
        checked (): any[] {
            if (this.schema) {
                return this.schema.value;
            }

            return this.modelValue;
        }
    },
    methods: {
        onChange (value: any) {
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
});
