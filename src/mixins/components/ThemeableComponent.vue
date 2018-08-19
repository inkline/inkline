<script>
export default {
    props: {
        theme: {
            type: String,
            default: ''
        }
    },
    created () {
        if (this.classesProvider && this.theme) {
            this.classesProvider['root'].push(() => `-${this.theme}`);
        }
    }
};
</script>
