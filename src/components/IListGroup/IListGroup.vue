<script lang="ts" setup>
import {computed} from 'vue';
import {useComponentColor, useComponentSize} from "@inkline/inkline/composables";

const componentName = 'IListGroup';

const props = defineProps({
    /**
     * Display the list group border
     * @type Boolean
     * @default true
     * @name border
     */
    border: {
        type: Boolean,
        default: true
    },
    /**
     * The color variant of the list group
     * @type light | dark
     * @default light
     * @name color
     */
    color: {
        type: String,
        default: ''
    },
    /**
     * The size variant of the list group
     * @type sm | md | lg
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
    '-border': props.border
}));
</script>

<template>
    <div class="list-group" :class="classes" role="list">
        <!-- @slot default Slot for list group items -->
        <slot />
    </div>
</template>
