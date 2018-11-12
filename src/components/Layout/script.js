export default {
    name: 'ILayout',
    props: {
        vertical: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        classes: function () {
            return [
                { '-vertical': this.vertical }
            ];
        }
    }
};
