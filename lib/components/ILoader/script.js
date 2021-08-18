import { defineComponent } from 'vue';
import { colorVariantClass, defaultPropValue } from '../../mixins';
/**
 * @name default
 * @kind slot
 * @description Slot for default loader content
 */
const componentName = 'ILoader';
export default defineComponent({
    name: componentName,
    props: {
        /**
         * @description The color variant of the loader
         * @type primary | success | light | dark | info | success | warning | danger
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue(componentName, 'color')
        },
        /**
         * @description The size variant of the loader
         * @type sm | md | lg | auto
         * @default md
         */
        size: {
            type: String,
            default: defaultPropValue(componentName, 'size')
        }
    },
    computed: {
        classes() {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size)
            };
        }
    }
});
//# sourceMappingURL=script.js.map