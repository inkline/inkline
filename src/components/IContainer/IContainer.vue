<script lang="ts" setup>
import { computed } from 'vue';

const componentName = 'IContainer';

const props = defineProps({
    /**
     * Display the container as fluid, always spanning 100% width
     * @type Boolean
     * @default false
     * @name fluid
     */
    fluid: {
        type: Boolean,
        default: false
    }
});

const classes = computed(() => ({
    '-fluid': props.fluid
}));
</script>

<template>
    <div class="container" :class="classes">
        <!-- @slot default Slot for default container content -->
        <slot />
    </div>
</template>
