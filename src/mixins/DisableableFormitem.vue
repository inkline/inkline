<script>
export default {
    /**
     * Provide injectable classes for classable mixin
     */
    data () {
        return {
            injectableClasses: {
                DisableableFormItem: { '-disabled': this.isDisabled }
            }
        };
    },
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        /**
         * Check whether the form item or one of its form parents is disabled
         */
        isDisabled () {
            return (this.parentForm || {}).disabled || (this.parentGroup || {}).disabled || this.disabled;
        }
    }
};
</script>
