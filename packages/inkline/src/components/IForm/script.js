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
import { eventValueMap } from "@inkline/inkline/src/constants";

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
         * Add required schema event listeners for one of the form's child inputs
         *
         * @param input
         */
        add(input) {
            const inputSchema = input.schema;
            let validateOn = [];

            if (inputSchema.validateOn) {
                validateOn = inputSchema.validateOn.constructor === Array ?
                    inputSchema.validateOn : [inputSchema.validateOn];
            } else {
                validateOn = this.$inkline.config.validation.on;
            }

            input.$on('input', (value) => {
                inputSchema.value = value;

                this.$emit('input', this.value);
            });

            input.$on('blur', () => {
                inputSchema.touch({ getSchema: this.getSchema });
            });

            validateOn.forEach((event) => {
                const eventFn = eventValueMap.hasOwnProperty(event) ? eventValueMap[event] : eventValueMap.input;

                input.$on(event, (value) => {
                    inputSchema.validate(eventFn(value), { getSchema: this.getSchema });

                    this.$emit('validate', this.schema);
                });
            });
        },

        /**
         * Remove event listeners for one of the form's child inputs
         *
         * @param input
         */
        remove(input) {
            const inputSchema = input.schema;

            input.$off('blur');
            input.$off(inputSchema.validateOn);

            this.$emit('input', this.value);
        }
    },
};
