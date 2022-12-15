<script>
export default {
    methods: {
        /**
         * Trigger for click event
         */
        clickInputRef() {
            if (this.isDisabled || this.isReadonly) { return; }

            this.$refs.input.click();
        }
    }
};
</script>
