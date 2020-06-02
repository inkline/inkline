import {
    AttributesProviderMixin,
    ClassesProviderMixin,
    EmitSubmitMethodMixin,
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

        EmitSubmitMethodMixin,

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
         */
        onFormControlInput(input) {
            return (value) => {
                input.schema[FormBuilder.keys.VALUE] = value;

                this.$emit('input', this.value);
            };
        },

        /**
         * Callback on form control input event
         */
        onFormControlBlur(input) {
            return () => {
                input.schema[FormBuilder.keys.TOUCH]({ getSchema: this.getSchema });
            };
        },

        /**
         * Callback on form control input event
         */
        onFormControlValidate(input, event) {
            const eventFn = eventValueMap[event] ? eventValueMap[event] : eventValueMap.input;

            return (value) => {
                input.schema[FormBuilder.keys.VALIDATE](eventFn(value), { getSchema: this.getSchema });

                this.$emit('validate', this.schema);
            };
        },

        /**
         * Retrieve validateOn field based as array of events, also taking the validation config into account
         *
         * @param input
         * @returns {*}
         */
        getFormControlValidationEvents(input) {
            let validateOn = [];

            if (input.schema[FormBuilder.keys.VALIDATE_ON]) {
                validateOn = input.schema[FormBuilder.keys.VALIDATE_ON].constructor === Array ?
                    input.schema[FormBuilder.keys.VALIDATE_ON] :
                    [input.schema[FormBuilder.keys.VALIDATE_ON]];
            } else {
                validateOn = this.$inkline.config.validation.on;
            }

            return validateOn;
        },

        /**
         * Add required schema event listeners for one of the form's child inputs
         *
         * @param input
         */
        add(input) {
            input.$on('input', this.onFormControlInput(input));
            input.$on('blur', this.onFormControlBlur(input));

            this.getFormControlValidationEvents(input).forEach((event) => {
                input.$on(event, this.onFormControlValidate(input, event));
            });
        },

        /**
         * Remove event listeners for one of the form's child inputs
         *
         * @param input
         */
        remove(input) {
            input.$off('input', this.onFormControlInput(input));
            input.$off('blur', this.onFormControlBlur(input));

            this.getFormControlValidationEvents(input).forEach((event) => {
                input.$off(event, this.onFormControlValidate(input, event));
            });

            this.$emit('input', this.value);
        }
    },
};
