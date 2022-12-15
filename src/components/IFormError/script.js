import { FormBuilder } from "@inkline/inkline/src/factories/FormBuilder";

export default {
    name: 'IFormError',
    props: {
        schema: {
            type: Object,
            default: () => null
        }
    },
    data() {
        return {
            errors: []
        };
    },
    watch: {
        ['schema.' + FormBuilder.keys.INVALID] (invalid) {
            if (invalid) {
                this.errors = Object.keys(this.schema[FormBuilder.keys.ERRORS])
                    .filter((key) => key !== 'length')
                    .map((key) => this.schema[FormBuilder.keys.ERRORS][key]);
            } else {
                this.errors = [];
            }
        }
    },
    computed: {
        hasErrors() {
            return this.schema[FormBuilder.keys.ERRORS] && this.schema[FormBuilder.keys.ERRORS].length > 0
        }
    },
    methods: {
        clearErrors() {
            this.errors = [];
        }
    }
};
