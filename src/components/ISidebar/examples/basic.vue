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
                <INavbarBrand to="/"> Dashboard </INavbarBrand>
                <IHamburgerMenu v-model="open" animation="arrow-left" class="_lg:hidden" />
            </INavbar>
        </ILayoutHeader>
        <ILayout vertical class="_padding-top:1/2">
            <ISidebar v-model="open">
                <INav vertical>
                    <INavItem to="/"> Home </INavItem>
                    <ICollapsible color="transparent">
                        <ICollapsibleItem title="Menu">
                            <INavItem to="/about"> Item 1 </INavItem>
                            <INavItem to="/about"> Item 2 </INavItem>
                            <INavItem to="/about"> Item 3 </INavItem>
                        </ICollapsibleItem>
                    </ICollapsible>
                    <INavItem to="/contact"> Contact </INavItem>
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
