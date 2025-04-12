<script lang="ts">
import { ref, computed, h, watch, defineComponent } from 'vue';
import type { VNode, PropType } from 'vue';
import { BaseComponent } from '@inkline/component-base';
import { Icon } from '@inkline/component-icon';
import { Renderable } from '@inkline/types';
import { toVariantList } from '@inkline/variants';

const componentName = 'Alert';

const iconByType: Record<string, VNode> = {
    info: h(Icon, { name: 'ink:info' }),
    success: h(Icon, { name: 'ink:check' }),
    warning: h(Icon, { name: 'ink:warning' }),
    danger: h(Icon, { name: 'ink:danger' })
};

export default defineComponent({
    name: componentName,
    components: {
        BaseComponent,
        Icon
    },
    props: {
        /**
         * The color of the alert
         * @param {'info' | 'success' | 'warning' | 'danger' | string} color
         * @default undefined
         */
        color: {
            type: String as PropType<'info' | 'success' | 'warning' | 'danger' | string>,
            default: undefined
        },
        /**
         * The size of the alert
         * @param { 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string } size
         * @default undefined
         */
        size: {
            type: String as PropType<'xs' | 'sm' | 'md' | 'lg' | 'xl' | string>,
            default: undefined
        },
        /**
         * The variant of the alert
         * @param {string} variant
         * @default 'info'
         */
        variant: {
            type: [String, Array] as PropType<string | string[]>,
            default: undefined
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
    setup(props, { emit }) {
        const variantList = computed(() => toVariantList(props.variant));
        const variants = computed(() => [
            'alert',
            ...(props.color ? [`alert--${props.color}`] : []),
            ...(props.size ? [`alert--${props.size}`] : []),
            ...variantList.value
        ]);

        const visible = ref<boolean | undefined>(
            typeof props.modelValue !== 'undefined' ? props.modelValue : true
        );

        const resolvedIcon = computed(() => {
            return typeof props.icon !== 'undefined'
                ? props.icon
                : iconByType[props.color ?? 'info'];
        });

        const isVNodeIcon = computed(() => typeof resolvedIcon.value === 'object');

        watch(
            () => props.modelValue,
            (value) => {
                visible.value = value;
            }
        );

        function dismiss() {
            visible.value = false;
            emit('update:modelValue', false);
        }

        return {
            variants,
            visible,
            resolvedIcon,
            isVNodeIcon,
            dismiss
        };
    }
});
</script>

<template>
    <BaseComponent v-show="visible" class="alert" role="alert" :variant="variants">
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
    </BaseComponent>
</template>
