import {
    getValueByPath,
    setValueByPath,
    setValuesAlongPath,
    clone,
    uid
} from '@inkline/inkline/src/helpers';
import {
    colorVariantClass,
    defaultPropValue,
    sizePropValidator,
    FormComponentMixin
} from '@inkline/inkline/src/mixins';
import { validate } from "@inkline/inkline/src/validation";

/**
 * @name default
 * @kind slot
 * @description Slot for default card content
 */

const componentName = 'IForm';

export default {
    name: componentName,
    mixins: [
        FormComponentMixin
    ],
    emits: [
        /**
         * @event update:modelValue
         * @description Event emitted for setting the modelValue schema
         */
        'update:modelValue',
        /**
         * @event submit
         * @description Event emitted for submitting the form
         */
        'submit'
    ],
    inheritAttrs: false,
    props: {
        /**
         * @description The color variant of the form
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: ''
        },
        /**
         * @description The disabled state of the form
         * @type Boolean
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * @description Display the form as inline
         * @type Boolean
         * @default false
         */
        inline: {
            type: Boolean,
            default: false
        },
        /**
         * @description The loading state of the form
         * @type Boolean
         * @default false
         */
        loading: {
            type: Boolean,
            default: false
        },
        /**
         * @description The unique identifier of the form
         * @type String
         * @default uid()
         */
        name: {
            type: String,
            default() {
                return uid('form');
            }
        },
        /**
         * @description Used to set the form schema
         * @type Boolean
         * @default false
         */
        modelValue: {
            type: Object,
            default: () => null
        },
        /**
         * @description The readonly state of the form
         * @type Boolean
         * @default false
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * @description The size variant of the form
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
            form: this
        }
    },
    computed: {
        classes() {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size),
                '-disabled': this.isDisabled,
                '-readonly': this.isReadonly,
                '-inline': this.inline
            };
        },
        schema() {
            if (this.modelValue) {
                return this.modelValue;
            }

            return getValueByPath(this.formGroup.schema || this.form.schema || {}, this.name);
        }
    },
    methods: {
        onBlur(name, event) {
            this.parent.onBlur?.(this.name ? `${this.name}.${name}` : name, event);

            if (this.modelValue) {
                let schema = clone(this.modelValue);

                schema = setValuesAlongPath(schema, name, { untouched: false, touched: true });

                if (this.shouldValidate(name, 'blur')) {
                    schema = validate(schema);
                }

                this.$emit('update:modelValue', schema);
            }
        },
        onInput(name, value) {
            this.parent.onInput?.(this.name ? `${this.name}.${name}` : name, value);

            if (this.modelValue) {
                let schema = this.modelValue;

                schema = setValueByPath(schema, name, 'value', value);
                schema = setValuesAlongPath(schema, name, { pristine: false, dirty: true });

                if (this.shouldValidate(name, 'input')) {
                    schema = validate(schema);
                }

                this.$emit('update:modelValue', schema);
            }
        },
        onSubmit (event) {
            event.preventDefault();

            if (this.modelValue) {
                let schema = clone(this.modelValue);

                schema = validate(schema);

                this.$emit('update:modelValue', schema);

                if (schema.invalid) {
                    return;
                }
            }

            this.$emit('submit', event);
        },
        shouldValidate(path, eventName) {
            const targetSchema = getValueByPath(this.modelValue, path);
            const events = targetSchema.validateOn
                ? [].concat(targetSchema.validateOn)
                : this.$inkline.options.validateOn;

            return events.includes(eventName);
        }
    }
};
