import { defineComponent } from 'vue';
import {
    defaultPropValue,
    sizePropValidator,
    colorVariantClass
} from '@inkline/inkline/src/mixins';

import IContainer from '@inkline/inkline/src/components/IContainer/index.vue';
import IRow from '@inkline/inkline/src/components/IRow/index.vue';
import IColumn from '@inkline/inkline/src/components/IColumn/index.vue';
import { Classes } from '@inkline/inkline/src/types';

/**
 * @name default
 * @kind slot
 * @description Slot for default header content
 */

const componentName = 'IHeader';

export default defineComponent({
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
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * @description Display the header background as cover, always covering the whole header width or height
         * @type Boolean
         * @default false
         */
        cover: {
            type: Boolean,
            default: false
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
            default: defaultPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        }
    },
    computed: {
        classes(): Classes {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size),
                '-cover': this.cover,
                '-fullscreen': this.fullscreen
            };
        }
    }
});
