<script lang="ts">
import { h, computed, defineComponent } from 'vue';
import type { Component } from 'vue';
import type { PropType } from 'vue';
import { useVariants } from '@inkline/variants';
import { ComponentVariantProps } from '@inkline/types';

const componentName = 'Box';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The component to use as the root element
         * @default undefined
         * @param {string} component
         */
        component: {
            type: Object as PropType<Component>,
            default: undefined
        },
        /**
         * The HTML tag to use for the component root element
         * @default div
         * @param {string} tag
         */
        tag: {
            type: String,
            default: 'div'
        },
        /**
         * The variants applied to the component
         * @param {string | string[] | ComponentVariantProps} variant
         * @default []
         */
        variant: {
            type: [String, Array, Object] as PropType<string | string[] | ComponentVariantProps>,
            default: 'default'
        }
    },
    setup(props, { slots }) {
        const variants = computed(() => ({ default: props.variant }));
        const { classes } = useVariants(componentName, variants);

        // <!-- @slot default The default slot of the box component -->
        return () =>
            h(
                props.component ?? props.tag,
                { class: classes.value, ...(props.component ? { tag: props.tag } : {}) },
                slots.default?.()
            );
    }
});
</script>
