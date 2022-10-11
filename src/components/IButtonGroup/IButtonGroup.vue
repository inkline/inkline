<script lang="ts" setup>
import { computed, provide, inject } from 'vue';
import { useSize } from '@inkline/inkline/composables';
import {
    ButtonGroupInjection,
    ButtonGroupInjectionKey
} from '@inkline/inkline/components/IButtonGroup/mixin';

const componentName = 'IButtonGroup';
const buttonGroup = inject<ButtonGroupInjection>(ButtonGroupInjectionKey, {});
// const form = inject<FormInjection>(FormInjectionKey);
// const formGroup = inject<FormGroupInjection>('FormGroupInjectionKey');

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
        default: ''
    }
});

// const computedSize = computed(() => computedSizeValue(componentName, this.size || (this as any).buttonGroup.size);)
const size = useSize({ componentName, currentSize: props.size });

const isDisabled = computed(
    () => props.disabled || buttonGroup.disabled
    // ||
    // (this as any).form.disabled ||
    // (this as any).formGroup.disabled
);

const classes = computed(() => ({
    [`-${size}`]: Boolean(size),
    '-vertical': props.vertical,
    '-block': props.block,
    '-disabled': isDisabled.value
}));

provide(ButtonGroupInjectionKey, { disabled: props.disabled, size: props.size });
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
