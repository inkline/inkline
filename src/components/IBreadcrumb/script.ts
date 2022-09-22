import { defineComponent } from 'vue';
import {
    computedColorValue,
    computedPropValue, computedSizeValue,
    sizePropValidator
} from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default breadcrumb content
 * @name default
 * @kind slot
 */

const componentName = 'IBreadcrumb';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The aria-label of the breadcrumbs
         * @type String
         * @default Breadcrumbs
         * @name ariaLabel
         */
        ariaLabel: {
            type: String,
            default: 'Breadcrumbs'
        },
        /**
         * The color variant of the breadcrumb
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: ''
        },
        /**
         * The size variant of the breadcrumb
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: ''
        }
    },
    computed: {
        computedColor (): string | undefined {
            return computedColorValue(componentName, this.color);
        },
        computedSize (): string | undefined {
            return computedSizeValue(componentName, this.size);
        },
        classes (): Classes {
            return {
                [`-${this.computedColor}`]: Boolean(this.computedColor),
                [`-${this.computedSize}`]: Boolean(this.computedSize)
            };
        }
    }
});
