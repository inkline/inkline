<script>
export default {
    data () {
        return {
            focused: false
        };
    },
    methods: {
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
