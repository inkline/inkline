<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useComponentColor, useComponentSize } from '@inkline/inkline/composables';

const componentName = 'ICard';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The color variant of the card
         * @type primary | success | light | dark | info | success | warning | danger
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The size variant of the card
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

        const classes = computed(() => ({ [`-${color.value}`]: true, [`-${size.value}`]: true }));

        return {
            classes
        };
    }
});
</script>

<template>
    <div class="card" :class="classes">
        <header v-if="!!$slots.header" class="card-header">
            <!-- @slot header Slot for card header content -->
            <slot name="header" />
        </header>

        <!-- @slot image Slot for card image -->
        <slot name="image" />

        <div v-if="!!$slots.default" class="card-body">
            <!-- @slot default Slot for card header content -->
            <slot />
        </div>

        <footer v-if="!!$slots.footer" class="card-footer">
            <!-- @slot footer Slot for card footer content -->
            <slot name="footer" />
        </footer>
    </div>
</template>
