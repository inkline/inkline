<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    computed: {
        /**
         * Get the value of the form item group or, if it is not grouped, get the value from the individual form item
         */
        currentValue () {
            return this.isGrouped ? this.value : this.$attrs.value;
        },

        /**
         * Bind the value of a form item group or groupable form item
         */
        model: {
            get () {
                return this.isGrouped ? this.parentFormGroup.value : this.value;
            },
            set (value) {
                if (this.isGrouped) {
                    return this.parentFormGroup.emitInput(value);
                }

                return this.emitInput(value);
            }
        }
    }
};
</script>
