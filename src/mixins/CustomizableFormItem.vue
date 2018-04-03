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
            this.classesProvider['root'].push(() => ({
                '-custom': this.custom
            }));
        }
    }
};
</script>
