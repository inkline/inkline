<script>
export default {
    props: {
        active: {
            type: Boolean,
            default: false
        },
        activeClass: {
            type: String,
            default: '-active'
        }
    },
    created () {
        this.classesProvider.add(() => ({
            [this.activeClass]: this.active
        }));
    }
};
</script>
