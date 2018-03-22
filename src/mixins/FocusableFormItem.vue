<script>
export default {
    methods: {
        /**
         * Trigger input focus state
         */
        focus () {
            this.$refs.input.focus();
        },

        /**
         * Handler for focus event
         */
        onFocus (event) {
            this.focused = true;
            this.$emit('focus', event);
        },

        /**
         * Handler for blur event
         */
        onBlur (event) {
            this.focused = false;
            this.$emit('blur', event);
        }
    }
};
</script>
