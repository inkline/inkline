import { defineComponent } from 'vue';
import {
    colorVariantClass,
    defaultPropValue,
    sizePropValidator,
    FormComponentMixin
} from '@inkline/inkline/mixins';
import { Classes, InputElementEvent } from '@inkline/inkline/types';

/**
 * @name default
 * @kind slot
 * @description Slot for default form group content
 */

const componentName = 'IFormGroup';

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
         * @description The color variant of the form group
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * @description The disabled state of the form group
         * @type Boolean
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * @description Display the form group as inline
         * @type Boolean
         * @default false
         */
        inline: {
            type: Boolean,
            default: false
        },
        /**
         * @description The identifier of the form group
         * @type String
         * @default
         */
        name: {
            type: String,
            default: ''
        },
        /**
         * @description The readonly state of the form group
         * @type Boolean
         * @default false
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * @description The required state of the form group
         * @type Boolean
         * @default false
         */
        required: {
            type: Boolean,
            default: false
        },
        /**
         * @description The size variant of the form group
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        }
    },
    computed: {
        classes (): Classes {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size),
                '-disabled': this.isDisabled,
                '-readonly': this.isReadonly,
                '-inline': this.inline,
                // @TODO '-error': this.input && this.input.schema?.$invalid,
                '-required': this.required // @TODO Add required state based on required validator this.input.schema?.validators.some(v => v.name === 'required')
            };
        }
    },
    methods: {
        onBlur (name: string, event: InputElementEvent) {
            this.parent?.onBlur?.(this.name ? `${this.name}.${name}` : name, event);
        },
        onInput (name: string, value: any) {
            this.parent?.onInput?.(this.name ? `${this.name}.${name}` : name, value);
        }
    }
});
