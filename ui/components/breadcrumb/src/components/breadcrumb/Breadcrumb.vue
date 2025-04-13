<script lang="ts">
import { computed, defineComponent, type PropType, toRef } from 'vue';
import { useComponentColor, useComponentSize } from '@inkline/composables';
import { BaseComponent } from '@inkline/component-base';
import { toVariantList } from '@inkline/variants';

const componentName = 'Breadcrumb';

export default defineComponent({
    name: componentName,
    components: {
        BaseComponent
    },
    props: {
        /**
         * The aria-label of the breadcrumbs
         * @param {string} ariaLabel
         * @default Breadcrumbs
         */
        ariaLabel: {
            type: String,
            default: 'Breadcrumbs'
        },
        /**
         * The color variant of the breadcrumb
         * @param {'light' | 'dark' | string} color
         * @default
         */
        color: {
            type: String as PropType<'light' | 'dark' | string>,
            default: undefined
        },
        /**
         * The size variant of the breadcrumb
         * @param {'xs' | 'sm' | 'md' | 'lg' | 'xl' | string} size
         * @default
         */
        size: {
            type: String as PropType<'xs' | 'sm' | 'md' | 'lg' | 'xl' | string>,
            default: undefined
        },
        /**
         * The variant of the alert
         * @param {string} variant
         * @default 'info'
         */
        variant: {
            type: [String, Array] as PropType<string | string[]>,
            default: undefined
        }
    },
    setup(props) {
        const variantList = computed(() => toVariantList(props.variant));
        const variants = computed(() => [
            'breadcrumb',
            ...(props.color ? [`breadcrumb--${props.color}`] : []),
            ...(props.size ? [`breadcrumb--${props.size}`] : []),
            ...variantList.value
        ]);

        return {
            variants
        };
    }
});
</script>

<template>
    <BaseComponent class="breadcrumb" tag="nav" :variant="variants" :aria-label="ariaLabel">
        <!-- @slot default Slot for default breadcrumb content -->
        <slot />
    </BaseComponent>
</template>
