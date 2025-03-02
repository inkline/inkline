<script lang="ts" setup>
import { mainNavigation, componentsNavigation } from '~/constants';
</script>

<template>
    <aside>
        <Nav direction="column" no-gap>
            <NavItem v-for="item in mainNavigation" :key="item.title" :to="item.to">
                <Typography font-weight="bold">{{ item.title }}</Typography>
            </NavItem>
        </Nav>
        <AppSidebarNavigation :items="componentsNavigation" />
    </aside>
</template>
