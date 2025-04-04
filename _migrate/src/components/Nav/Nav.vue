<script lang="ts">
import { computed, defineComponent, inject, provide } from 'vue';
import { NavKey, NavbarKey, SidebarKey } from '@inkline/inkline/constants';
import { useComponentColor, useComponentSize } from '@inkline/inkline/composables';

const componentName = 'Nav';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
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
        }
    },
    setup(props) {
        const navbar = inject(NavbarKey, null);
        const sidebar = inject(SidebarKey, null);

        const currentColor = computed(() => props.color);
        const currentSize = computed(() => props.size);
        const { color } = useComponentColor({ componentName, color: currentColor });
        const { size } = useComponentSize({ componentName, size: currentSize });

        const classes = computed(() => ({
            [`-${color.value}`]: true,
            [`-${size.value}`]: true,
            '-vertical': props.vertical
        }));

        provide(NavKey, {
            onItemClick
        });

        function onItemClick(event: Event) {
            [navbar, sidebar].forEach((parent) => {
                if (parent) {
                    parent.onItemClick(event);
                }
            });
        }

        return {
            classes
        };
    }
});
</script>

<template>
    <nav v-bind="$attrs" class="nav" :class="classes" role="menubar">
        <!-- @slot default Slot for default nav content -->
        <slot />
    </nav>
</template>
