<script>
/**
 * Find a form group parent for the given form item
 */
function isGrouped () {
    let parent = this.$parent;

    while (parent) {
        if (parent.$options.name === 'InputGroup' || (parent.$options.extends || {}).name === 'InputGroup') {
            this.parentGroup = parent;
            return true;
        }

        parent = parent.$parent;
    }

    return false;
}

export default {
    computed: {
        isGrouped
    }
};
</script>
