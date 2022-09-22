import { defineComponent } from 'vue';
import {
    computedColorValue,
    computedPropValue, computedSizeValue,
    sizePropValidator
} from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default badge content
 * @name default
 * @kind slot
 */

const componentName = 'IBadge';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The color variant of the badge
         * @type primary | success | light | dark | info | success | warning | danger
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: computedPropValue<string>(componentName, 'color')
        },
        /**
         * The size variant of the badge
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: computedPropValue<string>(componentName, 'size', 'md'),
            validator: sizePropValidator
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
