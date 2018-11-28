<script>
export default {
    props: {
        size: {
            type: String,
            default: ''
        }
    },
    created () {
        this.classesProvider.add(() => this.size ? `-${this.size}` : false);
    }
};
</script>
