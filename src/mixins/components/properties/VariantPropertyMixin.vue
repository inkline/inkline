<script>
export default {
    props: {
        variant: {
            type: String,
            default: ''
        }
    },
    created () {
        if (this.classesProvider && this.variant) {
            this.classesProvider['root'].push(() => `-${this.variant}`);
        }
    }
};
</script>
