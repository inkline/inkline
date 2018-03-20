<script>
/**
 * Check whether the form item or one of its form parents is disabled
 */
function isDisabled () {
    return (this.parentForm || {}).disabled || (this.parentGroup || {}).disabled || this.disabled;
}

export default {
    data: () => ({
        cls: ''
    }),
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        isDisabled
    }
};
</script>
