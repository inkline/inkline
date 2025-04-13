<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { BaseComponent } from '@inkline/component-base';
import { toVariantList } from '@inkline/variants';

const componentName = 'Badge';

export default defineComponent({
    name: componentName,
    components: { BaseComponent },
    props: {
        /**
         * The color of the badge
         * @param {'primary' | 'secondary' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger' | string} color
         * @default undefined
         */
        color: {
            type: String as PropType<
                | 'primary'
                | 'secondary'
                | 'light'
                | 'dark'
                | 'info'
                | 'success'
                | 'warning'
                | 'danger'
                | string
            >,
            default: undefined
        },
        /**
         * The size of the badge
         * @param { 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'inherit' | string } size
         * @default undefined
         */
        size: {
            type: String as PropType<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'inherit' | string>,
            default: undefined
        },
        /**
         * The variant of the badge
         * @param {string | string[]} variant
         * @default
         */
        variant: {
            type: [String, Array] as PropType<string | string[]>,
            default: undefined
        },
        /**
         * Display the badge as a pill
         * @param {boolean} pill
         * @default false
         */
        pill: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const variantList = computed(() => toVariantList(props.variant));
        const variants = computed(() => [
            'badge',
            ...(props.pill ? ['badge--pill'] : []),
            ...(props.color ? [`badge--${props.color}`] : []),
            ...(props.size ? [`badge--${props.size}`] : []),
            ...variantList.value
        ]);

        return {
            variants
        };
    }
});
</script>

<template>
    <BaseComponent class="badge" :variant="variants">
        <!-- @slot default Slot for default badge content -->
        <slot />
    </BaseComponent>
</template>
