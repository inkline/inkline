import {colorVariantClass, sizePropValidator} from '@inkline/inkline/src/mixins';

export default {
    name: 'ICard',
    props: {
        color: {
            type: String,
            default: '',
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
        },
    }
};
