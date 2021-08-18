import { defineComponent } from 'vue';
import { uid } from '../../helpers';
import { defaultPropValue, sizePropValidator } from '../../mixins';
import IInput from '../IInput/index.vue';
/**
 * @name prefix
 * @kind slot
 * @description Slot for the input prefix content
 */
/**
 * @name suffix
 * @kind slot
 * @description Slot for the input suffix content
 */
/**
 * @name prepend
 * @kind slot
 * @description Slot for the input prepend content
 */
/**
 * @name append
 * @kind slot
 * @description Slot for the input append content
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
         * @description The color variant of the input
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue(componentName, 'color')
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
         * @type Boolean
         * @default false
         */
        modelValue: {
            type: String,
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
            default: defaultPropValue(componentName, 'size'),
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
        }
    },
    emits: [
        /**
         * @event update:modelValue
         * @description Event emitted for setting the modelValue
         */
        'update:modelValue'
    ],
});
//# sourceMappingURL=script.js.map