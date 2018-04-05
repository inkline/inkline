<script>
export default {
    data () {
        return {
            hovered: false
        };
    },
    methods: {
        /**
         * Handler for focus event
         */
        onMouseEnter (event) {
            this.hovered = true;
            this.$emit('mouseenter', event);
        },

        /**
         * Handler for blur event
         */
        onMouseLeave (event) {
            this.hovered = false;
            this.$emit('mouseleave', event);
        }
    }
};
</script>
