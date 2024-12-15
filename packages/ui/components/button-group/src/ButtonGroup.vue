<script lang="ts">
import { computed, defineComponent, inject, provide } from 'vue';
import { ButtonGroupKey } from '@inkline/types';
import { useComponentColor, useComponentSize } from '@inkline/composables';

const componentName = 'ButtonGroup';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
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
         * @name sizeMultiplier
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
    },
    setup(props) {
        const buttonGroup = inject(ButtonGroupKey, null);

        const rawColor = computed(() => props.color || buttonGroup?.color.value);
        const rawSize = computed(() => props.size || buttonGroup?.size.value);
        const { color } = useComponentColor(componentName, rawColor);
        const { size } = useComponentSize(componentName, rawSize);

        const isDisabled = computed((): boolean => {
            return !!(props.disabled || buttonGroup?.disabled.value);
        });

        const classes = computed(() => ({
            [`-${size.value}`]: true,
            [`-${color.value}`]: true,
            '-horizontal': !props.vertical,
            '-vertical': props.vertical,
            '-block': props.block,
            '-disabled': isDisabled.value
        }));

        provide(ButtonGroupKey, {
            disabled: isDisabled,
            size,
            color
        });

        return {
            classes,
            isDisabled
        };
    }
});
</script>

<template>
    <div
        v-bind="$attrs"
        role="group"
        class="button-group"
        :class="classes"
        :aria-disabled="isDisabled ? 'true' : undefined"
    >
        <!-- @slot default Slot for default button group content -->
        <slot />
    </div>
</template>
