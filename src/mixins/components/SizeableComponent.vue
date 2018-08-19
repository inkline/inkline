<script>
export default {
    props: {
        size: {
            type: String,
            default: ''
        }
    },
    created () {
        if (this.classesProvider && this.size !== '') {
            this.classesProvider['root'].push(() => `-${this.size}`);
        }
    }
};
</script>
