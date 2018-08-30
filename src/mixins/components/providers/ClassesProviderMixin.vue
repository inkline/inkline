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
                if (!this.classesProvider.hasOwnProperty(key)) { return; }

                classRules[key] = this.classesProvider[key].map((classRule) => classRule());
                classRules['*'] = classRules['*'].concat(classRules[key]);
            });

            return classRules;
        }
    }
};
</script>
