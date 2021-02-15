export default {
    name: 'IIcon',
    props: {
        icon: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: ''
        }
    },
    computed: {
        classes() {
            return {
                [`-${this.icon}`]: Boolean(this.icon),
                [`-${this.size}`]: Boolean(this.size)
            };
        }
    }
};
