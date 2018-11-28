<script>
export default {
    methods: {
        /**
         * Handler for change event
         */
        emitChange (event) {
            return this.$emit('change', event.target.value);
        }
    }
};
</script>
