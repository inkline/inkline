<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        /**
         * Check whether the form item or one of its form parents is disabled
         */
        isDisabled () {
            return (this.parentForm || {}).disabled || (this.parentGroup || {}).disabled || this.disabled;
        }
    },
    created () {
        if (this.classesProvider) {
            this.classesProvider['child'].push(() => ({
                '-disabled': this.isDisabled
            }));
        }
    }
};
</script>
