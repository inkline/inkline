<script>
export default {
    props: {
        size: {
            type: String,
            default: '',
            validator (size) {
                return ['', 'sm', 'md', 'lg'].indexOf(size) !== -1
            }
        }
    },
    created() {
        this.classesProvider.add(() => this.size ? `-${this.size}` : false);
    }
};
</script>
