export default {
    name: 'RadioGroup',
    props: {
        value: {},
        fill: String,
        textColor: String,
        disabled: Boolean
    },
    created () {
        this.$on('childChange', value => {
            this.$emit('input', value);
        });
    }
};
