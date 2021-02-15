import {
    colorVariantClass, sizePropValidator,
} from '@inkline/inkline/src/mixins';

export default {
    name: 'IListGroup',
    props: {
        border: {
            type: Boolean,
            default: true
        },
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
                [`-${this.size}`]: Boolean(this.size),
                '-border': this.border,
            };
        }
    }
};
