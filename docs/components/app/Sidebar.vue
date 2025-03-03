<script lang="ts" setup>
import { componentsNavigation } from '~/constants';
</script>

<template>
    <Nav class="app-sidebar" direction="column" no-gap>
        <template v-for="item in componentsNavigation" :key="item.title">
            <NavItem :to="item.to">
                <Typography v-if="item.children" font-weight="bold">{{ item.title }}</Typography>
            </NavItem>
            <Nav v-if="item.children" direction="column" no-gap>
                <template v-for="child in item.children" :key="`${item.title} / ${child.title}`">
                    <NavItem :to="child.to">
                        {{ child.title }}
                    </NavItem>
                    <Nav v-if="child.children" direction="column" no-gap>
                        <NavItem
                            v-for="subchild in child.children"
                            :key="`${item.title} / ${child.title} / ${subchild.title}`"
                        >
                            {{ subchild.title }}
                        </NavItem>
                    </Nav>
                </template>
            </Nav>
        </template>
    </Nav>
</template>
