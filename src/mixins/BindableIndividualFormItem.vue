<script>
/**
 * Find a form group parent for the given form item
 */
const model = {
    get: function () {
        return this.value;
    },
    set: function (value) {
        return this.$emit('input', value);
    }
};

export default {
    computed: {
        model
    }
};
</script>
