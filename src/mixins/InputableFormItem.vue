<script>
export default {
    methods: {
        /**
         * Handler for change event
         */
        onInput (value) {
            return this.$emit('input', value);
        }
    }
};
</script>
