<script lang="ts" setup>
import { computedColorValue, computedSizeValue } from '@inkline/inkline/mixins';
import { computed } from 'vue';

const componentName = 'IBadge';

const props = defineProps({
    /**
     * The color variant of the badge
     * @type primary | success | light | dark | info | success | warning | danger
     * @default light
     * @name color
     */
    color: {
        type: String,
        default: ''
    },
    /**
     * The size variant of the badge
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
    <div class="badge" :class="classes" v-bind="$attrs">
        <!--** Slot for default badge content -->
        <slot />
    </div>
</template>
