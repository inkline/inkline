<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    computed: {
        /**
         * Get the value of the individual form item
         */
        currentValue() {
            return this.value;
        },

        /**
         * Bind the value of an individual form item
         */
        model: {
            get() {
                return this.value;
            },
            set (value) {
                return this.$emit('input', value);
            }
        }
    }
};
</script>
