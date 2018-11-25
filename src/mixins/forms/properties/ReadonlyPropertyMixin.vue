<script>
export default {
    props: {
        readonly: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        /**
         * Check whether the form item or one of its form parents is readonly
         */
        isReadonly () {
            return (this.parentForm || {}).readonly || (this.parentGroup || {}).readonly || this.readonly;
        }
    },
    created () {
        if (this.attributesProvider) {
            this.attributesProvider.push(() => ({ 'readonly': this.readonly }));
        }
    }
};
</script>
