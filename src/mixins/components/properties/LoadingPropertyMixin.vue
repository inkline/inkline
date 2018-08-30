<script>
export default {
    props: {
        loading: {
            type: Boolean,
            default: false
        }
    },
    created () {
        if (this.classesProvider) {
            this.classesProvider['root'].push(() => ({
                '-loading': this.loading
            }));
        }
    }
};
</script>
