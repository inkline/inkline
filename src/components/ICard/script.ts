import { defineComponent } from 'vue';
import {
    computedColorValue,
    computedSizeValue
} from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default card content
 * @name default
 * @kind slot
 */

/**
 * Slot for card header content
 * @name header
 * @kind slot
 */

/**
 * Slot for card footer content
 * @name footer
 * @kind slot
 */

/**
 * Slot for card image
 * @name image
 * @kind slot
 */

const componentName = 'ICard';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The color variant of the card
         * @type primary | success | light | dark | info | success | warning | danger
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: ''
        },
        /**
         * The size variant of the card
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
