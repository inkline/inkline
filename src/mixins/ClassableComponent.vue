<script>
export default {
    data () {
        return {
            classesProvider: []
        };
    },
    computed: {
        /**
         * Compute dynamically provided classes from mixins
         */
        classes () {
            return this.classesProvider.map((classRules) => classRules());
        }
    }
};
</script>
