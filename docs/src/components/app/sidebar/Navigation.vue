<script lang="ts" setup>
import type { NavigationItem } from '~/types';

defineProps<{
    items: NavigationItem[];
    active: Record<string, boolean>;
}>();
</script>

<template>
    <Nav class="app-navigation" direction="column" no-gap>
        <template v-for="item in items" :key="item.title">
            <NavItem class="app-navigation-item" :to="item.to" :active="active[item.id]">
                <Typography font-weight="bold">{{ item.title }}</Typography>
            </NavItem>
            <Nav v-if="item.children" class="app-navigation-item-menu" direction="column" no-gap>
                <template v-for="child in item.children" :key="`${item.title} / ${child.title}`">
                    <NavItem
                        class="app-navigation-child"
                        :to="child.to"
                        :active="active[`${item.id}/${child.id}`]"
                    >
                        {{ child.title }}
                    </NavItem>
                    <Nav
                        v-if="child.children"
                        class="app-navigation-child-menu"
                        direction="column"
                        no-gap
                    >
                        <NavItem
                            v-for="subchild in child.children"
                            :key="`${item.title} / ${child.title} / ${subchild.title}`"
                            class="app-navigation-subchild"
                            :to="subchild.to"
                            :active="active[`${item.id}/${child.id}/${subchild.id}`]"
                        >
                            {{ subchild.title }}
                        </NavItem>
                    </Nav>
                </template>
            </Nav>
        </template>
    </Nav>
</template>

<style>
.app-navigation {
    .app-navigation-item {
        color: var(--body--color);
    }

    .app-navigation-item-menu {
        border-left: 1px solid var(--border-left-color);
        margin-left: var(--spacing-sm);
        margin-top: var(--spacing-xs);
        margin-bottom: var(--spacing-xs);
    }

    .app-navigation-child {
        padding: var(--spacing-2xs) 0 var(--spacing-2xs) var(--spacing-sm);
        margin-left: -2px;
    }

    .app-navigation-child.-active {
        padding-left: calc(var(--spacing-sm) - 3px);
        border-left: 3px solid var(--color-primary);
    }
}
</style>
