<script>
export default {
    methods: {
        /**
         * Handler for click event
         */
        onClick (event) {
            return this.$emit('click', event);
        }
    }
};
</script>
