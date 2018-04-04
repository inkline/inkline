<script>
export default {
    data () {
        return {
            classesProvider: {
                root: [],
                child: []
            }
        };
    },
    computed: {
        /**
         * Compute dynamically provided classes from mixins
         */
        classes () {
            const classRules = {
                '*': []
            };

            Object.keys(this.classesProvider).forEach((key) => {
                classRules[key] = this.classesProvider[key].map((classRules) => classRules());
                classRules['*'] = classRules['*'].concat(classRules[key]);
            });

            return classRules;
        }
    }
};
</script>
