export default {
    name: 'Layout',
    props: {
        hasAside: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        classes: function () {
            return [
                this.hasAside ? '-has-aside' : ''
            ];
        }
    }
};
