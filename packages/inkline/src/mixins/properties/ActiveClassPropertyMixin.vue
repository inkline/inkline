<script>
export default {
    props: {
        activeClass: {
            type: String,
            default: '-active'
        }
    },
    created() {
        this.classesProvider.add(() => ({
            [this.activeClass]: this.active
        }));
    }
};
</script>
