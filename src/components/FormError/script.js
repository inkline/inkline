export default {
    name: 'IFormError',
    props: {
        schema: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            errors: []
        };
    },
    watch: {
        'schema.invalid' (invalid) {
            if (invalid) {
                this.errors = Object.keys(this.schema.errors)
                    .filter((key) => key !== 'length')
                    .map((key) => this.schema.errors[key]);
            } else {
                this.errors = [];
            }
        }
    },
    methods: {
        clearErrors() {
            this.errors = [];
        }
    }
};
