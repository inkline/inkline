<script>
/**
 * Bind the value of an individual form item
 */
const model = {
    get: function () {
        return this.value;
    },
    set: function (value) {
        return this.$emit('input', value);
    }
};

/**
 * Get the value of the individual form item
 */
function currentValue () {
    return this.value;
}

export default {
    computed: {
        currentValue,
        model
    }
};
</script>
