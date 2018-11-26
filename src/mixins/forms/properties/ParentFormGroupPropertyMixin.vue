<script>
export default {
    computed: {
        /**
         * Find and return the element's parent group
         */
        parentFormGroup() {
            let parent = this.$parent;

            while (parent) {
                if (parent.$options.name === 'IFormGroup' || (parent.$options.extends || {}).name === 'IFormGroup') {
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
            let parent = this.parentFormGroup;

            return Boolean(parent);
        }
    }
};
</script>
