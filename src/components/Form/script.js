import AttributesProviderMixin from '@inkline/inkline/src/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';

import EmitSubmitMethodMixin from '@inkline/inkline/src/mixins/forms/methods/EmitSubmitMethodMixin';

import DisabledPropertyMixin from '@inkline/inkline/src/mixins/components/properties/DisabledPropertyMixin';
import LoadingPropertyMixin from '@inkline/inkline/src/mixins/components/properties/LoadingPropertyMixin';
import NamePropertyMixin from '@inkline/inkline/src/mixins/forms/properties/NamePropertyMixin';
import ReadonlyPropertyMixin from '@inkline/inkline/src/mixins/forms/properties/ReadonlyPropertyMixin';
import SizePropertyMixin from '@inkline/inkline/src/mixins/components/properties/SizePropertyMixin';

import { eventValueMap } from '@inkline/inkline/src/helpers/eventValueMap';

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
