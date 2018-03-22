<script>
export default {
    computed: {
        /**
         * Compute dynamically provided classes from mixins
         */
        classes () {
            const classRules = [];

            for (let classProvider in this.injectableClasses) {
                if (this.injectableClasses.hasOwnProperty(classProvider)) {
                    classRules.push(this.injectableClasses[classProvider]);
                }
            }

            return classRules;
        }
    }
};
</script>
