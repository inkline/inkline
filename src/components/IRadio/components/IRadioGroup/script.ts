import { defineComponent, PropType } from 'vue';
import {
    computedColorValue,
    sizePropValidator,
    FormComponentMixin,
    computedPropValue
} from '@inkline/inkline/mixins';
import { uid } from '@grozav/utils';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default radio group options
 * @name default
 * @kind slot
 */

const componentName = 'IRadioGroup';

export default defineComponent({
    name: componentName,
    mixins: [FormComponentMixin],
    inject: {
        formGroup: {
            default: (): any => ({})
        },
        form: {
            default: (): any => ({})
        }
    },
    provide() {
        return {
            formGroup: this
        };
    },
    props: {
        /**
         * The color variant of the radio group
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: computedPropValue<string>(componentName, 'color')
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
         * The error state of the checkbox, computed based on schema by default.
         * @type Boolean | Array
         * @default ['touched', 'dirty', 'invalid']
         * @TODO use propDefaultValue to set default value
         * @name error
         */
        error: {
            type: [Array, Boolean] as PropType<boolean | string[]>,
            default: () => ['touched', 'dirty', 'invalid']
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
            default() {
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
            default: computedPropValue<string>(componentName, 'size'),
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
        classes(): Classes {
            return {
                [`-${computedColorValue(componentName, this.color)}`]: true,
                [`-${this.size}`]: Boolean(this.size),
                '-disabled': this.isDisabled,
                '-readonly': this.isReadonly,
                '-inline': this.inline
                // '-error': hasError.value
            };
        },
        checked(): string {
            if (this.schema) {
                return this.schema.value;
            }

            return this.modelValue;
        }
    },
    methods: {
        onChange(value: string) {
            this.parent.onInput?.(this.name, value);

            this.$emit('update:modelValue', value);
        }
    }
});
