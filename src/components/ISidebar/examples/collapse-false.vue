<template>
    <ILayout>
        <ILayoutHeader>
            <INavbar fluid :collapse="false">
                <INavbarBrand to="/"> Dashboard </INavbarBrand>
            </INavbar>
        </ILayoutHeader>
        <ILayout vertical class="_padding-top:1/2">
            <ISidebar :collapse="false">
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
                            <h1>Sidebar</h1>
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
