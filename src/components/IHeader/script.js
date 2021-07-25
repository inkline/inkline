import {
    defaultPropValue,
    sizePropValidator,
    colorVariantClass
} from '@inkline/inkline/src/mixins';

import IContainer from '@inkline/inkline/src/components/IContainer/index.vue';
import IRow from '@inkline/inkline/src/components/IRow/index.vue';
import IColumn from '@inkline/inkline/src/components/IColumn/index.vue';

/**
 * @name default
 * @kind slot
 * @description Slot for default header content
 */

const componentName = 'IHeader';

export default {
    name: componentName,
    components: {
        IContainer,
        IRow,
        IColumn
    },
    props: {
        /**
         * @description The color variant of the header
         * @type primary | light | dark
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue(componentName, 'color')
        },
        /**
         * @description Display the header background as cover, always covering the whole header width
         * @type Boolean
         * @default true
         */
        cover: {
            type: Boolean,
            default: true
        },
        /**
         * @description Display the inner content container as fluid, covering 100% of the header width
         * @type Boolean
         * @default false
         */
        fluid: {
            type: Boolean,
            default: false
        },
        /**
         * @description Display the header as fullscreen, covering 100% screen height and 100% screen width
         * @type Boolean
         * @default true
         */
        fullscreen: {
            type: Boolean,
            default: false
        },
        /**
         * @description The size variant of the header
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
                [`-${this.size}`]: Boolean(this.size),
                '-cover': this.cover,
                '-fullscreen': this.fullscreen
            };
        }
    }
}
