<script lang="ts" setup>
import {computed, inject, provide} from 'vue';
import {NavbarKey} from "@inkline/inkline/components/INavbar/mixin";
import {SidebarKey} from "@inkline/inkline/components/ISidebar/mixin";
import {NavKey} from "./mixin";
import {useComponentColor, useComponentSize} from "@inkline/inkline/composables";

/**
 * Slot for default nav content
 * @name default
 * @kind slot
 */

const componentName = 'INav';

const props = defineProps({
    /**
     * The color variant of the nav
     * @type light | dark
     * @default light
     * @name color
     */
    color: {
        type: String,
        default: ''
    },
    /**
     * The size variant of the nav
     * @type sm | md | lg
     * @default md
     * @name size
     */
    size: {
        type: String,
        default: ''
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
});

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

function onItemClick (event: Event) {
    [navbar, sidebar].forEach((parent) => {
        if (parent) {
            parent.onItemClick(event);
        }
    });
}
</script>

<template>
    <nav class="nav" :class="classes" role="menubar">
        <slot />
    </nav>
</template>
