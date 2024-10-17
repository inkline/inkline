<script lang="ts">
import { computed, defineComponent, toRef } from 'vue';
import { useComponentColor, useComponentSize } from '@inkline/vue';

const componentName = 'Breadcrumb';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
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
         * @default
         * @name color
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The size variant of the breadcrumb
         * @type sm | md | lg
         * @default
         * @name sizeMultiplier
         */
        size: {
            type: String,
            default: undefined
        }
    },
    setup(props) {
        const rawColor = toRef(props, 'color');
        const rawSize = toRef(props, 'size');
        const { color } = useComponentColor(componentName, rawColor);
        const { size } = useComponentSize(componentName, rawSize);

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
    <nav v-bind="$attrs" class="breadcrumb" :class="classes" :aria-label="ariaLabel">
        <ol>
            <!-- @slot default Slot for default breadcrumb content -->
            <slot />
        </ol>
    </nav>
</template>
