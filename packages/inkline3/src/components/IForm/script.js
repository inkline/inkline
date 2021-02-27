import {
    colorVariantClass,
    sizePropValidator
} from '@inkline/inkline/src/mixins';
import { eventValueMap } from '@inkline/inkline/src/constants';

/**
 * @name default
 * @kind slot
 * @description Slot for default card content
 */

export default {
    name: 'IForm',
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
    inject: {
        formGroup: {
            default: () => ({})
        },
        form: {
            default: () => ({})
        }
    },
    computed: {
        isDisabled() {
            return this.disabled || this.form.isDisabled || this.formGroup.isDisabled;
        },
        isReadonly() {
            return this.readonly || this.form.isReadonly || this.formGroup.isReadonly;
        },
        classes() {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size),
                '-disabled': this.isDisabled,
                '-readonly': this.isReadonly,
                '-inline': this.inline
            };
        }
    },
    methods: {
        /**
         * Retrieve form schema
         * @TODO REMOVE
         */
        getSchema() {
            return this.value;
        },

        /**
         * Callback on form control input event
         *
         * @param formControl
         * @TODO REMOVE
         */
        onFormControlInput(formControl) {
            return (value) => {
                formControl.schema[FormBuilder.keys.VALUE] = value;

                this.$emit('input', this.value);
            };
        },

        /**
         * Callback on form control input event
         *
         * @param formControl
         * @TODO REMOVE
         */
        onFormControlBlur(formControl) {
            return () => {
                formControl.schema[FormBuilder.keys.TOUCH]({ getSchema: this.getSchema });
            };
        },

        /**
         * Callback on form control input event
         * @TODO REMOVE
         *
         * @param formControl
         */
        onFormControlValidate(formControl, event) {
            const eventFn = eventValueMap[event] ? eventValueMap[event] : eventValueMap.input;

            return (value) => {
                formControl.schema[FormBuilder.keys.VALIDATE](eventFn(value), { getSchema: this.getSchema });

                this.$emit('validate', this.value);
            };
        },

        /**
         * Retrieve validateOn field based as array of events, also taking the validation config into account
         * @TODO REMOVE
         *
         * @param formControl
         */
        getFormControlValidationEvents(formControl) {
            let validateOn = [];

            if (formControl.schema[FormBuilder.keys.VALIDATE_ON]) {
                validateOn = formControl.schema[FormBuilder.keys.VALIDATE_ON].constructor === Array ?
                    formControl.schema[FormBuilder.keys.VALIDATE_ON] :
                    [formControl.schema[FormBuilder.keys.VALIDATE_ON]];
            } else {
                validateOn = this.$inkline.config.validation.validateOn;
            }

            return validateOn;
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

        /**
         * Handler for submit event
         */
        onSubmit (event) {
            event.preventDefault();

            if (this.modelValue) {
                /**
                 * @TODO do not store validate() in modelValue
                 */
                this.modelValue[FormBuilder.keys.VALIDATE](this.validationOptions);

                if (this.modelValue.$invalid) {
                    return;
                }
            }

            this.$emit('submit', event);
        }
    },
};
