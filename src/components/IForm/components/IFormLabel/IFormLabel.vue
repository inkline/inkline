<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useComponentSize } from '@inkline/inkline/composables';

const componentName = 'IFormLabel';
const labelRef = ref<HTMLLabelElement | null>(null);

const props = defineProps({
    /**
     * The id of the target input to be focused by the form label. If left empty, clicking the form label will focus the next sibling input
     * @type String
     * @default
     * @name for
     */
    for: {
        type: String,
        default: ''
    },
    /**
     * The placement of the form label
     * @type left | right
     * @default left
     * @name placement
     */
    placement: {
        type: String,
        default: ''
    },
    /**
     * The size variant of the form label
     * @type sm | md | lg
     * @default md
     * @name size
     */
    size: {
        type: String,
        default: 'md'
    }
});

const size = useComponentSize({ componentName, currentSize: props.size });

const classes = computed(() => ({
    [`-${props.size}`]: Boolean(props.size),
    [`-${props.placement}`]: Boolean(props.placement)
}));

function onClick() {
    if (props.for) {
        return;
    }
    if (labelRef.value) {
        // return labelRef.value?.nextSibling?.querySelector('input, textarea').focus();
    }
}
</script>

<template>
    <label
        ref="labelRef"
        class="form-label"
        :class="classes"
        :for="props.for"
        v-bind="$attrs"
        @click="onClick"
    >
        <!--** Slot for default form label content  -->
        <slot />
    </label>
</template>
