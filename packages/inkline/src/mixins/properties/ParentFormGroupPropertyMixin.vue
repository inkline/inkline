<script>
export default {
    data() {
        return {
            parentFormGroupName: 'IFormGroup'
        }
    },
    computed: {
        /**
         * Find and return the element's parent group
         */
        parentFormGroup() {
            let parent = this.$parent;

            while (parent) {
                if (parent.$options.name === this.parentFormGroupName ||
                    (parent.$options.extends || {}).name === this.parentFormGroupName) {
                    return parent;
                }

                parent = parent.$parent;
            }

            return undefined;
        },

        /**
         * Find a form group parent for the given form item
         */
        isGrouped() {
            let parent = this.parentFormGroup;

            return Boolean(parent);
        }
    }
};
</script>
