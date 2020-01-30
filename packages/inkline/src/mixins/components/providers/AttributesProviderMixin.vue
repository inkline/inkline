<script>
export default {
    data() {
        const attributesProvider = [];

        attributesProvider.add = attributesProvider.push;

        return {
            attributesProvider
        };
    },
    computed: {
        attributes() {
            const attrs = this.attributesProvider.reduce((acc, rule) => {
                Object.assign(acc, rule());

                return acc;
            }, {});

            return Object.assign({}, this.$attrs, attrs);
        }
    }
};
</script>
