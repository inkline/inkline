<script>
export default {
    methods: {
        /**
         * Handler for keydown event
         */
        emitKeydown (value) {
            return this.$emit('keydown', value);
        }
    }
};
</script>
