<script>
export default {
    methods: {
        /**
         * Trigger for click event
         */
        click () {
            if (this.isDisabled || this.isReadonly) { return; }

            this.$refs.input.click();
        }
    }
};
</script>
