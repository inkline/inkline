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
    <div v-bind="$attrs" class="badge" :class="classes">
        <!-- @slot default Slot for default badge content -->
        <slot />
    </div>
</template>
