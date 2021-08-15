import { defaultPropValue, colorVariantClass } from '@inkline/inkline/src/mixins';

/**
 * @name default
 * @kind slot
 * @description Slot for default table content
 */

const componentName = 'ITable';

export default {
    name: componentName,
    props: {
        /**
         * @description Display the table with borders
         * @type Boolean
         * @default false
         */
        border: {
            type: Boolean,
            default: false
        },
        /**
         * @description Display the table rows as condensed
         * @type Boolean
         * @default false
         */
        condensed: {
            type: Boolean,
            default: false
        },
        /**
         * @description Display the table rows as alternating stripes
         * @type Boolean
         * @default false
         */
        striped: {
            type: Boolean,
            default: false
        },
        /**
         * @description Set the table rows as hoverable
         * @type Boolean
         * @default false
         */
        hover: {
            type: Boolean,
            default: false
        },
        /**
         * @description Set the table to be responsive, enabling horizontal scroll when overflowing the parent container
         * @type Boolean | xs | sm | md | lg | xl | xxl
         * @default false
         */
        responsive: {
            type: [Boolean, String],
            default: true
        },
        /**
         * @description Display the table rows without wrapping white-space
         * @type Boolean
         * @default false
         */
        nowrap: {
            type: Boolean,
            default: false
        },
        /**
         * @description The color variant of the table
         * @type primary | success | light | dark | info | success | warning | danger
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue(componentName, 'color')
        }
    },
    computed: {
        classes() {
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
};
