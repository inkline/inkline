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
            <INavbar color="light" fluid :collapse="false">
                <INavbarBrand to="/"> Dashboard </INavbarBrand>
                <IHamburgerMenu
                    v-model="open"
                    color="light"
                    animation="arrow-left"
                    class="_lg:hidden"
                />
            </INavbar>
        </ILayoutHeader>
        <ILayout vertical class="_padding-top:1/2">
            <ISidebar v-model="open" color="light">
                <INav vertical color="light">
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
                            <h1>Light Sidebar</h1>
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

    <ILayout>
        <ILayoutHeader>
            <INavbar color="dark" fluid :collapse="false">
                <INavbarBrand to="/"> Dashboard </INavbarBrand>
                <IHamburgerMenu
                    v-model="open"
                    color="dark"
                    animation="arrow-left"
                    class="_lg:hidden"
                />
            </INavbar>
        </ILayoutHeader>
        <ILayout vertical class="_padding-top:1/2">
            <ISidebar v-model="open" color="dark">
                <INav vertical color="dark">
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
                            <h1>Dark Sidebar</h1>
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
