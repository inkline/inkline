<script lang="ts">
import { computed, defineComponent, inject } from 'vue';
import { ExpandTransition } from '@inkline/inkline/components/ExpandTransition';
import { NavbarKey } from '@inkline/inkline/constants';
import { useIsServer } from '@inkline/inkline/composables';

const componentName = 'NavbarCollapsible';

export default defineComponent({
    name: componentName,
    components: {
        ExpandTransition
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
    <ExpandTransition>
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
    </ExpandTransition>
</template>
