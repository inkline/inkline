<script lang="ts" setup>
import {computed, defineComponent} from 'vue';
import { computedColorValue, computedSizeValue } from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';
import {useComponentColor, useComponentSize} from "@inkline/inkline/composables";

const componentName = 'ILoader';

const props = defineProps({
    /**
     * The color variant of the loader
     * @type primary | light | dark
     * @default light
     * @name color
     */
    color: {
        type: String,
        default: ''
    },
    /**
     * The size variant of the loader
     * @type sm | md | lg | auto
     * @default md
     * @name size
     */
    size: {
        type: String,
        default: ''
    }
});

const currentColor = computed(() => props.color);
const currentSize = computed(() => props.size);
const { color } = useComponentColor({ componentName, currentColor });
const { size } = useComponentSize({ componentName, currentSize });

const classes = computed(() => ({
    [`-${color.value}`]: true,
    [`-${size.value}`]: true,
}));
</script>

<template>
    <div class="loader" :class="classes" role="img" aria-hidden="true">
        <span v-if="$slots.default" class="loader-text">
            <!-- @slot default Slot for default loader content -->
            <slot />
        </span>
        <svg viewBox="25 25 50 50">
            <circle cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10" />
        </svg>
    </div>
</template>
