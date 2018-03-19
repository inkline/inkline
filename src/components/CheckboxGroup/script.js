export default {
    name: 'CheckboxGroup',
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
