<script>
export default {
    props: {
        custom: {
            type: Boolean,
            default: true
        }
    },
    created() {
        this.classesProvider.add(() => ({
            '-custom': this.custom
        }));
    }
};
</script>
