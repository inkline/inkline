<script>
export default {
    props: {
        labelPosition: {
            type: String,
            default: 'default'
        }
    },
    created () {
        this.classesProvider.add('root', () => ({
            '-labelled': Boolean(this.$slots.label),
            '-side-labelled': this.labelPosition !== 'default'
        }));

        this.classesProvider.add('label', () => `-${this.labelPosition}`);
    }
};
</script>
