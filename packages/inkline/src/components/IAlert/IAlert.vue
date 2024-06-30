<script lang="ts">
import { ref, toRefs, computed, watch, defineComponent, onBeforeUpdate } from 'vue';
import { useComponentColor, useComponentSize } from '@inkline/inkline/composables';

const componentName = 'IAlert';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The size variant of the alert
         * @type sm | md | lg
         * @default
         * @name sizeMultiplier
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
         * Used to show or hide the alert
         * @type Boolean
         * @default undefined
         * @name modelValue
         */
        modelValue: {
            type: Boolean,
            default: undefined
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
    setup(props, { emit, slots }) {
        const { modelValue } = toRefs(props);
        const visible = ref<boolean | undefined>(
            typeof modelValue.value !== 'undefined' ? modelValue.value : true
        );

        const currentColor = computed(() => props.color);
        const currentSize = computed(() => props.size);
        const { color } = useComponentColor({ componentName, color: currentColor });
        const { size } = useComponentSize({ componentName, size: currentSize });

        const slotsClasses = ref(getSlotsClasses());
        const classes = computed(() => ({
            [`-${color.value}`]: Boolean(color.value),
            [`-${size.value}`]: Boolean(size.value),
            '-dismissible': props.dismissible,
            ...slotsClasses.value
        }));

        onBeforeUpdate(() => {
            slotsClasses.value = getSlotsClasses();
        });

        watch(
            () => props.modelValue,
            (value) => {
                visible.value = value;
            }
        );

        function getSlotsClasses() {
            return {
                '-with-icon': Boolean(slots.icon)
            };
        }

        function dismiss() {
            visible.value = false;
            emit('update:modelValue', false);
        }

        return {
            classes,
            visible,
            dismiss
        };
    }
});
</script>

<template>
    <div v-show="visible" v-bind="$attrs" class="alert" role="alert" :class="classes">
        <span v-if="$slots.icon" class="alert-icon" role="img" aria-hidden="true">
            <!-- @slot icon Slot for alert icon -->
            <slot name="icon" />
        </span>
        <div class="alert-content">
            <div v-if="$slots.title" class="alert-title">
                <!-- @slot title Slot for alert title -->
                <slot name="title" />
            </div>
            <!-- @slot default Slot for default alert content -->
            <slot />
        </div>
        <span
            v-if="dismissible"
            class="alert-dismiss"
            role="button"
            :aria-label="dismissAriaLabel"
            @click="dismiss"
        >
            <!-- @slot dismiss Slot for alert dismiss button -->
            <slot name="dismiss">&times;</slot>
        </span>
    </div>
</template>
