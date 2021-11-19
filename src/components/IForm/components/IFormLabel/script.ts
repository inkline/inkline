import { defineComponent } from 'vue';
import {
    FormComponentMixin,
    defaultPropValue,
    sizePropValidator
} from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default form label content
 * @name default
 * @kind slot
 */

const componentName = 'IFormLabel';

export default defineComponent({
    name: componentName,
    mixins: [
        FormComponentMixin
    ],
    props: {
        /**
         * The id of the target input to be focused by the form label. If left empty, clicking the form label will focus the next sibling input
         * @type String
         * @default
         * @name for
         */
        for: {
            type: String,
            default: ''
        },
        /**
         * The placement of the form label
         * @type left | right
         * @default left
         * @name placement
         */
        placement: {
            type: String,
            default: ''
        },
        /**
         * The size variant of the form label
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
                [`-${this.size}`]: Boolean(this.size),
                [`-${this.placement}`]: Boolean(this.placement)
            };
        },
        forAttr (): string {
            return this.for;
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
