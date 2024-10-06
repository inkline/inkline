<script>
export default {
    data() {
        return {
            open: false
        };
    }
};
</script>
<template>
    <IButton @click="open = !open">Toggle Navbar</IButton>

    <INavbar v-model="open" :collapse="true" :collapse-on-click-outside="false">
        <INavbarBrand to="/"> Navbar </INavbarBrand>
        <INavbarCollapsible>
            <INav>
                <INavItem to="/"> Home </INavItem>
                <INavItem to="/about"> About </INavItem>
                <INavItem to="/contact"> Contact </INavItem>
            </INav>
        </INavbarCollapsible>
    </INavbar>
</template>
