<script lang="ts">
import { computed, defineComponent, toRef } from 'vue';
import { useComponentColor, useComponentSize } from '@inkline/composables';

const componentName = 'Card';

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
        const rawColor = toRef(props, 'color');
        const rawSize = toRef(props, 'size');
        const { color } = useComponentColor(componentName, rawColor);
        const { size } = useComponentSize(componentName, rawSize);
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

        <!-- @slot body:before Slot for content between header and body  -->
        <slot name="body:before" />

        <div v-if="!!$slots.default" class="card-body">
            <!-- @slot default Slot for card body content -->
            <slot />
        </div>

        <!-- @slot body:after Slot for content between body and footer -->
        <slot name="body:after" />

        <footer v-if="!!$slots.footer" class="card-footer">
            <!-- @slot footer Slot for card footer content -->
            <slot name="footer" />
        </footer>
    </component>
</template>
