import {
    colorVariantClass,
} from '@inkline/inkline/src/mixins';

export default {
    name: 'IHamburgerMenu',
    props: {
        animation: {
            type: String,
            default: 'close'
        },
        color: {
            type: String,
            default: ''
        },
        modelValue: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        classes() {
            return {
                ...colorVariantClass(this),
                '-active': this.modelValue,
                [`-${this.animation}`]: true
            };
        }
    },
    methods: {
        onClick() {
            this.$emit('update:modelValue', !this.modelValue);
        }
    }
};
