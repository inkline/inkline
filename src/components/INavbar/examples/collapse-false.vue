<template>
    <INavbar :collapse="false">
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
