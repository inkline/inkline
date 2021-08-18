import { defineComponent } from 'vue';
import { colorVariantClass, defaultPropValue, sizePropValidator } from '../../mixins';
/**
 * @name default
 * @kind slot
 * @description Slot for default breadcrumb content
 */
const componentName = 'IBreadcrumb';
export default defineComponent({
    name: componentName,
    props: {
        /**
         * @description The color variant of the breadcrumb
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue(componentName, 'color')
        },
        /**
         * @description The size variant of the breadcrumb
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: defaultPropValue(componentName, 'size'),
            validator: sizePropValidator
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