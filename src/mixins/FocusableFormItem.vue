<script>
/**
 * Check whether the form item or one of its form parents is disabled
 */
function focus () {
    this.$refs.input.focus();
}

function onFocus (event) {
    this.focused = true;
    this.$emit('focus', event);
}

function onBlur (event) {
    this.focused = false;
    this.$emit('blur', event);
}

export default {
    methods: {
        focus,
        onFocus,
        onBlur
    }
};
</script>
