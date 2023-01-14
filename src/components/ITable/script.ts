import { defineComponent } from 'vue';
import { defaultPropValue, colorVariantClass } from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default table content
 * @name default
 * @kind slot
 */

const componentName = 'ITable';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * Display the table with borders
         * @type Boolean
         * @default false
         * @name border
         */
        border: {
            type: Boolean,
            default: false
        },
        /**
         * Display the table rows as condensed
         * @type Boolean
         * @default false
         * @name condensed
         */
        condensed: {
            type: Boolean,
            default: false
        },
        /**
         * Display the table rows as alternating stripes
         * @type Boolean
         * @default false
         * @name striped
         */
        striped: {
            type: Boolean,
            default: false
        },
        /**
         * Set the table rows as hoverable
         * @type Boolean
         * @default false
         * @name hover
         */
        hover: {
            type: Boolean,
            default: false
        },
        /**
         * Set the table to be responsive, enabling horizontal scroll when overflowing the parent container
         * @type Boolean | xs | sm | md | lg | xl | xxl
         * @default false
         * @name responsive
         */
        responsive: {
            type: [Boolean, String],
            default: true
        },
        /**
         * Display the table rows without wrapping white-space
         * @type Boolean
         * @default false
         * @name nowrap
         */
        nowrap: {
            type: Boolean,
            default: false
        },
        /**
         * The color variant of the table
         * @type primary | success | light | dark | info | success | warning | danger
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        }
    },
    computed: {
        classes (): Classes {
            return {
                ...colorVariantClass(this),
                '-border': this.border,
                '-condensed': this.condensed,
                '-striped': this.striped,
                '-hover': this.hover,
                '-nowrap': this.nowrap,
                [`-responsive${typeof this.responsive === 'boolean' ? '' : `-${this.responsive}`}`]: Boolean(this.responsive)
            };
        }
    }
});
