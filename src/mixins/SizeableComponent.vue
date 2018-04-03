<script>
export default {
    props: {
        size: {
            type: String,
            default: 'md'
        }
    },
    computed: {
        sizeClass () {
            return `-${this.size}`;
        }
    },
    created () {
        if (this.classesProvider) {
            this.classesProvider['root'].push(() => `-${this.size}`);
        }
    }
};
</script>
