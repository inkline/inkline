<script>
export default {
    /**
     * Provide injectable classes for classable mixin
     */
    data () {
        return {
            injectableClasses: {
                CustomizableFormItem: { '-custom': this.custom }
            }
        };
    },
    props: {
        custom: {
            type: Boolean,
            default: true
        }
    }
};
</script>
