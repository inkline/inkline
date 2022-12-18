<template>
    <INavbar>
        <INavbarBrand to="/"> Navbar </INavbarBrand>
        <INavbarCollapsible>
            <INav>
                <INavItem to="/"> Home </INavItem>
                <INavItem to="/about"> About </INavItem>
                <INavItem to="/contact"> Contact </INavItem>
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
</template>
