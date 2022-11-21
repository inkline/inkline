<script lang="ts" setup>
import {computed, inject} from 'vue';
import { IExpandTransition } from '@inkline/inkline/transitions';
import {NavbarKey} from "@inkline/inkline/components/INavbar/mixin";
import { useIsServer } from '@inkline/inkline/composables';

const componentName = 'INavbarCollapsible';

const navbar = inject(NavbarKey, null);
const { isServer } = useIsServer();

const visible = computed(() => {
    return !navbar || navbar && (navbar.open.value || !navbar.collapsible.value) || isServer.value;
})
</script>

<template>
    <i-expand-transition>
        <div
            v-show="visible"
            class="navbar-collapsible"
            :aria-hidden="visible ? 'false' : 'true'"
            :aria-expanded="visible ? 'true' : 'false'"
        >
            <!-- @slot default Slot for default navbar collapsible content -->
            <slot />
        </div>
    </i-expand-transition>
</template>
