<script lang="ts">
import { defineComponent } from 'vue';
import { IExpandTransition } from '@inkline/inkline/transitions';

/**
 * Slot for default navbar collapsible content
 * @name default
 * @kind slot
 */

const componentName = 'INavbarCollapsible';

export default defineComponent({
    name: componentName,
    components: {
        IExpandTransition
    },
    inject: {
        navbar: {
            default: () => ({})
        }
    },
    computed: {
        visible () {
            const isServer = typeof window === 'undefined';

            return (this as any).navbar.open || !(this as any).navbar.collapsible || isServer;
        }
    }
});
</script>

<template>
    <i-expand-transition>
        <div
            class="navbar-collapsible"
            :aria-hidden="visible ? 'false' : 'true'"
            :aria-expanded="visible ? 'true' : 'false'"
            v-show="visible"
        >
            <slot />
        </div>
    </i-expand-transition>
</template>