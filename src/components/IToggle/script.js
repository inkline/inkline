import { uid } from "@inkline/inkline/src/helpers";
import {
    colorVariantClass,
    sizePropValidator,
    FormComponentMixin,
    colorPropDefault,
    sizePropDefault
} from "@inkline/inkline/src/mixins";

/**
 * @name default
 * @kind slot
 * @description Slot for default checkbox label
 */

const componentName = 'IToggle';

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
         * @description The color variant of the checkbox
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: colorPropDefault(componentName)
        },
        /**
         * @description The disabled state of the checkbox
         * @type Boolean
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * @description The indeterminate state of the checkbox
         * @type Boolean
         * @default false
         */
        indeterminate: {
            type: Boolean,
            default: false
        },
        /**
         * @description Used to set the checkbox value when used inside a checkbox group
         * @default false
         */
        value: {
            default: false
        },
        /**
         * @description Used to set the checkbox value when used by itself
         * @default false
         */
        modelValue: {
            default: false
        },
        /**
         * @description The unique identifier of the checkbox
         * @type String
         * @default uid()
         */
        name: {
            type: [String, Number],
            default() {
                return uid('toggle');
            }
        },
        /**
         * @description The readonly state of the checkbox
         * @type Boolean
         * @default false
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * @description The size variant of the checkbox
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: sizePropDefault(componentName),
            validator: sizePropValidator
        },
        /**
         * @description The tabindex of the checkbox
         * @type Number | String
         * @default 1
         */
        tabindex: {
            type: [Number, String],
            default: 1
        },
    },
    computed: {
        classes() {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size),
                '-disabled': this.isDisabled,
                '-readonly': this.isReadonly
            };
        },
        checked() {
            if (this.schema) {
                return this.schema.value;
            }

            return this.modelValue;
        },
        tabIndex() {
            return this.isDisabled ? -1 : this.tabindex;
        }
    },
    methods: {
        clickInputRef() {
            if (this.isReadonly) {
                return;
            }

            this.$refs.input.click();
        },
        onChange(event) {
            this.parent.onInput?.(this.name, event.target.checked);

            this.$emit('update:modelValue', event.target.checked);
        },
        onBlur(event) {
            this.parent.onBlur?.(this.name, event);
        }
    }
};
