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
            return this.disabled;
        }
    },
    created () {
        if (this.classesProvider) {
            this.classesProvider['child'].push(() => ({
                '-disabled': this.isDisabled
            }));
        }

        if (this.attributesProvider) {
            this.attributesProvider.push(() => ({ 'aria-disabled': this.disabled ? 'true' : false }));
        }
    }
};
</script>
