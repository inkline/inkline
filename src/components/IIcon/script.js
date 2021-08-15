import { IIcon } from '@inkline/icons/components';
import { defaultPropValue, sizePropValidator } from '@inkline/inkline/src/mixins';

/**
 * @description The icon to be displayed
 * @type String
 * @default
 */

const componentName = 'IIcon';

export default {
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
};
