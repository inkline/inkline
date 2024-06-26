<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useComponentColor, useComponentSize } from '@inkline/inkline/composables';

const componentName = 'ICard';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the card
         * @type primary | success | light | dark | info | success | warning | danger
         * @default
         * @name color
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The size variant of the card
         * @type sm | md | lg
         * @default
         * @name sizeMultiplier
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * The HTML tag to use for the card root element
         * @default div
         * @name tag
         */
        tag: {
            type: String,
            default: 'div'
        }
    },
    setup(props) {
        const currentColor = computed(() => props.color);
        const currentSize = computed(() => props.size);
        const { color } = useComponentColor({ componentName, color: currentColor });
        const { size } = useComponentSize({ componentName, size: currentSize });
        const classes = computed(() => ({ [`-${color.value}`]: true, [`-${size.value}`]: true }));

        return {
            classes
        };
    }
});
</script>

<template>
    <component :is="tag" v-bind="$attrs" class="card" :class="classes">
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
    </component>
</template>
