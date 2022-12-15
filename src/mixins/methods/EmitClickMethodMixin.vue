<script>
export default {
    methods: {
        /**
         * Handler for click event
         */
        emitClick (event) {
            return this.$emit('click', event);
        }
    }
};
</script>
