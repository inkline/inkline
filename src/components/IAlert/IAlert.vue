<script lang="ts">
import { ref, useSlots, computed, watch, defineComponent } from 'vue';
import { useComponentColor, useComponentSize } from '@inkline/inkline/composables';

const componentName = 'IAlert';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The size variant of the alert
         * @type sm | md | lg
         * @default
         * @name size
         */
        size: {
            type: String,
            default: undefined
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
    setup(props, { emit }) {
        const dismissed = ref(false);

        const currentColor = computed(() => props.color);
        const currentSize = computed(() => props.size);
        const { color } = useComponentColor({ componentName, currentColor });
        const { size } = useComponentSize({ componentName, currentSize });

        const classes = computed(() => ({
            [`-${color.value}`]: Boolean(color.value),
            [`-${size.value}`]: Boolean(size.value),
            '-dismissible': props.dismissible,
            '-with-icon': Boolean(useSlots().icon)
        }));

        watch(
            () => props.modelValue,
            (value) => {
                dismissed.value = !value;
            }
        );

        function dismiss() {
            dismissed.value = true;
            emit('update:modelValue', false);
        }

        return {
            classes,
            dismissed,
            dismiss
        };
    }
});
</script>

<template>
    <div v-show="!dismissed" class="alert" role="alert" :class="classes">
        <span v-if="$slots.icon" class="icon" role="img" aria-hidden="true">
            <!-- @slot icon Slot for alert icon -->
            <slot name="icon" />
        </span>
        <div class="content">
            <!-- @slot default Slot for default alert content -->
            <slot />
        </div>
        <span
            v-if="dismissible"
            class="dismiss"
            role="button"
            :aria-label="dismissAriaLabel"
            @click="dismiss"
        >
            <!-- @slot dismiss Slot for alert dismiss button -->
            <slot name="dismiss">&times;</slot>
        </span>
    </div>
</template>
