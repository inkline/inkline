import { eventValueMap } from '@inkline/inkline/src/helpers/eventValueMap';
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
        schema: {
            type: Object,
            default: () => null
        }
    },
    data() {
        return {
            validationOptions: {
                getSchema: () => this.schema,
            }
        }
    },
    provide() {
        return {
            parentForm: this
        }
    },
    methods: {

        /**
         * Add required schema event listeners for one of the form's child inputs
         *
         * @param input
         */
        add(input) {
            const inputSchema = input.schema;
            const validateOn = inputSchema.validateOn.constructor === Array ?
                inputSchema.validateOn :
                [inputSchema.validateOn];

            input.$on('blur', () => {
                inputSchema.touch(this.validationOptions);
            });

            validateOn.forEach((event) => {
                const eventFn = eventValueMap.hasOwnProperty(event) ? eventValueMap[event] : eventValueMap.input;

                input.$on(event, (value) => {
                    inputSchema.validate(eventFn(value), this.validationOptions);

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
        }
    },
    created() {
        this.classesProvider.add(() => ({ '-inline': this.inline }));
    },
};
