import { defineComponent } from 'vue';
import {
    defaultPropValue,
    colorVariantClass,
} from '@inkline/inkline/src/mixins';
import { Classes } from '@inkline/inkline/src/types';

const componentName = 'IHamburgerMenu';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * @description The animation of the hamburger menu
         * @type close | arrow-up | arrow-down | arrow-left | arrow-right | plus | minus
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
            default: defaultPropValue<string>(componentName, 'color')
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
    emits: [
        /**
         * @event update:modelValue
         * @description Event emitted for setting the modelValue
         */
        'update:modelValue'
    ],
    computed: {
        classes(): Classes {
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
});
