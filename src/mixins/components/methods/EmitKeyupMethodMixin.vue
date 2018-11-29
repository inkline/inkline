<script>
export default {
    methods: {
        /**
         * Handler for keyup event
         */
        emitKeyup (value) {
            return this.$emit('keyup', value);
        }
    }
};
</script>
