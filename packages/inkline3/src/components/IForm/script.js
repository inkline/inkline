import {
    getValueByPath,
    setValueByPath,
    setValuesAlongPath,
    clone,
    uid,
    validateFormGroup
} from '@inkline/inkline/src/helpers';
import {
    colorVariantClass,
    sizePropValidator
} from '@inkline/inkline/src/mixins';
import { FormComponentMixin } from '@inkline/inkline/src/mixins';

/**
 * @name default
 * @kind slot
 * @description Slot for default card content
 */

export default {
    name: 'IForm',
    mixins: [
        FormComponentMixin
    ],
    emits: [
        /**
         * @event update:modelValue
         * @description Event emitted for setting the modelValue schema
         */
        'update:modelValue'
    ],
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
            default: '',
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
            this.parent.onBlur?.(`${this.name}.${name}`, event);

            if (this.modelValue) {
                let schema = clone(this.modelValue);

                schema = setValuesAlongPath(schema, name, { untouched: false, touched: true });

                if (this.shouldValidate(name, 'blur')) {
                    schema = validateFormGroup(schema);
                }

                this.$emit('update:modelValue', schema);
            }
        },
        onInput(name, value) {
            this.parent.onInput?.(`${this.name}.${name}`, value);

            if (this.modelValue) {
                let schema = clone(this.modelValue);

                schema = setValueByPath(schema, name, 'value', value);
                schema = setValuesAlongPath(schema, name, { pristine: false, dirty: true });

                if (this.shouldValidate(name, 'input')) {
                    schema = validateFormGroup(schema);
                }

                this.$emit('update:modelValue', schema);
            }
        },
        onSubmit (event) {
            event.preventDefault();

            if (this.modelValue) {
                let schema = clone(this.modelValue);

                schema = validateFormGroup(schema);

                this.$emit('update:modelValue', schema);

                if (schema.invalid) {
                    return;
                }
            }

            console.log('submitting')

            this.$emit('submit', event);
        },
        shouldValidate(path, eventName) {
            const targetSchema = getValueByPath(this.modelValue, path);
            const events = this.$inkline.options.validateOn.concat(targetSchema.validateOn || []);

            return events.includes(eventName);
        },





        /**
         * Add required schema event listeners for one of the form's child inputs
         *
         * @TODO REMOVE
         * @param formControl
         */
        add(formControl) {
            formControl.$on('input', this.onFormControlInput(formControl));
            formControl.$on('blur', this.onFormControlBlur(formControl));

            this.getFormControlValidationEvents(formControl).forEach((event) => {
                formControl.$on(event, this.onFormControlValidate(formControl, event));
            });
        },

        /**
         * Remove event listeners for one of the form's child inputs
         * @TODO REMOVE
         *
         * @param formControl
         */
        remove(formControl) {
            formControl.$off('input', this.onFormControlInput(formControl));
            formControl.$off('blur', this.onFormControlBlur(formControl));

            this.getFormControlValidationEvents(formControl).forEach((event) => {
                formControl.$off(event, this.onFormControlValidate(formControl, event));
            });

            this.$emit('input', this.value);
        },

    },
};
