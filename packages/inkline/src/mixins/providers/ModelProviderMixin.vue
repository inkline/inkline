<script>
export default {
    props: {
        value: {
            type: [String, Number],
            default: ''
        }
    },
    computed: {
        /**
         * Bind the value of an individual form item
         */
        model: {
            get() {
                if (this.schema) {
                    return this.schema.value;
                }

                return this.value;
            },
            set (value) {
                return this.$emit('input', value);
            }
        }
    }
};
</script>
