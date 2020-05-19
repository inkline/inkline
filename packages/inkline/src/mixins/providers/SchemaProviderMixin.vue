<script>
export default {
    props: {
        schema: {
            type: Object,
            default: () => null
        },
    },
    mounted() {
        if (this.schema) {
            if (this.parentForm) {
                this.parentForm.add(this);
            }

            if (this.parentFormGroup) {
                this.$set(this.parentFormGroup, 'inputSchema', this.schema);
            }
        }
    },
    destroyed() {
        if (this.schema && this.parentForm) {
            this.parentForm.remove(this);
        }
    }
};
</script>
