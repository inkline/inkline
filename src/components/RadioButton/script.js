export default {
    name: 'RadioButton',
    props: {
        label: String,
        value: String,
        disabled: Boolean
    },
    computed: {
        picked: {
            get: function () {
                return this.isGroup ? this.$parent.value : this.value;
            },
            set: function (val) {
                if (this.isGroup) {
                    this.$parent.$emit('childChange', val);
                } else {
                    this.$emit('input', val);
                }
            }
        },
        isGroup () {
            return this.$parent.$options.name === 'RadioGroup';
        },
        isDisabled () {
            return this.disabled;
        }
    }
};
