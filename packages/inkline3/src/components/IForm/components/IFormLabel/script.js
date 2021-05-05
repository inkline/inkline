import {
    FormComponentMixin,
    sizePropValidator
} from "@inkline/inkline/src/mixins";

/**
 * @name default
 * @kind slot
 * @description Slot for default form label content
 */

export default {
    name: 'IFormLabel',
    mixins: [
        FormComponentMixin
    ],
    props: {
        /**
         * @description The id of the target input to be focused by the form label. If left empty, clicking the form label will focus the next sibling input
         * @type String
         * @default
         */
        for: {
            type: String,
            default: ''
        },
        /**
         * @description The placement of the form label
         * @type left | right
         * @default left
         */
        placement: {
            type: String,
            default: ''
        },
        /**
         * @description The size variant of the form label
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: '',
            validator: sizePropValidator
        }
    },
    computed: {
        classes() {
            return {
                [`-${this.size}`]: Boolean(this.size),
                [`-${this.placement}`]: Boolean(this.placement)
            };
        }
    },
    methods: {
        onClick() {
            if (this.for) {
                return;
            }

            this.$el.nextSibling.querySelector('input')?.focus();
        }
    }
};
