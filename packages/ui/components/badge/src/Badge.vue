<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { Box } from '@inkline/component-box';

const componentName = 'Badge';

export default defineComponent({
    name: componentName,
    components: { Box },
    props: {
        /**
         * The variant of the badge
         * @param {'primary' | 'success' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger'} variant
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
        const variants = computed(() => {
            // const variantList = toVariantList(props.variant);
            return [
                'badge',
                ...(props.pill ? ['badge:pill'] : [])
                // ...variantList.map((v) => (builtins.includes(v) ? `badge:${v}` : v))
            ];
        });

        return {
            variants
        };
    }
});
</script>

<template>
    <Box class="badge" :variant="variants">
        <!-- @slot default Slot for default badge content -->
        <slot />
    </Box>
</template>
