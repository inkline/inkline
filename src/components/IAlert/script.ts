import { defineComponent } from 'vue';
import { computedColorValue, computedSizeValue } from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default alert content
 * @name default
 * @kind slot
 */

/**
 * Slot for alert icon
 * @name icon
 * @kind slot
 */

/**
 * Slot for alert dismiss button
 * @name dismiss
 * @kind slot
 */

export const componentName = 'IAlert';
export const componentSizes = [
    'sm',
    'md',
    'lg'
];
export const componentColors = [
    'info',
    'success',
    'warning',
    'danger'
];

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The size variant of the alert
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: ''
        },
        /**
         * The color variant of the alert
         * @type info | success | warning | danger
         * @default info
         * @name color
         */
        color: {
            type: String,
            default: 'info'
        },
        /**
         * Used to show or hide a dismissible alert
         * @type Boolean
         * @default true
         * @name modelValue
         */
        modelValue: {
            type: Boolean,
            default: true
        },
        /**
         * Shows a dismiss icon on the alert
         * @type Boolean
         * @default false
         * @name dismissible
         */
        dismissible: {
            type: Boolean,
            default: false
        },
        /**
         * The aria-label to use for the dismiss button
         * @type String
         * @default Dismiss
         * @name dismissAriaLabel
         */
        dismissAriaLabel: {
            type: String,
            default: 'Dismiss'
        }
    },
    emits: [
        /**
         * Event emitted for setting the modelValue
         * @event update:modelValue
         */
        'update:modelValue'
    ],
    data () {
        return {
            dismissed: false
        };
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
                [`-${this.computedSize}`]: Boolean(this.computedSize),
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
