import { defineComponent } from 'vue';
// @ts-ignore
import { IIcon } from '@inkline/icons/components';
import { defaultPropValue, sizePropValidator } from '@inkline/inkline/mixins';

/**
 * The icon to be displayed
 * @type String
 * @default
 * @name name
 */

const componentName = 'IIcon';

export default defineComponent({
    name: componentName,
    components: {
        Icon: IIcon
    },
    props: {
        /**
         * The size variant of the icon
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        }
    }
});
