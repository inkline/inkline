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
 * Slot for default radio label
 * @name default
 * @kind slot
 */

const componentName = 'IRadio';

export default defineComponent({
    name: componentName,
    mixins: [
        FormComponentMixin
    ],
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the radio
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * The disabled state of the radio
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * The indeterminate state of the radio
         * @type Boolean
         * @default false
         * @name indeterminate
         */
        indeterminate: {
            type: Boolean,
            default: false
        },
        /**
         * Used to set the radio value when used inside a radio group
         * @default ''
         * @name value
         */
        value: {
            default: ''
        },
        /**
         * Used to set the radio value when used by itself
         * @default false
         * @name modelValue
         */
        modelValue: {
            default: false
        },
        /**
         * The unique identifier of the radio
         * @type String
         * @default uid()
         * @name name
         */
        name: {
            type: [String, Number],
            default () {
                return uid('radio');
            }
        },
        /**
         * Displays the native browser radio input indicator
         * @type Boolean
         * @default false
         * @name native
         */
        native: {
            type: Boolean,
            default: false
        },
        /**
         * The readonly state of the radio
         * @type Boolean
         * @default false
         * @name readonly
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * The size variant of the radio
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
         * The tabindex of the radio
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
            return (this as any).formGroup.checked === this.value;
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

            // When inside a Radio Group
            (this as any).formGroup.onChange?.(this.value);

            this.$emit('update:modelValue', event.target.checked);
        },
        onBlur (event: InputElementEvent) {
            this.parent.onBlur?.(this.name, event);
        }
    }
});
