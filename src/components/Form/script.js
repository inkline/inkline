import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';

import EmitInputMethodMixin from 'inkline/mixins/components/methods/EmitInputMethodMixin';

import DisabledPropertyMixin from 'inkline/mixins/components/properties/DisabledPropertyMixin';
import LoadingPropertyMixin from 'inkline/mixins/components/properties/LoadingPropertyMixin';
import NamePropertyMixin from 'inkline/mixins/forms/properties/NamePropertyMixin';
import ReadonlyPropertyMixin from 'inkline/mixins/forms/properties/ReadonlyPropertyMixin';
import SizePropertyMixin from 'inkline/mixins/components/properties/SizePropertyMixin';

import * as validators from 'inkline/validators';

export default {
    name: 'IForm',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,

        EmitInputMethodMixin,

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
        getSchemaTree(input) {
            const parentFormGroupKeys = input.name
                .replace(/\[['"]?([^'"\]])['"]?]/g, '.$1')
                .split('.');

            return parentFormGroupKeys.map((group, index) => parentFormGroupKeys
                .slice(0, index)
                .reduce((acc, key) => acc && acc[key], this.schema))
                .concat(input.schema);
        },
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
                const status = inputSchema.$validate(value);

                schemaTree.forEach((schema) => {
                    schema.errors = status.errors;
                    schema.valid = status.valid;
                    schema.invalid = !schema.valid;
                    schema.dirty = true;
                    schema.pristine = false;
                });
            });
        },
        remove(input) {
            const inputSchema = input.schema;

            input.$off(inputSchema.validateOn);
        }
    },
    created() {
        this.classesProvider.add(() => ({ '-inline': this.inline }));
    },
};
