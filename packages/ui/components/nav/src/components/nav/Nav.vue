<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, toRef, provide } from 'vue';
import { useComponentColor, useComponentSize } from '@inkline/composables';
import { NavKey } from '@inkline/types';
import type { NavItemDefinition } from '../../types';

const componentName = 'Nav';

export default defineComponent({
    name: componentName,
    emits: ['click:item'],
    props: {
        /**
         * The color variant of the nav
         * @type light | dark
         * @default
         * @name color
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The size variant of the nav
         * @type sm | md | lg
         * @default
         * @name sizeMultiplier
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * Display the nav with vertical orientation
         * @type Boolean
         * @default false
         * @name vertical
         */
        vertical: {
            type: Boolean,
            default: false
        },
        /**
         * Nav items to display
         * @name items
         * @type NavItemDefinition[]
         * @default []
         */
        items: {
            type: Array as PropType<NavItemDefinition[]>,
            default: () => []
        }
    },
    setup(props, { emit }) {
        const rawColor = toRef(props, 'color');
        const rawSize = toRef(props, 'size');
        const { color } = useComponentColor(componentName, rawColor);
        const { size } = useComponentSize(componentName, rawSize);

        const classes = computed(() => ({
            [`-${color.value}`]: true,
            [`-${size.value}`]: true,
            '-vertical': props.vertical
        }));

        provide(NavKey, {
            onItemClick
        });

        function onItemClick(event: Event) {
            emit('click:item', event);
        }

        return {
            classes
        };
    }
});
</script>

<template>
    <nav class="nav" :class="classes" role="menubar">
        <!-- @slot default Slot for default nav content -->
        <slot />
    </nav>
</template>
