<script lang="ts">
import { computed, defineComponent, inject, provide } from 'vue';
import { NavbarKey } from '@inkline/inkline/components/INavbar/mixin';
import { SidebarKey } from '@inkline/inkline/components/ISidebar/mixin';
import { NavKey } from './mixin';
import { useComponentColor, useComponentSize } from '@inkline/inkline/composables';

const componentName = 'INav';

export default defineComponent({
    name: componentName,
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
         * @name size
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
        const { color } = useComponentColor({ componentName, currentColor });
        const { size } = useComponentSize({ componentName, currentSize });

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
    <nav class="nav" :class="classes" role="menubar">
        <!-- @slot default Slot for default nav content -->
        <slot />
    </nav>
</template>
