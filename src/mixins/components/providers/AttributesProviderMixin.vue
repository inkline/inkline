<script>
export default {
    data () {
        return {
            attributesProvider: []
        };
    },
    computed: {
        attributes () {
            const attrs = {};

            this.attributesProvider.forEach((attributeRule) => {
                Object.assign(attrs, attributeRule());
            });

            return Object.assign({}, this.$attrs, attrs);
        }
    }
};
</script>
