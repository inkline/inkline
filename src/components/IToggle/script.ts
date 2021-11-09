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
 * @name default
 * @kind slot
 * @description Slot for default checkbox label
 */

const componentName = 'IToggle';

export default defineComponent({
    name: componentName,
    mixins: [
        FormComponentMixin
    ],
    props: {
        /**
         * @description The color variant of the checkbox
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
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
            default (): string {
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
            default: defaultPropValue<string>(componentName, 'size'),
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
                '-readonly': this.isReadonly
            };
        },
        checked (): boolean {
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

            this.$emit('update:modelValue', event.target.checked);
        },
        onBlur (event: InputElementEvent) {
            this.parent.onBlur?.(this.name, event);
        }
    }
});
