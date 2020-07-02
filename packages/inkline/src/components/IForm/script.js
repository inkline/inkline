import {
    AttributesProviderMixin,
    ClassesProviderMixin,
    DisabledPropertyMixin,
    LoadingPropertyMixin,
    NamePropertyMixin,
    ReadonlyPropertyMixin,
    SizePropertyMixin,
} from '@inkline/inkline/src/mixins';
import { eventValueMap } from '@inkline/inkline/src/constants';
import { FormBuilder } from '@inkline/inkline/src/factories/FormBuilder';

export default {
    name: 'IForm',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        DisabledPropertyMixin,
        LoadingPropertyMixin,
        ReadonlyPropertyMixin,
        SizePropertyMixin,
        NamePropertyMixin
    ],
    props: {
        inline: {
            type: Boolean,
            default: false
        },
        value: {
            type: Object,
            default: () => null
        }
    },
    provide() {
        return {
            parentForm: this
        }
    },
    created() {
        this.classesProvider.add(() => ({ '-inline': this.inline }));
    },
    methods: {
        /**
         * Retrieve form schema
         */
        getSchema() {
            return this.value;
        },

        /**
         * Callback on form control input event
         *
         * @param formControl
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
         */
        onFormControlBlur(formControl) {
            return () => {
                formControl.schema[FormBuilder.keys.TOUCH]({ getSchema: this.getSchema });
            };
        },

        /**
         * Callback on form control input event
         *
         * @param formControl
         */
        onFormControlValidate(formControl, event) {
            const eventFn = eventValueMap[event] ? eventValueMap[event] : eventValueMap.input;

            return (value) => {
                console.log(formControl.schema[FormBuilder.keys.VALIDATE])
                formControl.schema[FormBuilder.keys.VALIDATE](eventFn(value), { getSchema: this.getSchema });

                this.$emit('validate', this.value);
            };
        },

        /**
         * Retrieve validateOn field based as array of events, also taking the validation config into account
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
        emitSubmit (event) {
            event.preventDefault();

            if (this.value) {
                this.value[FormBuilder.keys.VALIDATE](this.validationOptions);

                if (this.value[FormBuilder.keys.INVALID]) {
                    return;
                }
            }

            return this.$emit('submit', event);
        }
    },
};
