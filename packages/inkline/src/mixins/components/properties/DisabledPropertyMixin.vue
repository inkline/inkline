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
        isDisabled() {
            return this.disabled;
        }
    },
    created() {
        this.classesProvider.add('child', () => ({
            '-disabled': this.isDisabled
        }));

        this.attributesProvider.add(() => ({ 'aria-disabled': this.disabled ? 'true' : false }));
    }
};
</script>
