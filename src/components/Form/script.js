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
        getSchema(input) {
            return input.name && input.name
                .replace(/\[['"]?([^'"\]])['"]?]/g, '.$1')
                .split('.')
                .reduce((acc, key) => acc && acc[key], this.schema);
        },
        getInputSchema(input) {
            const result = [];
            const schemaTree = input.name && input.name
                .replace(/\[['"]?([^'"\]])['"]?]/g, '.$1')
                .split('.');

            for (let i = 0; i <= schemaTree.length - 1; i++) {
                result.push(schemaTree.slice(0, i).reduce((acc, key) => acc && acc[key], this.schema));
            }

            return result;
        },
        add(input) {
            const inputSchema = this.getInputSchema(input);

            console.log(inputSchema);

            if (!inputSchema) { return; }

            input.$on('blur', () => {
                inputSchema.touched = true;
                inputSchema.untouched = false;
                this.schema.touched = true;
                this.schema.untouched = false;
            });

            input.$on(inputSchema.validateOn, (value) => {
                const status = inputSchema.validate(value);

                inputSchema.errors = status.errors;
                inputSchema.valid = status.valid;
                inputSchema.invalid = !inputSchema.valid;
                inputSchema.dirty = true;
                inputSchema.pristine = false;

                this.schema.valid = this.schema.valid && inputSchema.valid;
                this.schema.invalid = !this.schema.valid;
                this.schema.dirty = true;
                this.schema.pristine = false;
            });
        },
        remove(input) {
            input.$off('input');
        }
    },
    created() {
        this.classesProvider.add(() => ({ '-inline': this.inline }));
    },
};
