<script setup lang="ts">
import { computed } from 'vue';
import { computedColorValue, computedSizeValue } from '@inkline/inkline/mixins';

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
        default: ''
    },
    /**
     * The size variant of the breadcrumb
     * @type sm | md | lg
     * @default md
     * @name size
     */
    size: {
        type: String,
        default: ''
    }
});

const computedColor = computed(() => computedColorValue(componentName, props.color));

const computedSize = computed(() => computedSizeValue(componentName, props.size));

const classes = computed(() => ({
    [`-${computedColor.value}`]: Boolean(computedColor),
    [`-${computedSize.value}`]: Boolean(computedSize)
}));
</script>

<template>
    <nav class="breadcrumb" :class="classes" :aria-label="ariaLabel" v-bind="$attrs">
        <ol>
            <!--** Slot for default breadcrumb content -->
            <slot />
        </ol>
    </nav>
</template>
