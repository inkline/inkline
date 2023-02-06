<script lang="ts">
import { computed, defineComponent, h, VNode } from 'vue';
import { useComponentColor, useComponentSize } from '@inkline/inkline/composables';
import { IIcon } from '@inkline/inkline/components';

const componentName = 'IToast';

const iconByType: Record<string, VNode> = {
    light: h(IIcon, { name: 'ink-circle' }),
    dark: h(IIcon, { name: 'ink-circle' }),
    info: h(IIcon, { name: 'ink-info' }),
    success: h(IIcon, { name: 'ink-danger' }),
    warning: h(IIcon, { name: 'ink-warning' }),
    danger: h(IIcon, { name: 'ink-danger' })
};

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The size variant of the toast
         * @type sm | md | lg
         * @default
         * @name size
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * The color variant of the toast
         * @type light | dark | info | success | warning | danger
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The icon to be rendered in the toast
         * @type string | VNode | VNode[]
         * @default undefined
         * @name icon
         */
        icon: {
            type: String,
            default: undefined
        }
    },
    setup(props) {
        const currentColor = computed(() => props.color);
        const currentSize = computed(() => props.size);
        const { color } = useComponentColor({ componentName, currentColor });
        const { size } = useComponentSize({ componentName, currentSize });

        const classes = computed(() => ({
            [`-${color.value}`]: Boolean(color.value),
            [`-${size.value}`]: Boolean(size.value)
        }));

        const icon = computed(() =>
            typeof props.icon !== 'undefined' ? props.icon : iconByType[color.value]
        );

        return {
            classes,
            icon
        };
    }
});
</script>

<template>
    <div v-bind="$attrs" class="toast" :class="classes">
        <span v-if="icon || $slots.icon" class="icon" role="img" aria-hidden="true">
            <!-- @slot icon Slot for toast icon -->
            <slot name="icon">
                <component :is="icon" />
            </slot>
        </span>
        <div class="content">
            <div v-if="$slots.title" class="title">
                <!-- @slot default Slot for toast title -->
                <slot name="title" />
            </div>
            <!-- @slot default Slot for default toast content -->
            <slot />
        </div>
    </div>
</template>
