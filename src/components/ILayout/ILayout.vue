<script lang="ts" setup>
import {computed} from 'vue';

const componentName = 'ILayout';

const props = defineProps({
    /**
     * Display the layout on a vertical orientation
     * @type Boolean
     * @default false
     * @name vertical
     */
    vertical: {
        type: Boolean,
        default: false
    }
});

const classes = computed(() => ({
    '-vertical': props.vertical
}))
</script>

<template>
    <main class="layout" :class="classes">
        <!-- @slot default Slot for default layout content -->
        <slot />
    </main>
</template>
