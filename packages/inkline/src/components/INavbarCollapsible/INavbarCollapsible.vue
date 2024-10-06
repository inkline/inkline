<script lang="ts">
import { computed, defineComponent, inject } from 'vue';
import { IExpandTransition } from '@inkline/inkline/components/IExpandTransition';
import { NavbarKey } from '@inkline/inkline/constants';
import { useIsServer } from '@inkline/inkline/composables';

const componentName = 'INavbarCollapsible';

export default defineComponent({
    name: componentName,
    components: {
        IExpandTransition
    },
    inheritAttrs: false,
    setup() {
        const navbar = inject(NavbarKey, null);
        const { isServer } = useIsServer();

        const visible = computed(() => {
            return (
                !navbar || (navbar && (navbar.open.value || !navbar.collapsible.value)) || isServer
            );
        });

        return {
            visible
        };
    }
});
</script>

<template>
    <IExpandTransition>
        <div
            v-show="visible"
            v-bind="$attrs"
            class="navbar-collapsible"
            :aria-hidden="visible ? 'false' : 'true'"
            :aria-expanded="visible ? 'true' : 'false'"
        >
            <!-- @slot default Slot for default navbar collapsible content -->
            <slot />
        </div>
    </IExpandTransition>
</template>
