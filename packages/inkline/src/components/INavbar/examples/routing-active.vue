<template>
    <INavbar>
        <INavbarBrand :to="{ path: '/' }">Navbar</INavbarBrand>
        <INavbarCollapsible>
            <INav>
                <INavItem :to="{ path: '/' }" exact-active-class="-active">
                    Active Router Link
                </INavItem>
                <INavItem active> Active Item </INavItem>
            </INav>
        </INavbarCollapsible>
    </INavbar>
</template>
