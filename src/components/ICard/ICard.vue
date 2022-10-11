<script lang="ts" setup>
import { computed } from 'vue';
import { useColor, useSize } from '@inkline/inkline/composables';

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
        default: ''
    },
    /**
     * The size variant of the card
     * @type sm | md | lg
     * @default md
     * @name size
     */
    size: {
        type: String,
        default: ''
    }
});

const color = useColor({ componentName, currentColor: props.color });
const size = useSize({ componentName, currentSize: props.size });

const classes = computed(() => ({ [`-${color}`]: Boolean(color), [`-${size}`]: Boolean(size) }));
</script>

<template>
    <div class="card" :class="classes">
        <header v-if="!!$slots.header" class="card-header">
            <!--** Slot for card header content -->
            <slot name="header" />
        </header>

        <!--** Slot for card image -->
        <slot name="image" />

        <div v-if="!!$slots.default" class="card-body">
            <!--** Slot for card header content -->
            <slot />
        </div>

        <footer v-if="!!$slots.footer" class="card-footer">
            <!--** Slot for card footer content -->
            <slot name="footer" />
        </footer>
    </div>
</template>
