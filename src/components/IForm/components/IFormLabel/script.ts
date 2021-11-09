import { defineComponent } from 'vue';
import {
    FormComponentMixin,
    defaultPropValue,
    sizePropValidator
} from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * @name default
 * @kind slot
 * @description Slot for default form label content
 */

const componentName = 'IFormLabel';

export default defineComponent({
    name: componentName,
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
            default: defaultPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        }
    },
    computed: {
        classes (): Classes {
            return {
                [`-${this.size}`]: Boolean(this.size),
                [`-${this.placement}`]: Boolean(this.placement)
            };
        }
    },
    methods: {
        getNextSibling (): HTMLElement {
            return this.$el.nextSibling.querySelector('input, textarea');
        },
        onClick () {
            if (this.for) {
                return;
            }

            this.getNextSibling()?.focus();
        }
    }
});
