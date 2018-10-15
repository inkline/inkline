<script>
export default {
    props: {
        activeClass: {
            type: String,
            default: '-active'
        }
    },
    created () {
        if (this.classesProvider) {
            this.classesProvider['root'].push(() => ({
                [this.activeClass]: this.active
            }));
        }
    }
};
</script>
