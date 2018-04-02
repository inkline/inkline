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
            this.classesProvider.push(() => `-${this.size}`);
        }
    }
};
</script>
