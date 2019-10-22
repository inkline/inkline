export default {
    name: 'Sponsor',
    props: {
        data: {
            type: Object,
            default: () => ({})
        },
        size: {
            type: String,
            default: ''
        }
    },
    computed: {
        classes() {
            return {
                '-default': this.data.default,
                '-placeholder': this.data.placeholder,
                [`-${this.size}`]: Boolean(this.size)
            };
        }
    }
}
