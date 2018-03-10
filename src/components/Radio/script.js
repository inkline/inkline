export default {
    name: 'Radio',
    props: {
        label: String,
        value: String,
        disabled: Boolean
    },
    computed: {
        picked: {
            get: function () {
                return this.value;
            },
            set: function (val) {
                this.$emit('input', val);
            }
        },
        isDisabled () {
            return this.disabled;
        }
    }
};
