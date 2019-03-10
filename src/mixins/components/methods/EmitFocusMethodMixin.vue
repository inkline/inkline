<script>
export default {
    data() {
        return {
            focused: false
        };
    },
    methods: {
        /**
         * Handler for focus event
         */
        emitFocus (event) {
            this.focused = true;
            this.$emit('focus', event);
        },

        /**
         * Handler for blur event
         */
        emitBlur (event) {
            this.focused = false;
            this.$emit('blur', event);
        }
    }
};
</script>
