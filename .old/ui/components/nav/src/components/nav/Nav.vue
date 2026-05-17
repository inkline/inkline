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
         * @param {'light' | 'dark'} color
         * @default
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The size variant of the nav
         * @param {'sm' | 'md' | 'lg'} size
         * @default
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * Display the nav with vertical orientation
         * @param {'row' | 'column'} row
         * @default 'row'
         */
        direction: {
            type: String as PropType<'row' | 'column'>,
            default: 'row'
        },
        /**
         * Nav items to display
         * @param {NavItemDefinition[]} items
         * @default []
         */
        items: {
            type: Array as PropType<NavItemDefinition[]>,
            default: () => []
        },
        /**
         * Remove the gap between nav items
         * @param {Boolean} noGap
         * @default false
         */
        noGap: {
            type: Boolean,
            default: false
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
            [`-direction-${props.direction}`]: true,
            '-no-gap': props.noGap
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
