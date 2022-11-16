<script lang="ts" setup>
import {computed, inject, ref} from 'vue';
import { useComponentSize } from '@inkline/inkline/composables';
import {FormKey} from "@inkline/inkline/components/IForm";
import {FormGroupKey} from "@inkline/inkline/components/IFormGroup";

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

const form = inject(FormKey, null);
const formGroup = inject(FormGroupKey, null);

const currentSize = computed(() => props.size || formGroup?.size.value || form?.size.value);
const { size } = useComponentSize({ componentName, currentSize });

const classes = computed(() => ({
    [`-${size.value}`]: true,
    [`-${props.placement}`]: Boolean(props.placement)
}));

function onClick() {
    if (props.for) {
        return;
    }
    if (labelRef.value) {
        // @TODO: Find a better way to focus the next input
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
        <!-- @slot default Slot for default form label content  -->
        <slot />
    </label>
</template>
