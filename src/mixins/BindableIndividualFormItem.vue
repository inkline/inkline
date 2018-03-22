<script>
export default {
    computed: {
        /**
         * Get the value of the individual form item
         */
        currentValue () {
            return this.value;
        },

        /**
         * Bind the value of an individual form item
         */
        model: {
            get () {
                return this.value;
            },
            set (value) {
                return this.onInput(value);
            }
        }
    }
};
</script>
