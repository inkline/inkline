<script lang="ts" setup>
import {computed, provide} from 'vue';
import { useComponentSize, useInputState } from '@inkline/inkline/composables';
import {ButtonGroupKey} from "@inkline/inkline/components/IButtonGroup/mixin";

const componentName = 'IButtonGroup';

const props = defineProps({
    /**
     * Display the button group with vertical orientation
     * @type Boolean
     * @default false
     * @name vertical
     */
    vertical: {
        type: Boolean,
        default: false
    },
    /**
     * Display the button group as a block, spanning the full container width
     * @type Boolean
     * @default false
     * @name block
     */
    block: {
        type: Boolean,
        default: false
    },
    /**
     * The disabled state of the button group
     * @type Boolean
     * @default false
     * @name disabled
     */
    disabled: {
        type: Boolean,
        default: false
    },
    /**
     * The size of the button group
     * @type String
     * @default
     * @name size
     */
    size: {
        type: String,
        default: undefined
    }
});

const componentSize = useComponentSize({ componentName, currentSize: props.size });
const { disabled, size } = useInputState({
    disabled: props.disabled,
    size: componentSize.value
});

const isDisabled = computed(() => {
    return props.disabled || disabled.value;
});

const classes = computed(() => ({
    [`-${size.value}`]: true,
    '-vertical': props.vertical,
    '-block': props.block,
    '-disabled': isDisabled.value
}));

provide(ButtonGroupKey, { disabled: isDisabled, size: componentSize });
</script>

<template>
    <div
        class="button-group"
        :class="classes"
        role="group"
        :aria-disabled="isDisabled"
        v-bind="$attrs"
    >
        <!--** Slot for default button group content -->
        <slot />
    </div>
</template>
