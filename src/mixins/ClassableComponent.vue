<script>
export default {
    beforeCreate () {
        this.classRules = [];
    },
    computed: {
        classes () {
            const classRules = [];

            console.log('classable', this.classRules)

            return classRules;
        }
    }
};
</script>
