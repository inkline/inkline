<script lang="ts">
import { computed, defineComponent, inject, PropType, provide } from 'vue';
import { ButtonGroupKey } from '@inkline/types';
import { BaseComponent } from '@inkline/component-base';
import { toVariantList } from '@inkline/variants';

const componentName = 'ButtonGroup';

export default defineComponent({
    name: componentName,
    components: {
        BaseComponent
    },
    props: {
        /**
         * Display the button group with vertical orientation
         * @param {boolean} vertical
         * @default false
         */
        vertical: {
            type: Boolean,
            default: false
        },
        /**
         * Display the button group as a block, spanning the full container width
         * @param {boolean} block
         * @default false
         */
        block: {
            type: Boolean,
            default: false
        },
        /**
         * The disabled state of the button group
         * @param {boolean} disabled
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * The size of the button group
         * @param {string} size
         * @default
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * The color of the button group
         * @param {string} color
         * @default
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The variant of the button
         * @param {string} variant
         * @default
         */
        variant: {
            type: [String, Array] as PropType<string | string[]>,
            default: undefined
        }
    },
    setup(props) {
        const buttonGroup = inject(ButtonGroupKey, null);

        const color = computed(() => props.color || buttonGroup?.color.value);
        const size = computed(() => props.size || buttonGroup?.size.value);

        const variantList = computed(() => toVariantList(props.variant));
        const variants = computed(() => [
            'button-group',
            ...(props.block ? ['button-group--block'] : []),
            ...(buttonGroup ? (buttonGroup.variants.value ?? []) : []),
            ...variantList.value
        ]);

        const isDisabled = computed((): boolean => {
            return !!(props.disabled || buttonGroup?.disabled.value);
        });

        const classes = computed(() => ({
            '-horizontal': !props.vertical,
            '-vertical': props.vertical,
            '-block': props.block
        }));

        const childVariants = computed(() => [
            'button-group--child',
            ...(props.block ? ['button-group--block--child'] : [])
        ]);

        provide(ButtonGroupKey, {
            disabled: isDisabled,
            size,
            color,
            variants: childVariants
        });

        return {
            isDisabled,
            classes,
            variants
        };
    }
});
</script>

<template>
    <BaseComponent
        role="group"
        class="button-group"
        :aria-disabled="isDisabled ? 'true' : undefined"
        :variant="variants"
        :class="classes"
    >
        <!-- @slot default Slot for default button group content -->
        <slot />
    </BaseComponent>
</template>
