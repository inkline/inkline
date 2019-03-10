<script>
export default {
    data() {
        return {
            hovered: false
        };
    },
    methods: {
        /**
         * Handler for focus event
         */
        emitMouseEnter (event) {
            this.hovered = true;
            this.$emit('mouseenter', event);
        },

        /**
         * Handler for blur event
         */
        emitMouseLeave (event) {
            this.hovered = false;
            this.$emit('mouseleave', event);
        }
    }
};
</script>
