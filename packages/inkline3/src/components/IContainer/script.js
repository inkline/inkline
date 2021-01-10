export default {
    name: 'IContainer',
    props: {
        fluid: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        classes() {
            return {
                '-fluid': this.fluid
            };
        }
    }
};
