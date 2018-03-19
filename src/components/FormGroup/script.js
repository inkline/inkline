export default {
    name: 'FormGroup',
    props: {
        value: {},
        disabled: Boolean
    },
    computed: {
        classes: () => [
            { '-disabled': this.disabled }
        ]
    },
    created () {
        this.$on('change:input', value => {
            this.$emit('input', value);
        });
    }
};
