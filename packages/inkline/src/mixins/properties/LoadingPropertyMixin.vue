<script>
export default {
    props: {
        loading: {
            type: Boolean,
            default: false
        }
    },
    created() {
        this.classesProvider.add(() => ({
            '-loading': this.loading
        }));
    }
};
</script>
