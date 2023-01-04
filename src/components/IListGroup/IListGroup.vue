<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useComponentColor, useComponentSize } from '@inkline/inkline/composables';

const componentName = 'IListGroup';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * Display the list group border
         * @type Boolean
         * @default true
         * @name border
         */
        border: {
            type: Boolean,
            default: true
        },
        /**
         * The color variant of the list group
         * @type light | dark
         * @default
         * @name color
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The size variant of the list group
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
            [`-${color.value}`]: true,
            [`-${size.value}`]: true,
            '-border': props.border
        }));

        return {
            classes
        };
    }
});
</script>

<template>
    <div v-bind="$attrs" class="list-group" :class="classes" role="list">
        <!-- @slot default Slot for list group items -->
        <slot />
    </div>
</template>
