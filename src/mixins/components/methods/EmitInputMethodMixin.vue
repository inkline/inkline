<script>
export default {
    methods: {
        /**
         * Handler for change event
         */
        emitInput (value) {
            return this.$emit('input', value);
        }
    }
};
</script>
