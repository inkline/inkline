<script>
/**
 * Find a form group parent for the given form item
 */
const model = {
    get: function () {
        return this.isGrouped ? this.parentGroup.value : this.value;
    },
    set: function (value) {
        if (this.isGrouped) {
            return this.parentGroup.$emit('change:input', value);
        }

        return this.$emit('input', value);
    }
};

function inputValue () {
    return this.isGrouped ? this.value : this.$attrs.value;
}

export default {
    computed: {
        inputValue,
        model
    }
};
</script>
