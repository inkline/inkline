<template>
    <INavbar>
        <INavbarBrand to="/"> Navbar </INavbarBrand>
        <INavbarCollapsible class="_justify-content:flex-start">
            <INav>
                <INavItem to="/"> Home </INavItem>
                <INavItem to="/about"> About </INavItem>
                <INavItem to="/contact"> Contact </INavItem>
            </INav>
        </INavbarCollapsible>
    </INavbar>

    <INavbar>
        <INavbarBrand to="/"> Navbar </INavbarBrand>
        <INavbarCollapsible class="_justify-content:center">
            <INav>
                <INavItem to="/"> Home </INavItem>
                <INavItem to="/about"> About </INavItem>
                <INavItem to="/contact"> Contact </INavItem>
            </INav>
        </INavbarCollapsible>
    </INavbar>

    <INavbar>
        <INavbarBrand to="/"> Navbar </INavbarBrand>
        <INavbarCollapsible class="_justify-content:flex-end">
            <INav>
                <INavItem to="/"> Home </INavItem>
                <INavItem to="/about"> About </INavItem>
                <INavItem to="/contact"> Contact </INavItem>
            </INav>
        </INavbarCollapsible>
    </INavbar>
</template>
