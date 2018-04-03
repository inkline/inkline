<script>
export default {
    props: {
        custom: {
            type: Boolean,
            default: true
        }
    },
    created () {
        if (this.classesProvider) {
            this.classesProvider['child'].push(() => ({
                '-custom': this.custom
            }));
        }
    }
};
</script>
