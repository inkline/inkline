<script lang="ts">
import { ref, computed, h, watch, defineComponent } from 'vue';
import type { VNode, PropType } from 'vue';
import { GridBox } from '@inkline/component-box';
import { Icon } from '@inkline/component-icon';
import { Renderable } from '@inkline/types';
import { useOptions } from '@inkline/composables';
import { toVariantList } from '@inkline/utils';

const componentName = 'Alert';

const iconByType: Record<string, VNode> = {
    info: h(Icon, { name: 'ink:info' }),
    success: h(Icon, { name: 'ink:check' }),
    warning: h(Icon, { name: 'ink:warning' }),
    danger: h(Icon, { name: 'ink:danger' })
};

export function useAlertVariants() {
    const { addThemeVariant } = useOptions();
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
    const colors = ['info', 'success', 'warning', 'danger'];
    const builtins = [...sizes, ...colors];

    addThemeVariant(
        'alert',
        {
            extends: ['alert:md', 'alert:info']
        },
        { default: true }
    );

    sizes.forEach((size) => {
        addThemeVariant(
            `alert:${size}`,
            {
                extends: [`box:${size}`]
            },
            { default: true }
        );
    });

    colors.forEach((color) => {
        addThemeVariant(
            `alert:${color}`,
            {
                extends: [`${color}:tint`]
            },
            { default: true }
        );
    });

    return {
        builtins,
        colors,
        sizes
    };
}

export default defineComponent({
    name: componentName,
    components: {
        GridBox,
        Icon
    },
    props: {
        /**
         * The variant of the alert
         * @param {'info' | 'success' | 'warning' | 'danger'} variant
         * @default 'info'
         */
        variant: {
            type: [String, Array] as PropType<string | string[]>,
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
    setup(props, { emit }) {
        const { builtins, colors } = useAlertVariants();

        const variants = computed(() => {
            const variantList = toVariantList(props.variant);

            return ['alert', ...variantList.map((v) => (builtins.includes(v) ? `alert:${v}` : v))];
        });

        const visible = ref<boolean | undefined>(
            typeof props.modelValue !== 'undefined' ? props.modelValue : true
        );

        const resolvedIcon = computed(() => {
            const variantList = toVariantList(props.variant);
            const color = variantList.find((v) => colors.includes(v)) ?? 'info';

            return typeof props.icon !== 'undefined' ? props.icon : iconByType[color];
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
    <GridBox
        v-show="visible"
        class="alert"
        direction="row"
        role="alert"
        no-wrap
        :variant="variants"
    >
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
    </GridBox>
</template>
