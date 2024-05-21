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
    <ILayout>
        <ILayoutHeader>
            <INavbar fluid :collapse="false">
                <INavbarBrand> Dashboard </INavbarBrand>
                <IHamburgerMenu v-model="open" animation="arrow-left" class="_lg:hidden" />
            </INavbar>
        </ILayoutHeader>
        <ILayout vertical class="_padding-top:1/2">
            <ISidebar v-model="open">
                <INav vertical>
                    <INavItem
                        :to="{ path: '/docs/components/sidebar' }"
                        exact-active-class="-active"
                    >
                        Active Router Link
                    </INavItem>
                    <INavItem active> Active Item </INavItem>
                </INav>
            </ISidebar>
            <ILayoutContent>
                <IContainer fluid>
                    <IRow>
                        <IColumn>
                            <h1>Sidebar</h1>
                            <p>
                                Example content for a page with a sidebar, a layout typically seen
                                in Documentation pages and Web Application dashboards.
                            </p>
                        </IColumn>
                    </IRow>
                </IContainer>
            </ILayoutContent>
        </ILayout>
    </ILayout>
</template>
