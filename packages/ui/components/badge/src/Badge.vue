<script lang="ts">
import { useComponentColor, useComponentSize } from '@inkline/composables';
import { computed, defineComponent, toRef } from 'vue';

const componentName = 'Badge';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the badge
         * @param {'primary' | 'success' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger'} color
         * @default
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The size variant of the badge
         * @param {'sm' | 'md' | 'lg'} sizeMultiplier
         * @default
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * Display the badge as a pill
         * @param {boolean} pill
         * @default false
         */
        pill: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const rawColor = toRef(props, 'color');
        const rawSize = toRef(props, 'size');
        const { color } = useComponentColor(componentName, rawColor);
        const { size } = useComponentSize(componentName, rawSize);

        const classes = computed(() => ({
            [`-${color.value}`]: Boolean(color.value),
            [`-${size.value}`]: Boolean(size.value),
            '-pill': props.pill
        }));

        return {
            classes
        };
    }
});
</script>

<template>
    <div v-bind="$attrs" class="badge" :class="classes">
        <!-- @slot default Slot for default badge content -->
        <slot />
    </div>
</template>
