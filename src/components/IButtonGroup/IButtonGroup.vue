<script lang="ts">
import { computed, defineComponent, inject, provide } from 'vue';
import { useComponentColor, useComponentSize } from '@inkline/inkline/composables';
import { ButtonGroupKey } from '@inkline/inkline';

const componentName = 'IButtonGroup';

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
    },
    setup(props) {
        const buttonGroup = inject(ButtonGroupKey, null);

        const currentColor = computed(() => props.color || buttonGroup?.color.value);
        const currentSize = computed(() => props.size || buttonGroup?.size.value);
        const { color } = useComponentColor({ componentName, currentColor });
        const { size } = useComponentSize({ componentName, currentSize });

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

        return {
            classes,
            disabled
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
        :aria-disabled="disabled ? 'true' : undefined"
    >
        <!-- @slot default Slot for default button group content -->
        <slot />
    </div>
</template>
