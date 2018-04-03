<script>
export default {
    props: {
        labelPosition: {
            type: String,
            default: 'default'
        }
    },
    computed: {
        labelClasses () {
            return [ `-${this.labelPosition}` ];
        }
    },
    created () {
        if (this.classesProvider) {
            this.classesProvider['root'].push(() => ({
                '-labelled': this.$slots.label,
                '-side-labelled': this.labelPosition !== 'default'
            }));
        }
    }
};
</script>
