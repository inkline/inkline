export default {
    name: 'ILayout',
    props: {
        vertical: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        classes() {
            return [
                { '-vertical': this.vertical }
            ];
        }
    }
};
