<script lang="ts">
import {
    ref,
    computed,
    watch,
    defineComponent,
    onBeforeUpdate,
    toRef,
    type VNode,
    h,
    type PropType
} from 'vue';
import { useComponentColor, useComponentSize } from '@inkline/composables';
import { Icon } from '@inkline/component-icon';
import { Renderable } from '@inkline/types';

const componentName = 'Alert';

const iconByType: Record<string, VNode> = {
    info: h(Icon, { name: 'ink:info' }),
    success: h(Icon, { name: 'ink:check' }),
    warning: h(Icon, { name: 'ink:warning' }),
    danger: h(Icon, { name: 'ink:danger' })
};

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The size variant of the alert
         * @param {'sm' | 'md' | 'lg'} size
         * @default undefined
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * The color variant of the alert
         * @param {'info' | 'success' | 'warning' | 'danger'} color
         * @default 'info'
         */
        color: {
            type: String,
            default: 'info'
        },
        /**
         * Used to show or hide the alert
         * @param {boolean} modelValue
         * @default undefined
         */
        modelValue: {
            type: Boolean,
            default: undefined
        },
        /**
         * Shows a dismiss icon on the alert
         * @param {boolean} dismissible
         * @default false
         */
        dismissible: {
            type: Boolean,
            default: false
        },
        /**
         * The aria-label to use for the dismiss button
         * @param {string} dismissAriaLabel
         * @default Dismiss
         */
        dismissAriaLabel: {
            type: String,
            default: 'Dismiss'
        },
        /**
         * The icon to be rendered in the toast
         * @param {string | VNode | VNode[]} icon
         * @default undefined
         */
        icon: {
            type: [Number, Boolean, String, Function, Array, Object] as PropType<Renderable>,
            default: undefined
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
        const rawColor = toRef(props, 'color');
        const rawSize = toRef(props, 'size');
        const { color } = useComponentColor(componentName, rawColor);
        const { size } = useComponentSize(componentName, rawSize);

        const visible = ref<boolean | undefined>(
            typeof props.modelValue !== 'undefined' ? props.modelValue : true
        );

        const slotsClasses = ref(getSlotsClasses());
        const classes = computed(() => ({
            [`-${color.value}`]: Boolean(color.value),
            [`-${size.value}`]: Boolean(size.value),
            '-dismissible': props.dismissible,
            ...slotsClasses.value
        }));

        const resolvedIcon = computed(() =>
            typeof props.icon !== 'undefined' ? props.icon : iconByType[color.value]
        );

        const isVNodeIcon = computed(() => typeof resolvedIcon.value === 'object');

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
            resolvedIcon,
            isVNodeIcon,
            dismiss
        };
    }
});
</script>

<template>
    <div v-show="visible" v-bind="$attrs" class="alert" role="alert" :class="classes">
        <span v-if="resolvedIcon || $slots.icon" class="alert-icon" role="img" aria-hidden="true">
            <!-- @slot icon Slot for alert icon -->
            <slot name="icon">
                <component :is="resolvedIcon" v-if="isVNodeIcon" />
                <span v-else>{{ resolvedIcon }}</span>
            </slot>
        </span>
        <div class="alert-content">
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
