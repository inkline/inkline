<script>
export default {
    methods: {
        /**
         * Handler for keydown event
         */
        emitKeydown (value) {
            return this.$emit('keydown', value);
        },
        /**
         * Handler for keyup event
         */
        emitKeyup (value) {
            return this.$emit('keyup', value);
        }
    }
};
</script>
