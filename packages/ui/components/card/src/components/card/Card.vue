<script lang="ts">
import { computed, defineComponent, toRef } from 'vue';
import { useComponentColor, useComponentSize } from '@inkline/composables';

const componentName = 'Card';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The color variant of the card
         * @param {'primary' | 'success' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger'} color
         * @default
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The size variant of the card
         * @param {'sm' | 'md' | 'lg'} size
         * @default
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * The HTML tag to use for the card root element
         * @default div
         * @param {string} tag
         */
        tag: {
            type: String,
            default: 'div'
        }
    },
    setup(props) {
        const rawColor = toRef(props, 'color');
        const rawSize = toRef(props, 'size');
        const { color } = useComponentColor(componentName, rawColor);
        const { size } = useComponentSize(componentName, rawSize);
        const classes = computed(() => ({ [`-${color.value}`]: true, [`-${size.value}`]: true }));

        return {
            classes
        };
    }
});
</script>

<template>
    <component :is="tag" class="card" :class="classes">
        <!-- @slot default Slot for card content -->
        <slot />
    </component>
</template>
