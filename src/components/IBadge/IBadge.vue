<script lang="ts" setup>
import { useComponentColor, useComponentSize } from '@inkline/inkline/composables';
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
        default: undefined
    },
    /**
     * The size variant of the badge
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
    <div class="badge" :class="classes" v-bind="$attrs">
        <!-- @slot default Slot for default badge content -->
        <slot />
    </div>
</template>
