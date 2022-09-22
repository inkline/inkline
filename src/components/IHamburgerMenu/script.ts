import { defineComponent } from 'vue';
import {
    computedPropValue,
    computedColorValue
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
            default: computedPropValue<string>(componentName, 'color')
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
        classes (): Classes {
            return {
                [`-${computedColorValue(componentName, this.color)}`]: true,
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
