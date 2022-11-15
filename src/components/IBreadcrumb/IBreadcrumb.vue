<script setup lang="ts">
import { computed } from 'vue';
import { useComponentColor, useComponentSize } from '@inkline/inkline/composables';

const componentName = 'IBreadcrumb';

const props = defineProps({
    /**
     * The aria-label of the breadcrumbs
     * @type String
     * @default Breadcrumbs
     * @name ariaLabel
     */
    ariaLabel: {
        type: String,
        default: 'Breadcrumbs'
    },
    /**
     * The color variant of the breadcrumb
     * @type light | dark
     * @default light
     * @name color
     */
    color: {
        type: String,
        default: undefined
    },
    /**
     * The size variant of the breadcrumb
     * @type sm | md | lg
     * @default md
     * @name size
     */
    size: {
        type: String,
        default: undefined
    }
});

const color = useComponentColor({ componentName, currentColor: props.color });
const size = useComponentSize({ componentName, currentSize: props.size });

const classes = computed(() => ({
    [`-${color.value}`]: Boolean(color.value),
    [`-${size.value}`]: Boolean(size.value)
}));
</script>

<template>
    <nav class="breadcrumb" :class="classes" :aria-label="ariaLabel" v-bind="$attrs">
        <ol>
            <!-- @slot default Slot for default breadcrumb content -->
            <slot />
        </ol>
    </nav>
</template>
