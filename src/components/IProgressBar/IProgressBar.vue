<script lang="ts" setup>
import {inject, computed} from 'vue';
import { computedColorValue } from '@inkline/inkline/mixins';
import {ProgressKey} from "@inkline/inkline/components/IProgressBar/mixin";

const componentName = 'IProgressBar';

const props = defineProps({
    /**
     * The color variant of the progress bar
     * @type light | dark | primary | secondary | info | success | warning | danger
     * @default primary
     * @name color
     */
    color: {
        type: String,
        default: 'primary'
    },
    /**
     * The value of the progress bar
     * @type Number
     * @default 0
     * @name value
     */
    value: {
        type: [String, Number],
        default: 0
    }
});

const progress = inject(ProgressKey, null);

const computedValue = computed(() => {
    const value = typeof props.value === 'string' ? parseFloat(props.value.replace('%', '')) : props.value;

    if (!progress) { return value; }

    const min = typeof progress.min.value === 'string' ? parseFloat(progress.min.value) : progress.min.value;
    const max = typeof progress.max.value === 'string' ? parseFloat(progress.max.value) : progress.max.value;

    return (value - min) * 100 / (max - min);
});

const style = computed(() => ({
    width: `${computedValue.value}%`
}));

const classes = computed(() => ({
    [`-${props.color}`]: true
}));
</script>

<template>
    <div
        class="progress-bar"
        :class="classes"
        :style="style"
        role="progressbar"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="computedValue"
    >
        <!-- @slot default Slot for default progress bar content -->
        <slot />
    </div>
</template>
