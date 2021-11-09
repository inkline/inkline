import { defineComponent } from 'vue';
import { defaultPropValue, sizePropValidator } from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * @name default
 * @kind slot
 * @description Slot for default alert content
 */

/**
 * @name icon
 * @kind slot
 * @description Slot for alert icon
 */

/**
 * @name dismiss
 * @kind slot
 * @description Slot for alert dismiss button
 */

const componentName = 'IAlert';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * @description The size variant of the alert
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        },
        /**
         * @description The color variant of the alert
         * @type info | success | warning | danger
         * @default info
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * @description Used to show or hide a dismissible alert
         * @type Boolean
         * @default true
         */
        modelValue: {
            type: Boolean,
            default: true
        },
        /**
         * @description Shows a dismiss icon on the alert
         * @type Boolean
         * @default false
         */
        dismissible: {
            type: Boolean,
            default: false
        },
        /**
         * @description The aria-label to use for the dismiss button
         * @type String
         * @default Dismiss
         */
        dismissAriaLabel: {
            type: String,
            default: 'Dismiss'
        }
    },
    emits: [
        /**
         * @event update:modelValue
         * @description Event emitted for setting the modelValue
         */
        'update:modelValue'
    ],
    data () {
        return {
            dismissed: false
        };
    },
    computed: {
        classes (): Classes {
            return {
                [`-${this.color}`]: Boolean(this.color),
                [`-${this.size}`]: Boolean(this.size),
                '-dismissible': this.dismissible,
                '-with-icon': Boolean(this.$slots.icon)
            };
        }
    },
    watch: {
        modelValue (value: boolean) {
            this.dismissed = !value;
        }
    },
    methods: {
        dismiss () {
            this.dismissed = true;

            this.$emit('update:modelValue', false);
        }
    }
});
