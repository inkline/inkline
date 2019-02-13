<script>
export default {
    methods: {
        /**
         * Handler for submit event
         */
        emitSubmit (event) {
            event.preventDefault();

            return this.$emit('submit', event);
        }
    }
};
</script>
