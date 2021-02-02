import { sizeValidator } from "@inkline/inkline/src/validators";

export default {
    name: 'ILoader',
    props: {
        color: {
            type: String,
            default: ''
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
