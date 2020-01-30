<script>
export default {
    computed: {
        name() {
            return this.schema ? this.schema.name : this.$attrs.name;
        }
    }
};
</script>
