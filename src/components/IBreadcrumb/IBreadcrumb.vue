<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useComponentColor, useComponentSize } from '@inkline/inkline/composables';

const componentName = 'IBreadcrumb';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The aria-label of the breadcrumbs
         * @type String
         * @default Breadcrumbs
         * @name ariaLabel
         */
        ariaLabel: {
            type: String,
            default: 'Breadcrumbs'
        },
        /**
         * The color variant of the breadcrumb
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The size variant of the breadcrumb
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: undefined
        }
    },
    setup(props) {
        const currentColor = computed(() => props.color);
        const currentSize = computed(() => props.size);
        const { color } = useComponentColor({ componentName, currentColor });
        const { size } = useComponentSize({ componentName, currentSize });

        const classes = computed(() => ({
            [`-${color.value}`]: Boolean(color.value),
            [`-${size.value}`]: Boolean(size.value)
        }));

        return {
            classes
        };
    }
});
</script>

<template>
    <nav class="breadcrumb" :class="classes" :aria-label="ariaLabel">
        <ol>
            <!-- @slot default Slot for default breadcrumb content -->
            <slot />
        </ol>
    </nav>
</template>
