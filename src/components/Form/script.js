import AttributesProviderMixin from '@inkline/inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/mixins/components/providers/ClassesProviderMixin';

import EmitSubmitMethodMixin from '@inkline/inkline/mixins/forms/methods/EmitSubmitMethodMixin';

import DisabledPropertyMixin from '@inkline/inkline/mixins/components/properties/DisabledPropertyMixin';
import LoadingPropertyMixin from '@inkline/inkline/mixins/components/properties/LoadingPropertyMixin';
import NamePropertyMixin from '@inkline/inkline/mixins/forms/properties/NamePropertyMixin';
import ReadonlyPropertyMixin from '@inkline/inkline/mixins/forms/properties/ReadonlyPropertyMixin';
import SizePropertyMixin from '@inkline/inkline/mixins/components/properties/SizePropertyMixin';

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
            default: () => ({})
        }
    },
    data () {
        return {
            validationOptions: {
                getSchema: () => this.schema,
            }
        }
    },
    provide () {
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

            input.$on('blur', () => {
                inputSchema.$touch(this.validationOptions);
            });

            input.$on(inputSchema.validateOn, (value) => {
                inputSchema.$validate(value, this.validationOptions);

                this.$emit('validate', this.schema);
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
