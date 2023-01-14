import { defineComponent } from 'vue';
import { uid } from '@inkline/inkline/helpers';
import {
    defaultPropValue,
    sizePropValidator
} from '@inkline/inkline/mixins';
import IInput from '@inkline/inkline/components/IInput/index.vue';

/**
 * Slot for the textarea prefix content
 * @name prefix
 * @kind slot
 */

/**
 * Slot for the textarea suffix content
 * @name suffix
 * @kind slot
 */

/**
 * Slot for the textarea prepend content
 * @name prepend
 * @kind slot
 */

/**
 * Slot for the textarea append content
 * @name append
 * @kind slot
 */

/**
 * Slot for the clearable button
 * @name clearable
 * @kind slot
 * @property clear
 */

const componentName = 'ITextarea';

export default defineComponent({
    name: componentName,
    extends: IInput,
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the textarea
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * Display the textarea as clearable
         * @type Boolean
         * @default false
         * @name clearable
         */
        clearable: {
            type: Boolean,
            default: false
        },
        /**
         * The disabled state of the textarea
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * The id of the internal textarea element
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
         * @type Boolean
         * @default false
         * @name modelValue
         */
        modelValue: {
            type: String,
            default: ''
        },
        /**
         * The unique identifier of the textarea
         * @type String
         * @default uid()
         * @name name
         */
        name: {
            type: [String, Number],
            default (): string {
                return uid('textarea');
            }
        },
        /**
         * The readonly state of the textarea
         * @type Boolean
         * @default false
         * @name readonly
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * The size variant of the textarea
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
         * The tabindex of the textarea
         * @type Number | String
         * @default 0
         * @name tabindex
         */
        tabindex: {
            type: [Number, String],
            default: 0
        }
    },
    emits: [
        /**
         * Event emitted for setting the modelValue
         * @event update:modelValue
         */
        'update:modelValue'
    ]
});
