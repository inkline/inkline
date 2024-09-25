<script lang="ts">
import { useComponentColor, useComponentSize } from '@inkline/inkline/composables';
import { computed, defineComponent } from 'vue';

const componentName = 'IBadge';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the badge
         * @type primary | success | light | dark | info | success | warning | danger
         * @default
         * @name color
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The size variant of the badge
         * @type sm | md | lg
         * @default
         * @name sizeMultiplier
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * Display the badge as a pill
         * @type Boolean
         * @default false
         * @name pill
         */
        pill: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const currentColor = computed(() => props.color);
        const currentSize = computed(() => props.size);
        const { color } = useComponentColor({ componentName, color: currentColor });
        const { size } = useComponentSize({ componentName, size: currentSize });

        const classes = computed(() => ({
            [`-${color.value}`]: Boolean(color.value),
            [`-${size.value}`]: Boolean(size.value),
            '-pill': props.pill
        }));

        return {
            classes
        };
    }
});
</script>

<template>
    <div v-bind="$attrs" class="badge" :class="classes">
        <!-- @slot default Slot for default badge content -->
        <slot />
    </div>
</template>
