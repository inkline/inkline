import { defineComponent } from 'vue';
import { uid } from '@inkline/inkline/helpers';
import {
    colorVariantClass,
    sizePropValidator,
    FormComponentMixin,
    defaultPropValue
} from '@inkline/inkline/mixins';
import { Classes, InputElementEvent } from '@inkline/inkline/types';

/**
 * Slot for default checkbox label
 * @name default
 * @kind slot
 */

const componentName = 'ICheckbox';

export default defineComponent({
    name: componentName,
    mixins: [
        FormComponentMixin
    ],
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the checkbox
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * The disabled state of the checkbox
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * The indeterminate state of the checkbox
         * @type Boolean
         * @default false
         * @name indeterminate
         */
        indeterminate: {
            type: Boolean,
            default: false
        },
        /**
         * Used to set the checkbox value when used inside a checkbox group
         * @default false
         * @name value
         */
        value: {
            default: false
        },
        /**
         * Used to set the checkbox value when used by itself
         * @default false
         * @name modelValue
         */
        modelValue: {
            default: false
        },
        /**
         * The unique identifier of the checkbox
         * @type String
         * @default uid()
         * @name name
         */
        name: {
            type: [String, Number],
            default () {
                return uid('checkbox');
            }
        },
        /**
         * Displays the native browser checkbox input indicator
         * @type Boolean
         * @default false
         * @name native
         */
        native: {
            type: Boolean,
            default: false
        },
        /**
         * The readonly state of the checkbox
         * @type Boolean
         * @default false
         * @name readonly
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * The size variant of the checkbox
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
         * The tabindex of the checkbox
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
    ],
    computed: {
        classes (): Classes {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size),
                '-disabled': this.isDisabled,
                '-readonly': this.isReadonly,
                '-native': this.native
            };
        },
        checked (): boolean {
            // When inside a Checkbox Group
            if ((this as any).formGroup.checked) {
                return (this as any).formGroup.checked.includes(this.value);
            }

            if (this.schema) {
                return this.schema.value;
            }

            return this.modelValue;
        },
        tabIndex (): number | string {
            return this.isDisabled ? -1 : this.tabindex;
        }
    },
    methods: {
        clickInputRef () {
            if (this.isReadonly) {
                return;
            }

            (this as any).$refs.input.click();
        },
        onChange (event: InputElementEvent) {
            this.parent.onInput?.(this.name, event.target.checked);

            // When inside a Checkbox Group
            (this as any).formGroup.onChange?.(this.value);

            this.$emit('update:modelValue', event.target.checked);
        },
        onBlur (event: InputElementEvent) {
            this.parent.onBlur?.(this.name, event);
        }
    }
});
