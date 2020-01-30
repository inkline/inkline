<script>
export default {
    data() {
        const classesProvider = [];

        classesProvider.add = (type, fn) => {
            if (!fn) {
                fn = type;
                type = 'root';
            }

            fn.type = type;

            classesProvider.push(fn);
        };

        return {
            classesProvider
        };
    },
    computed: {
        /**
         * Compute dynamically provided classes from mixins
         */
        classes() {
            return this.classesProvider
                .reduce((acc, fn) => {
                    const rule = fn();

                    if (!acc[fn.type]) acc[fn.type] = [];

                    acc[fn.type].push(rule);
                    acc.push(rule);

                    return acc;
                }, []);
        }
    }
};
</script>
