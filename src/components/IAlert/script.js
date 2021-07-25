import { defaultPropValue, sizePropValidator } from '@inkline/inkline/src/mixins';

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

export default {
    name: componentName,
    emits: [
        /**
         * @event update:modelValue
         * @description Event emitted for setting the modelValue
         */
        'update:modelValue'
    ],
    props: {
        /**
         * @description The size variant of the alert
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: defaultPropValue(componentName, 'size'),
            validator: sizePropValidator
        },
        /**
         * @description The color variant of the alert
         * @type info | success | warning | danger
         * @default info
         */
        color: {
            type: String,
            default: defaultPropValue(componentName, 'color')
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
        }
    },
    data() {
        return {
            dismissed: false
        }
    },
    computed: {
        classes() {
            return {
                [`-${this.color}`]: Boolean(this.color),
                [`-${this.size}`]: Boolean(this.size),
                '-dismissible': this.dismissible,
                '-with-icon': Boolean(this.$slots.icon)
            }
        }
    },
    methods: {
        dismiss() {
            this.dismissed = true;

            this.$emit('update:modelValue', false);
        },
    },
    watch: {
        modelValue(value) {
            this.dismissed = !value;
        }
    }
};
