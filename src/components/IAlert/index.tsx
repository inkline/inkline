import './style.scss';
import { defaultPropValue } from '@inkline/inkline/mixins';
import { h, computed, watch, defineComponent, ref } from '@inkline/paper';

const componentName = 'IAlert';

export default defineComponent({
    name: componentName,
    slots: [
        /**
         * Slot for default alert content
         * @name default
         * @kind slot
         */
        'default',
        /**
         * Slot for alert icon
         * @name icon
         * @kind slot
         */
        'icon',
        /**
         * Slot for alert dismiss button
         * @name dismiss
         * @kind slot
         */
        'dismiss'
    ],
    props: {
        /**
         * The size variant of the alert
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size')
        },
        /**
         * The color variant of the alert
         * @type info | success | warning | danger
         * @default info
         * @name color
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
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
    setup (props, { emit, hasSlot }) {
        const dismissed = ref(false);
        const classes = computed(() => `${
            props.color ? ` -${props.color}` : ''
        }${
            props.size ? ` -${props.size}` : ''
        }${
            props.dismissible ? ' -dismissible' : ''
        }${
            hasSlot('icon') ? ' -with-icon' : ''
        }`, [props.color, props.size, props.dismissible]);

        watch(() => props.modelValue, () => {
            dismissed.value = !props.modelValue;
        });

        const dismiss = () => {
            dismissed.value = true;

            emit('update:modelValue', false);
        };

        return { dismiss, dismissed, classes };
    },
    render ({ dismissible, dismiss, dismissed, dismissAriaLabel, classes }, { slot, hasSlot }) {
        return dismissed.value
            ? null
            : <div class={`alert${classes.value}`} role="alert">
                { hasSlot('icon') &&
                    <span class="icon" role="img" aria-hidden="true">
                        { slot('icon') }
                    </span>
                }
                <div class="content">
                    { slot() }
                </div>
                { dismissible &&
                    <span class="dismiss" role="button" onClick={dismiss} aria-label={dismissAriaLabel}>
                        { hasSlot('dismiss') ? slot('dismiss') : '×' }
                    </span>
                }
            </div>;
    }
});
