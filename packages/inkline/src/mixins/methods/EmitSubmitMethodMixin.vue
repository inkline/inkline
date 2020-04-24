<script>
export default {
    methods: {
        /**
         * Handler for submit event
         */
        emitSubmit (event) {
            event.preventDefault();

            if (this.schema) {
                this.schema.validate(this.validationOptions);

                if (this.schema.invalid) {
                    return;
                }
            }

            return this.$emit('submit', event);
        }
    }
};
</script>
