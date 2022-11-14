<script lang="ts" setup>
import {computed, inject, provide} from 'vue';
import {useComponentColor, useComponentSize} from '@inkline/inkline/composables';
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
    },
    /**
     * The color of the button group
     * @type String
     * @default
     * @name color
     */
    color: {
        type: String,
        default: undefined
    }
});

const buttonGroup = inject(ButtonGroupKey, null);

const color = useComponentColor({ componentName, currentColor: props.color || buttonGroup?.color.value });
const size = useComponentSize({ componentName, currentSize: props.size || buttonGroup?.size.value });

const disabled = computed((): boolean => {
    return !!(props.disabled || disabled.value || buttonGroup?.disabled.value);
});

const classes = computed(() => ({
    [`-${size.value}`]: true,
    [`-${color.value}`]: true,
    '-vertical': props.vertical,
    '-block': props.block,
    '-disabled': disabled.value
}));

provide(ButtonGroupKey, {
    disabled,
    size,
    color
});
</script>

<template>
    <div
        class="button-group"
        :class="classes"
        role="group"
        :aria-disabled="disabled ? 'true' : null"
        v-bind="$attrs"
    >
        <!--** Slot for default button group content -->
        <slot />
    </div>
</template>
