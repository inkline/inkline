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
                <INav vertical>
                    <INavItem to="/"> Home </INavItem>
                    <INavItem to="/about"> Contact </INavItem>
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
                <INav vertical>
                    <INavItem to="/"> Home </INavItem>
                    <INavItem to="/about"> Contact </INavItem>
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
