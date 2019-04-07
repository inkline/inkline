<script>
export default {
    props: {
        schema: {}
    },
    mounted() {
        if (this.schema && this.parentForm) {
            this.parentForm.add(this);
        }
    },
    destroyed() {
        if (this.schema && this.parentForm) {
            this.parentForm.remove(this);
        }
    }
};
</script>
