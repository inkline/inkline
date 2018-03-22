<script>
export default {
    methods: {
        /**
         * Handler for change event
         */
        onChange (event) {
            return this.$emit('change', event.target.value);
        }
    }
};
</script>
