<script lang="ts">
import { computed, defineComponent, toRef } from 'vue';
import { useComponentColor, useComponentSize } from '@inkline/composables';

const componentName = 'Loader';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the loader
         * @param {'primary' | 'light' | 'dark'} color
         * @default
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The size variant of the loader
         * @param {'sm' | 'md' | 'lg' | 'auto'} sizeMultiplier
         * @default
         */
        size: {
            type: String,
            default: undefined
        }
    },
    setup(props) {
        const rawColor = toRef(props, 'color');
        const rawSize = toRef(props, 'size');
        const { color } = useComponentColor(componentName, rawColor);
        const { size } = useComponentSize(componentName, rawSize);

        const classes = computed(() => ({
            [`-${color.value}`]: true,
            [`-${size.value}`]: true
        }));

        return {
            classes
        };
    }
});
</script>

<template>
    <div v-bind="$attrs" class="loader" :class="classes" role="img" aria-hidden="true">
        <span v-if="$slots.default" class="loader-text">
            <!-- @slot default Slot for default loader content -->
            <slot />
        </span>
        <svg viewBox="25 25 50 50">
            <circle cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10" />
        </svg>
    </div>
</template>
