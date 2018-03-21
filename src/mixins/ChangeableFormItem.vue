<script>
/**
 * Handler for change event
 */
function onChange (event) {
    this.$emit('change', event.target.value);
}
export default {
    methods: {
        onChange
    }
};
</script>
