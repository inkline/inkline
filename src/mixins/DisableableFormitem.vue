<script>
/**
 * Check whether the form item or one of its form parents is disabled
 */
function isDisabled () {
    return this.isGrouped
        ? this.parentGroup.disabled || this.disabled || (this.form || {}).disabled
        : this.disabled || (this.form || {}).disabled;
}

export default {
    computed: {
        isDisabled
    }
};
</script>
