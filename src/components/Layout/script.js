export default {
    name: 'Layout',
    props: {
        vertical: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        classes: function () {
            return [
                this.vertical ? '-vertical' : ''
            ];
        }
    }
};
