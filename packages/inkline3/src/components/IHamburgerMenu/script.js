import {
    colorVariantClass,
} from '@inkline/inkline/src/mixins';

export default {
    name: 'IHamburgerMenu',
    emits: [
        /**
         * @event update:modelValue
         * @description Event emitted for setting the modelValue
         */
        'update:modelValue'
    ],
    props: {
        /**
         * @description The animation of the hamburger menu
         * @type close | arrow-up | arrow-down | arrow-left | arrow-right | plus | minux
         * @default close
         */
        animation: {
            type: String,
            default: 'close'
        },
        /**
         * @description The color variant of the hamburger menu
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: ''
        },
        /**
         * @description Used to set the hamburger menu as opened or closed
         * @type Boolean
         * @default false
         */
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
