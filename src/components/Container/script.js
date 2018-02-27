export default {
    name: 'Container',
    props: {
        fluid: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        classes: function () {
            return [
                this.fluid ? '-fluid' : ''
            ];
        }
    }
};
