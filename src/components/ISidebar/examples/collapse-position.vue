<script>
export default {
    data() {
        return {
            openRelative: false,
            openAbsolute: false,
            openFixed: false
        };
    }
};
</script>

<template>
    <ILayout>
        <ILayoutHeader>
            <INavbar fluid :collapse="false">
                <INavbarBrand to="/"> Dashboard </INavbarBrand>
                <IHamburgerMenu v-model="openRelative" animation="arrow-left" />
            </INavbar>
        </ILayoutHeader>
        <ILayout vertical class="_padding-top:1/2">
            <ISidebar v-model="openRelative" :collapse="true" collapse-position="relative">
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
                            <h1>Sidebar Collapse Relative</h1>
                            <p>
                                Example content for a page with a sidebar that collapses on large
                                screens, a layout typically seen in Documentation pages and Web
                                Application dashboards.
                            </p>
                        </IColumn>
                    </IRow>
                </IContainer>
            </ILayoutContent>
        </ILayout>
    </ILayout>

    <ILayout>
        <ILayoutHeader>
            <INavbar fluid :collapse="false">
                <INavbarBrand to="/"> Dashboard </INavbarBrand>
                <IHamburgerMenu v-model="openAbsolute" animation="arrow-left" />
            </INavbar>
        </ILayoutHeader>
        <ILayout vertical class="_padding-top:1/2">
            <ISidebar v-model="openAbsolute" :collapse="true" collapse-position="absolute">
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
                            <h1>Sidebar Collapse Absolute</h1>
                            <p>
                                Example content for a page with a sidebar that collapses on large
                                screens, a layout typically seen in Documentation pages and Web
                                Application dashboards.
                            </p>
                        </IColumn>
                    </IRow>
                </IContainer>
            </ILayoutContent>
        </ILayout>
    </ILayout>

    <ILayout>
        <ILayoutHeader>
            <INavbar fluid :collapse="false">
                <INavbarBrand to="/"> Dashboard </INavbarBrand>
                <IHamburgerMenu v-model="openFixed" animation="arrow-left" />
            </INavbar>
        </ILayoutHeader>
        <ILayout vertical class="_padding-top:1/2">
            <ISidebar v-model="openFixed" :collapse="true" collapse-position="fixed">
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
                            <h1>Sidebar Collapse Fixed</h1>
                            <p>
                                Example content for a page with a sidebar that collapses on large
                                screens, a layout typically seen in Documentation pages and Web
                                Application dashboards.
                            </p>
                        </IColumn>
                    </IRow>
                </IContainer>
            </ILayoutContent>
        </ILayout>
    </ILayout>
</template>
