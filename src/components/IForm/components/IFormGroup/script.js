import {
    colorVariantClass,
    defaultPropValue,
    sizePropValidator,
    FormComponentMixin
} from '@inkline/inkline/src/mixins';

/**
 * @name default
 * @kind slot
 * @description Slot for default form group content
 */

const componentName = 'IFormGroup';

export default {
    name: componentName,
    mixins: [
        FormComponentMixin
    ],
    props: {
        /**
         * @description The color variant of the form group
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue(componentName, 'color')
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
            default: defaultPropValue(componentName, 'size'),
            validator: sizePropValidator
        }
    },
    provide() {
        return {
            formGroup: this
        };
    },
    computed: {
        classes() {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size),
                '-disabled': this.isDisabled,
                '-readonly': this.isReadonly,
                '-inline': this.inline,
                // @TODO '-error': this.input && this.input.schema?.$invalid,
                '-required': this.required // @TODO Add required state based on required validator this.input.schema?.validators.some(v => v.name === 'required')
            }
        }
    },
    methods: {
        onBlur(name, event) {
            if (this.parent) {
                this.parent.onBlur(this.name ? `${this.name}.${name}` : name, event);
            }
        },
        onInput(name, value) {
            if (this.parent) {
                this.parent.onInput(this.name ? `${this.name}.${name}` : name, value);
            }
        }
    }
};
