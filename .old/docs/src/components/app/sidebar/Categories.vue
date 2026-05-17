<script setup lang="ts">
import type { NavigationItem } from '~/types';

defineProps<{
    items: NavigationItem[];
    active: Record<string, boolean>;
}>();
</script>

<template>
    <Nav class="app-sidebar-categories" direction="column" gap="xs">
        <NavItem v-for="item in items" :key="item.id" :to="item.to" :active="active[item.id]">
            <Grid direction="row" align-items="center" class="tw:gap-x-xs">
                <AppIcon v-if="item.icon" size="24" :name="item.icon" />
                <Typography font-weight="bold">
                    {{ item.title }}
                </Typography>
            </Grid>
        </NavItem>
    </Nav>
</template>
