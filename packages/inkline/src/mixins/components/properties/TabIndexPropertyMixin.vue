<script>
export default {
    props: {
        tabindex: {
            type: [Number, String],
            default: 1
        }
    },
    computed: {
        /**
         * Return correct tab index. The tab index will be -1 if the form element is disabled.
         */
        tabIndex() {
            return this.isDisabled ? -1 : this.tabindex;
        }
    }
};
</script>
