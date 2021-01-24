import { sizeValidator } from "@inkline/inkline/src/validators";

export default {
    name: 'IBreadcrumb',
    props: {
        color: {
            type: String,
            default: ''
        },
        divider: {
            type: String,
            default: '/'
        },
        size: {
            type: String,
            default: '',
            validator: sizeValidator
        }
    },
    computed: {
        classes() {
            return {
                [`-${this.color}`]: Boolean(this.color),
                [`-${this.size}`]: Boolean(this.size)
            }
        }
    }
};
