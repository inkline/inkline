<script lang="ts" setup>
import { computed } from 'vue';
import { useComponentColor, useComponentSize } from '@inkline/inkline/composables';

const componentName = 'ICard';

const props = defineProps({
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
});

const color = useComponentColor({ componentName, currentColor: props.color });
const size = useComponentSize({ componentName, currentSize: props.size });

const classes = computed(() => ({ [`-${color.value}`]: true, [`-${size.value}`]: true }));
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
