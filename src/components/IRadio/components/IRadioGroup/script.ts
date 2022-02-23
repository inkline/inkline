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
 * @name default
 * @kind slot
 * @description Slot for default radio group options
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
    props: {
        /**
         * @description The color variant of the radio group
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * @description The disabled state of the radio group
         * @type Boolean
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * @description Display the radio group as inline
         * @type Boolean
         * @default false
         */
        inline: {
            type: Boolean,
            default: false
        },
        /**
         * @description Used to set the radio group value
         * @default ''
         */
        modelValue: {
            default: ''
        },
        /**
         * @description The unique identifier of the radio group
         * @type String
         * @default uid()
         */
        name: {
            type: [String, Number],
            default () {
                return uid('radio-group');
            }
        },
        /**
         * @description The readonly state of the radio group
         * @type Boolean
         * @default false
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * @description The size variant of the radio group
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        }
    },
    emits: [
        /**
         * @event update:modelValue
         * @description Event emitted for setting the modelValue
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
