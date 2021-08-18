import { defineComponent } from 'vue';
// @ts-ignore
import { IIcon } from '@inkline/icons/components';
import { defaultPropValue, sizePropValidator } from '../../mixins';
/**
 * @description The icon to be displayed
 * @type String
 * @default
 */
const componentName = 'IIcon';
export default defineComponent({
    name: componentName,
    components: {
        Icon: IIcon
    },
    props: {
        /**
         * @description The size variant of the icon
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: defaultPropValue(componentName, 'size'),
            validator: sizePropValidator
        }
    }
});
//# sourceMappingURL=script.js.map