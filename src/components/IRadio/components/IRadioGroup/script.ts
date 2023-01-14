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
 * Slot for default radio group options
 * @name default
 * @kind slot
 */

const componentName = 'IRadioGroup';

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
         * The color variant of the radio group
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * The disabled state of the radio group
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Display the radio group as inline
         * @type Boolean
         * @default false
         * @name inline
         */
        inline: {
            type: Boolean,
            default: false
        },
        /**
         * Used to set the radio group value
         * @default ''
         * @name modelValue
         */
        modelValue: {
            default: ''
        },
        /**
         * The unique identifier of the radio group
         * @type String
         * @default uid()
         * @name name
         */
        name: {
            type: [String, Number],
            default () {
                return uid('radio-group');
            }
        },
        /**
         * The readonly state of the radio group
         * @type Boolean
         * @default false
         * @name readonly
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * The size variant of the radio group
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
        checked (): string {
            if (this.schema) {
                return this.schema.value;
            }

            return this.modelValue;
        }
    },
    methods: {
        onChange (value: string) {
            this.parent.onInput?.(this.name, value);

            this.$emit('update:modelValue', value);
        }
    }
});
