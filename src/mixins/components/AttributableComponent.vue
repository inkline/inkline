<script>
export default {
    data () {
        return {
            attributesProvider: {}
        };
    },
    watch: {
        attributesProvider: {
            handler (value, oldValue) {
                console.log('CHANGE', value)
                Object.keys(this.attributesProvider).forEach((key) => {
                    if (!this.attributesProvider.hasOwnProperty(key)) { return; }

                    this.$attrs[key] = this.attributesProvider[key]();

                    // attributeRules[key] = this.attributesProvider[key].map((attributeRule) => attributeRule());
                    // attributeRules['*'] = attributeRules['*'].concat(attributeRules[key]);
                });
            },
            deep: true
        }
    }
};
</script>
