<script>
export default {
    computed: {
        /**
         * Find and return the element's parent group
         */
        parentGroup() {
            let parent = this.$parent;

            while (parent) {
                if (parent.$options.name === 'IInputGroup' || (parent.$options.extends || {}).name === 'IInputGroup') {
                    return parent;
                }

                parent = parent.$parent;
            }

            return undefined;
        },

        /**
         * Find a form group parent for the given form item
         */
        isGrouped () {
            let parent = this.parentGroup;

            return Boolean(parent);
        }
    }
};
</script>
