<script lang="ts">
import { computed, defineComponent, provide, toRef } from 'vue';
import { useComponentColor, useComponentSize } from '@inkline/inkline/composables';
import { ProgressKey } from '@inkline/inkline/components/IProgressBar/mixin';

const componentName = 'IProgress';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The color variant of the progress component
         * @type light | dark
         * @default
         * @name color
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The value to consider as the 0% starting point
         * @type Number
         * @default 0
         * @name min
         */
        min: {
            type: [String, Number],
            default: 0
        },
        /**
         * The value to consider as the 100% ending point
         * @type Number
         * @default 100
         * @name max
         */
        max: {
            type: [String, Number],
            default: 100
        },
        /**
         * The size variant of the progress component
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
            [`-${size.value}`]: true
        }));

        const min = toRef(props, 'min');
        const max = toRef(props, 'max');

        provide(ProgressKey, { min, max });

        return {
            classes
        };
    }
});
</script>

<template>
    <div class="progress" :class="classes">
        <!-- @slot default Slot for progress bars -->
        <slot />
    </div>
</template>
