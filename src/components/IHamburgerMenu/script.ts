import { defineComponent } from 'vue';
import {
    computedColorValue,
    computedSizeValue
} from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

const componentName = 'IHamburgerMenu';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The animation of the hamburger menu
         * @type close | arrow-up | arrow-down | arrow-left | arrow-right | plus | minus
         * @default close
         * @name animation
         */
        animation: {
            type: String,
            default: 'close'
        },
        /**
         * The color variant of the hamburger menu
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: ''
        },
        /**
         * The size variant of the hamburger menu
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: ''
        },
        /**
         * Used to set the hamburger menu as opened or closed
         * @type Boolean
         * @default false
         * @name modelValue
         */
        modelValue: {
            type: Boolean,
            default: false
        }
    },
    emits: [
        /**
         * Event emitted for setting the modelValue
         * @event update:modelValue
         */
        'update:modelValue'
    ],
    computed: {
        computedColor (): string | undefined {
            return computedColorValue(componentName, this.color);
        },
        computedSize (): string | undefined {
            return computedSizeValue(componentName, this.size);
        },
        classes (): Classes {
            return {
                [`-${this.computedColor}`]: Boolean(this.computedColor),
                [`-${this.computedSize}`]: Boolean(this.computedSize),
                '-active': this.modelValue,
                [`-${this.animation}`]: true
            };
        }
    },
    methods: {
        onClick () {
            this.$emit('update:modelValue', !this.modelValue);
        }
    }
});
