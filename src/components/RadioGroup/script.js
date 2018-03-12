export default {
    name: 'RadioGroup',
    props: {
        value: {},
        disabled: Boolean
    },
    created () {
        this.$on('change:input', value => {
            this.$emit('input', value);
        });
    }
};
