<script>
export default {
    props: {
        variant: {
            type: String,
            default: ''
        }
    },
    created() {
        this.classesProvider.add(() => this.variant ? `-${this.variant}` : false);
    }
};
</script>
