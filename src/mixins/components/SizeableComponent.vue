<script>
export default {
    props: {
        size: {
            type: String,
            default: ''
        }
    },
    computed: {
        sizeClass () {
            return `-${this.size}`;
        }
    },
    created () {
        if (this.classesProvider && this.size != '') {
            this.classesProvider['root'].push(() => `-${this.size}`);
        }
    }
};
</script>
