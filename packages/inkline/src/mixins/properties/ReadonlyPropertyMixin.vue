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
        isReadonly() {
            return (this.parentForm || {}).isReadonly || (this.parentFormGroup || {}).isReadonly || this.readonly;
        }
    },
    created() {
        this.attributesProvider.add(() => ({ 'readonly': this.isReadonly }));
    }
};
</script>
