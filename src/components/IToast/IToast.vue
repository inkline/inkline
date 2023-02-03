<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useComponentColor, useComponentSize } from '@inkline/inkline/composables';

const componentName = 'IToast';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The size variant of the toast
         * @type sm | md | lg
         * @default
         * @name size
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * The color variant of the toast
         * @type light | dark | info | success | warning | danger
         * @default light
         * @name color
         */
        color: {
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
    <div v-bind="$attrs" class="toast" :class="classes">
        <span v-if="$slots.icon" class="icon" role="img" aria-hidden="true">
            <!-- @slot icon Slot for toast icon -->
            <slot name="icon" />
        </span>
        <div class="content">
            <div v-if="$slots.title" class="title">
                <!-- @slot default Slot for toast title -->
                <slot name="title" />
            </div>
            <!-- @slot default Slot for default toast content -->
            <slot />
        </div>
    </div>
</template>
