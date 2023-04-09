<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useInkline } from "@inkline/inkline";

export default defineComponent({
    setup() {
        const inkline = useInkline();
        const colorMode = computed(() => inkline.options.colorMode);

        function toggleColorMode () {
            inkline.options.colorMode = colorMode.value === 'light' ? 'dark' : 'light';
        }

        return { colorMode, toggleColorMode };
    },
});
</script>
<template>
    <div id="app">
        <h1>Hello world</h1>
        <div>
            <INavbar>
                <INavbarBrand to="/">
                    Navbar
                </INavbarBrand>
                <INavbarCollapsible>
                    <INav>
                        <INavItem to="/">
                            Home
                        </INavItem>
                        <INavItem to="/about">
                            About
                        </INavItem>
                        <INavItem to="/contact">
                            Contact
                        </INavItem>
                    </INav>
                    <IInput placeholder="Type something..">
                        <template #append>
                            <IButton color="primary">
                                <IIcon name="ink-search" />
                            </IButton>
                        </template>
                    </IInput>
                </INavbarCollapsible>
            </INavbar>
        </div>
        <IButtonGroup class="_margin-top:1">
            <IButton @click="toggleColorMode">
                Switch to {{ colorMode === 'dark' ? 'light' : 'dark' }} mode
            </IButton>
            <IButton to="/about">Go to about page</IButton>
        </IButtonGroup>
    </div>
</template>
