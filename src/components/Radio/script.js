export default {
    name: 'Radio',
    props: {
        value: String,
        disabled: Boolean
    },
    computed: {
        /**
         * Actual v-model used for the input
         */
        model: {
            get: function () {
                return this.isGroup ? this.parentGroup.value : this.value;
            },
            set: function (value) {
                if (this.isGroup) {
                    return this.$parent.$emit('change:input', value);
                }

                return this.$emit('input', value);
            }
        },
        inputValue () {
            return this.isGroup ? this.value : this.$attrs.value;
        },
        classes () {
            return [
                { '-disabled': this.isDisabled }
            ];
        },
        isGroup () {
            let parent = this.$parent;

            while (parent) {
                if (parent.$options.name === 'RadioGroup') {
                    this.parentGroup = parent;
                    return true;
                }

                parent = parent.$parent;
            }

            return false;
        },
        isDisabled () {
            return this.isGroup
                ? this.parentGroup.disabled || this.disabled || (this.form || {}).disabled
                : this.disabled || (this.form || {}).disabled;
        }
    }
};
