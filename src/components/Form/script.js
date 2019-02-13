import AttributesProviderMixin from '@inkline/inkline/src/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';

import EmitSubmitMethodMixin from '@inkline/inkline/src/mixins/forms/methods/EmitSubmitMethodMixin';

import DisabledPropertyMixin from '@inkline/inkline/src/mixins/components/properties/DisabledPropertyMixin';
import LoadingPropertyMixin from '@inkline/inkline/src/mixins/components/properties/LoadingPropertyMixin';
import NamePropertyMixin from '@inkline/inkline/src/mixins/forms/properties/NamePropertyMixin';
import ReadonlyPropertyMixin from '@inkline/inkline/src/mixins/forms/properties/ReadonlyPropertyMixin';
import SizePropertyMixin from '@inkline/inkline/src/mixins/components/properties/SizePropertyMixin';

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
    provide() {
        return {
            parentForm: this
        }
    },
    methods: {
        /**
         * Returns an array of the input's parent schemas starting from the root, and ending with the
         * input itself's schema.
         *
         * @param input
         * @returns {string[]}
         */
        getSchemaTree(input) {
            const parentFormGroupKeys = input.name
                .replace(/\[['"]?([^'"\]])['"]?]/g, '.$1')
                .split('.');

            return parentFormGroupKeys
                .map((group, index) => parentFormGroupKeys
                    .slice(0, index)
                    .reduce((acc, key) => acc && acc[key], this.schema))
                .concat(input.schema);
        },

        /**
         * Add required schema event listeners for one of the form's child inputs
         *
         * @param input
         */
        add(input) {
            const inputSchema = input.schema;
            const schemaTree = this.getSchemaTree(input);

            if (!schemaTree) {
                throw new Error(`Could not retrieve schema tree for input with name ${input.name}.`);
            }

            input.$on('blur', () => {
                schemaTree.forEach((schema) => {
                    schema.touched = true;
                    schema.untouched = false;
                });
            });

            input.$on(inputSchema.validateOn, (value) => {
                const status = inputSchema.$validate(value, {
                    getSchema: () => this.schema,
                });

                schemaTree.forEach((schema) => {
                    schema.errors = status.errors;
                    schema.valid = status.valid;
                    schema.invalid = !schema.valid;
                    schema.dirty = true;
                    schema.pristine = false;
                });

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
