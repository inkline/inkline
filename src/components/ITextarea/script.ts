import { defineComponent } from 'vue';
import { uid } from '@inkline/inkline/helpers';
import {
    defaultPropValue,
    sizePropValidator
} from '@inkline/inkline/mixins';
import IInput from '@inkline/inkline/components/IInput/index.vue';

/**
 * @name prefix
 * @kind slot
 * @description Slot for the textarea prefix content
 */

/**
 * @name suffix
 * @kind slot
 * @description Slot for the textarea suffix content
 */

/**
 * @name prepend
 * @kind slot
 * @description Slot for the textarea prepend content
 */

/**
 * @name append
 * @kind slot
 * @description Slot for the textarea append content
 */

/**
 * @name clearable
 * @kind slot
 * @description Slot for the clearable button
 * @property clear
 */

const componentName = 'ITextarea';

export default defineComponent({
    name: componentName,
    extends: IInput,
    props: {
        /**
         * @description The color variant of the textarea
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * @description Display the textarea as clearable
         * @type Boolean
         * @default false
         */
        clearable: {
            type: Boolean,
            default: false
        },
        /**
         * @description The disabled state of the textarea
         * @type Boolean
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * @description The id of the internal textarea element
         * @type String
         * @default
         */
        id: {
            type: String,
            default: ''
        },
        /**
         * @description Used to set the field value
         * @type Boolean
         * @default false
         */
        modelValue: {
            type: String,
            default: ''
        },
        /**
         * @description The unique identifier of the textarea
         * @type String
         * @default uid()
         */
        name: {
            type: [String, Number],
            default (): string {
                return uid('textarea');
            }
        },
        /**
         * @description The readonly state of the textarea
         * @type Boolean
         * @default false
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * @description The size variant of the textarea
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        },
        /**
         * @description The tabindex of the textarea
         * @type Number | String
         * @default 1
         */
        tabindex: {
            type: [Number, String],
            default: 1
        }
    },
    emits: [
        /**
         * @event update:modelValue
         * @description Event emitted for setting the modelValue
         */
        'update:modelValue'
    ]
});
