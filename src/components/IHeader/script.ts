import { defineComponent } from 'vue';
import {
    defaultPropValue,
    sizePropValidator,
    colorVariantClass
} from '@inkline/inkline/mixins';

import IContainer from '@inkline/inkline/components/IContainer/index.vue';
import IRow from '@inkline/inkline/components/IRow/index.vue';
import IColumn from '@inkline/inkline/components/IColumn/index.vue';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default header content
 * @name default
 * @kind slot
 */

const componentName = 'IHeader';

export default defineComponent({
    name: componentName,
    components: {
        IContainer,
        IRow,
        IColumn
    },
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the header
         * @type primary | light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * Display the header background as cover, always covering the whole header width or height
         * @type Boolean
         * @default false
         * @name cover
         */
        cover: {
            type: Boolean,
            default: false
        },
        /**
         * Display the inner content container as fluid, covering 100% of the header width
         * @type Boolean
         * @default false
         * @name fluid
         */
        fluid: {
            type: Boolean,
            default: false
        },
        /**
         * Display the header as fullscreen, covering 100% screen height and 100% screen width
         * @type Boolean
         * @default true
         * @name fullscreen
         */
        fullscreen: {
            type: Boolean,
            default: false
        },
        /**
         * The size variant of the header
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        }
    },
    computed: {
        classes (): Classes {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size),
                '-cover': this.cover,
                '-fullscreen': this.fullscreen
            };
        }
    }
});
