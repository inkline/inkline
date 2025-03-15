<script lang="ts" setup>
import {
    mainNavigation,
    componentsNavigation,
    gettingStartedNavigation,
    customizationNavigation,
    utilitiesNavigation,
    communityNavigation
} from '~/constants';
import { useActiveItems } from '~/composables';
import { computed } from 'vue';

const { activeItems: activeMainNavigationItems } = useActiveItems(mainNavigation);
const activeMainNavigationItem = computed(() => Object.keys(activeMainNavigationItems.value)[0]);

const sidebarNavigationItems = computed(
    () =>
        ({
            'getting-started': gettingStartedNavigation,
            customization: customizationNavigation,
            components: componentsNavigation,
            utilities: utilitiesNavigation,
            community: communityNavigation
        })[activeMainNavigationItem.value] ?? []
);
const { activeItems: activeSidebarNavigationItems } = useActiveItems(sidebarNavigationItems);
</script>

<template>
    <aside class="app-sidebar">
        <AppSidebarCategories :items="mainNavigation" :active="activeMainNavigationItems" />
        <AppSidebarNavigation
            :items="sidebarNavigationItems"
            :active="activeSidebarNavigationItems"
        />
    </aside>
</template>
