import { colorVariantClass, sizePropValidator } from '@inkline/inkline/src/mixins';

export default {
    name: 'IBadge',
    props: {
        color: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: '',
            validator: sizePropValidator
        }
    },
    computed: {
        classes() {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size)
            }
        }
    }
};
