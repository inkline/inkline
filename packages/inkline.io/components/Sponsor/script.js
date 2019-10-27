import { IIcon } from "@inkline/inkline/src/index";

export default {
    name: 'Sponsor',
    components: { IIcon },
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
