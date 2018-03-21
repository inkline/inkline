<script>
export default {
    created () {
        this.classRules.push({ '-custom': this.custom });
    },
    props: {
        custom: {
            type: Boolean,
            default: true
        }
    }
};
</script>
