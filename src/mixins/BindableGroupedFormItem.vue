<script>
/**
 * Bind the value of a form item group or groupable form item
 */
const model = {
    get: function () {
        return this.isGrouped ? this.parentGroup.value : this.value;
    },
    set: function (value) {
        if (this.isGrouped) {
            return this.parentGroup.$emit('input', value);
        }

        return this.$emit('input', value);
    }
};

/**
 * Get the value of the form item group or, if it is not grouped, get the value from the individual form item
 */
function currentValue () {
    return this.isGrouped ? this.value : this.$attrs.value;
}

export default {
    computed: {
        currentValue,
        model
    }
};
</script>
