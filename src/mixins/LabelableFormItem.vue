<script>
export default {
    props: {
        labelPosition: {
            type: String,
            default: 'default'
        }
    },
    created () {
        if (this.classesProvider) {
            this.classesProvider['root'].push(() => ({
                '-labelled': this.$slots.label,
                '-side-labelled': this.labelPosition !== 'default'
            }));

            this.classesProvider['label'] = this.classesProvider['label'] || [];
            this.classesProvider['label'].push(() => `-${this.labelPosition}`);
        }
    }
};
</script>
