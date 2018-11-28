<script>
export default {
    data () {
        const attributesProvider = [];

        attributesProvider.add = (type, fn) => {
            if (!fn) {
                fn = type;
                type = 'root';
            }

            fn.type = type;

            attributesProvider.push(fn);
        };

        return {
            attributesProvider
        };
    },
    computed: {
        attributes () {
            const attrs = this.attributesProvider.reduce((acc, rule) => {
                Object.assign(acc, rule());

                return acc;
            }, {});

            return Object.assign({}, this.$attrs, attrs);
        }
    }
};
</script>
